import * as THREE from 'three'
import gsap, { Power2 } from 'gsap'
import defaultImg from '@/views/home/imgs/default.jpeg'

export class Sketch {
  private scene = new THREE.Scene()
  private renderer = new THREE.WebGLRenderer()
  private vertex = 'varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}'
  private time = 0
  private current = 0
  private textures: THREE.Texture[] = []
  private paused = true

  private container: HTMLElement
  private readonly camera
  private material: any
  private geometry: any
  private plane: any
  private width
  private height
  private readonly duration
  private readonly fragment
  private uniforms
  private debug
  private readonly easing
  private images
  private settings: any
  private isRunning = false

  constructor(opts: any) {
    this.container = opts.container
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0xEEEEEE, 1)
    this.container.appendChild(this.renderer.domElement)
    this.images = opts.images
    this.fragment = opts.fragment
    this.uniforms = opts.uniforms
    this.duration = opts.duration || 1
    this.debug = opts.debug || false
    this.easing = opts.easing || 'easeInOut'
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.001,
      1000,
    )
    this.camera.position.set(0, 0, 2)
    this.initiate().then(() => {
      this.setupResize()
      this.setSettings()
      this.addObjects()
      this.resize()
      this.play()
    })
  }

  private initiate = async () => {
    const promises = this.images.map((url: string, i: number) => {
      return new Promise((resolve) => {
        this.textures[i] = new THREE.TextureLoader().load(url, resolve)
      })
    })
    return Promise.all(promises)
  }

  private resize = () => {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height

    // image cover
    const imageAspect = this.textures[0].image.height / this.textures[0].image.width
    let a1
    let a2
    if (this.height / this.width > imageAspect) {
      a1 = (this.width / this.height) * imageAspect
      a2 = 1
    }
    else {
      a1 = 1
      a2 = (this.height / this.width) / imageAspect
    }

    this.material.uniforms.resolution.value.x = this.width
    this.material.uniforms.resolution.value.y = this.height
    this.material.uniforms.resolution.value.z = a1
    this.material.uniforms.resolution.value.w = a2

    const dist = this.camera.position.z
    const height = 1
    this.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist))

    this.plane.scale.x = this.camera.aspect
    this.plane.scale.y = 1

    this.camera.updateProjectionMatrix()
  }

  private setupResize = () => {
    window.addEventListener('resize', () => this.resize())
  }

  private addObjects = () => {
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: true,
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: 'f', value: 0 } as THREE.IUniform,
        progress: { type: 'f', value: 0 } as THREE.IUniform,
        border: { type: 'f', value: 0 } as THREE.IUniform,
        intensity: { type: 'f', value: 0 } as THREE.IUniform,
        scaleX: { type: 'f', value: 40 } as THREE.IUniform,
        scaleY: { type: 'f', value: 40 } as THREE.IUniform,
        transition: { type: 'f', value: 40 } as THREE.IUniform,
        swipe: { type: 'f', value: 0 } as THREE.IUniform,
        width: { type: 'f', value: 0 } as THREE.IUniform,
        radius: { type: 'f', value: 0 } as THREE.IUniform,
        textureFrom: { type: 'f', value: this.textures[0] } as THREE.IUniform,
        textureTo: { type: 'f', value: this.textures[1] } as THREE.IUniform,
        displacement: { type: 'f', value: new THREE.TextureLoader().load(defaultImg) } as THREE.IUniform,
        resolution: { type: 'v4', value: new THREE.Vector4() } as THREE.IUniform,
      },
      vertexShader: this.vertex,
      fragmentShader: this.fragment,
    })

    this.geometry = new THREE.PlaneGeometry(1, 1, 2, 2)

    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.plane)
  }

  private setSettings = () => {
    this.settings = { progress: 0.5 }
    Object.keys(this.uniforms).forEach((item) => {
      this.settings[item] = this.uniforms[item].value
    })
  }

  public stop() {
    this.paused = true
  }

  public play() {
    this.paused = false
    this.render()
  }

  public next = async () => {
    return this.jumpTo(this.current + 1)
  }

  public prev = async () => {
    return this.jumpTo(this.current - 1)
  }

  public jumpTo = async (index: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      if (this.isRunning)
        return reject(new Error('isRunning'))
      this.isRunning = true
      this.play()
      const tl = gsap.timeline()
      const len = this.textures.length
      const idx = (index + len) % len
      const nextTexture = this.textures[idx]
      if (index < this.current) {
        this.material.uniforms.textureTo.value = this.textures[this.current]
        this.material.uniforms.textureFrom.value = nextTexture
        tl.from(this.material.uniforms.progress, this.duration, {
          value: 1,
          ease: (Power2 as any)[this.easing],
          onComplete: () => {
            this.current = idx
            this.material.uniforms.textureTo.value = nextTexture
            this.material.uniforms.progress.value = 0
            this.isRunning = false
            resolve(idx)
          },
        })
      }
      else {
        this.material.uniforms.textureFrom.value = this.textures[this.current]
        this.material.uniforms.textureTo.value = nextTexture
        tl.to(this.material.uniforms.progress, this.duration, {
          value: 1,
          ease: (Power2 as any)[this.easing],
          onComplete: () => {
            this.current = idx
            this.material.uniforms.textureFrom.value = nextTexture
            this.material.uniforms.progress.value = 0
            this.isRunning = false
            resolve(idx)
          },
        })
      }
    })
  }

  public destroy() {
    window.removeEventListener('resize', this.resize)
    this.container?.removeChild(this.renderer.domElement)
  }

  private render = () => {
    if (this.paused && !this.isRunning)
      return
    this.time += 0.05
    this.material.uniforms.time.value = this.time

    Object.keys(this.uniforms).forEach((item) => {
      this.material.uniforms[item].value = this.settings[item]
    })

    requestAnimationFrame(this.render)
    this.renderer.render(this.scene, this.camera)
  }
}

export default Sketch
