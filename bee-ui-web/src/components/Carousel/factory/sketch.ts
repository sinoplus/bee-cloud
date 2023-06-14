import {
  DoubleSide,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector4,
  WebGLRenderer,
} from 'three'
import type {
  IUniform,
  Texture,
} from 'three'
import gsap, { Power2 } from 'gsap'
import displacementImg from './imgs/disp1.jpg'

interface ISketchProps {
  container: HTMLElement
  images: string[]
  fragment: string
  uniforms: Record<string, any>
  duration?: number
  easing?: string
  debug?: boolean
}

export class Sketch {
  private container: HTMLElement
  private readonly camera: PerspectiveCamera
  private material!: ShaderMaterial
  private geometry!: PlaneGeometry
  private plane!: Mesh
  private scene = new Scene()
  private textures: Texture[] = []
  private renderer = new WebGLRenderer()
  private vertex = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  private width
  private height
  private uniforms
  private images
  private readonly fragment
  private readonly duration
  private readonly easing
  private current = 0
  private frameInstance = 0
  private paused = true
  private settings: Record<string, any> = { progress: 0.5 }
  private isRunning = false
  private debug

  constructor(opts: ISketchProps) {
    this.container = opts.container
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.camera = new PerspectiveCamera(
      70,
      this.width / this.height,
      0.001,
      1000,
    )
    this.camera.position.set(0, 0, 2)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0xEEEEEE, 1)
    this.container.appendChild(this.renderer.domElement)
    this.images = opts.images
    this.fragment = opts.fragment
    this.uniforms = opts.uniforms
    this.duration = opts.duration || 1
    this.easing = opts.easing || 'easeInOut'
    this.debug = opts.debug || false
    this.initiate().then(() => {
      this.setupResize()
      this.addObjects()
      this.setSettings()
      this.resize()
      this.play()
    })
  }

  get currentIndex() {
    return this.current
  }

  private initiate = async () => {
    // 加载图片列表
    const promises = this.images.map((url: string, i: number) => {
      return new Promise((resolve, reject) => {
        new TextureLoader().load(
          url,
          (texture) => {
            this.textures[i] = texture
            resolve(texture)
          },
          (e: ProgressEvent) => e,
          reject,
        )
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
    const imageAspect = this.textures[this.current].image.height / this.textures[this.current].image.width
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
    this.renderer.render(this.scene, this.camera)
  }

  private setupResize = () => {
    window.addEventListener('resize', this.resize)
  }

  private addObjects = () => {
    this.material = new ShaderMaterial({
      extensions: {
        derivatives: true,
      },
      side: DoubleSide,
      uniforms: {
        time: { type: 'f', value: 0 } as IUniform,
        progress: { type: 'f', value: 0 } as IUniform,
        border: { type: 'f', value: 0 } as IUniform,
        intensity: { type: 'f', value: 0 } as IUniform,
        scaleX: { type: 'f', value: 40 } as IUniform,
        scaleY: { type: 'f', value: 40 } as IUniform,
        transition: { type: 'f', value: 40 } as IUniform,
        swipe: { type: 'f', value: 0 } as IUniform,
        width: { type: 'f', value: 0 } as IUniform,
        radius: { type: 'f', value: 0 } as IUniform,
        textureFrom: { type: 'f', value: this.textures[this.current] } as IUniform,
        textureTo: { type: 'f', value: this.textures[this.current + 1] } as IUniform,
        displacement: { type: 'f', value: new TextureLoader().load(displacementImg) } as IUniform,
        resolution: { type: 'v4', value: new Vector4() } as IUniform,
      },
      vertexShader: this.vertex,
      fragmentShader: this.fragment,
    })
    this.geometry = new PlaneGeometry(1, 1, 2, 2)
    this.plane = new Mesh(this.geometry, this.material)
    this.scene.add(this.plane)
  }

  private setSettings = () => {
    Object.keys(this.uniforms).forEach((item) => {
      this.settings[item] = this.material.uniforms[item].value = this.uniforms[item].value
    })
  }

  public stop() {
    this.paused = true
    cancelAnimationFrame(this.frameInstance)
  }

  public play() {
    this.paused = false
    this.frameInstance = requestAnimationFrame(this.render)
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
      let transition
      if (index < this.current) {
        this.material.uniforms.textureFrom.value = nextTexture
        transition = tl.from
      }
      else {
        this.material.uniforms.textureTo.value = nextTexture
        transition = tl.to
      }
      transition?.(this.material.uniforms.progress, this.duration, {
        value: 1,
        ease: (Power2 as any)[this.easing],
        onComplete: () => {
          this.current = idx
          this.material.uniforms.textureTo.value = this.material.uniforms.textureFrom.value = nextTexture
          this.material.uniforms.progress.value = 0
          this.isRunning = false
          resolve(idx)
        },
      })
    })
  }

  public destroy() {
    window.removeEventListener('resize', this.resize)
    this.container?.removeChild(this.renderer.domElement)
  }

  private render = (timestamp: number) => {
    if (this.paused || !this.isRunning)
      return
    this.material.uniforms.time.value = timestamp
    this.renderer.render(this.scene, this.camera)
    this.frameInstance = requestAnimationFrame(this.render)
  }
}

export default Sketch
