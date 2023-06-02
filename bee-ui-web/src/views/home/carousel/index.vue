<script name="Carousel" setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useCssModule } from 'vue'
import img1 from './imgs/img1.jpeg'
import img2 from './imgs/img2.jpeg'
import img3 from './imgs/img3.jpeg'
import img4 from './imgs/img4.jpeg'
import Sketch from '@/views/home/carousel/sketch'

const carouselRef = ref<HTMLElement>()
const styles = useCssModule()
const sketch = ref<Sketch>()
const timer = ref<number>()

function autoplay() {
  if (timer.value)
    clearInterval(timer.value!)
  timer.value = setInterval(() => sketch.value?.next(), 5000)
}

function stopPlay() {
  if (timer.value)
    clearInterval(timer.value!)
  sketch.value?.stop()
}

function mouseover() {
  stopPlay()
}

function mouseout() {
  autoplay()
}

function handleUnmount() {
  sketch.value?.destroy?.()
  clearInterval(timer.value!)
}

function render(container: HTMLElement, clicker?: HTMLElement) {
  return new Sketch({
    duration: 1.5,
    debug: true,
    easing: 'easeOut',
    uniforms: {
      radius: {
        value: 0.9,
        type: 'f',
        min: 0.1,
        max: 2,
      },
      width: {
        value: 0.35,
        type: 'f',
        min: 0.0,
        max: 1,
      },
    },
    images: [img1, img2, img3, img4],
    container,
    clicker,
    fragment: `
    uniform float time;
		uniform float progress;
		uniform float width;
		uniform float scaleX;
		uniform float scaleY;
		uniform float transition;
		uniform float radius;
		uniform float swipe;
		uniform sampler2D texture1;
		uniform sampler2D texture2;
		uniform sampler2D displacement;
		uniform vec4 resolution;

		varying vec2 vUv;
		varying vec4 vPosition;

		float parabola( float x, float k ) {
		  return pow( 4. * x * ( 1. - x ), k );
		}

		void main()	{
		  vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
		  vec2 p = newUV;
		  vec2 start = vec2(0.5,0.5);
		  vec2 aspect = resolution.wz;

		  vec2 uv = newUV;
		  float dt = parabola(progress, 1.);
		  vec4 noise = texture2D(displacement, fract(vUv+time*0.04));
		  float prog = progress*0.66 + noise.g * 0.04;
		  float circ = 1. - smoothstep(-width, 0.0, radius * distance(start*aspect, uv*aspect) - prog*(1.+width));
		  float intpl = pow(abs(circ), 1.);
		  vec4 t1 = texture2D( texture1, (uv - 0.5) * (1.0 - intpl) + 0.5 ) ;
		  vec4 t2 = texture2D( texture2, (uv - 0.5) * intpl + 0.5 );
		  gl_FragColor = mix( t1, t2, intpl );
		}
	`,
  })
}

function init() {
  handleUnmount()
  if (carouselRef.value)
    sketch.value = render(carouselRef.value!, carouselRef.value)
}

onBeforeUnmount(handleUnmount)

nextTick(() => {
  init()
  autoplay()
})
</script>

<template>
  <div ref="carouselRef" :class="styles.container" @mouseover="mouseover" @mouseout="mouseout" />
</template>

<style module lang="scss">
.container {
  height: 100%;
}
</style>
