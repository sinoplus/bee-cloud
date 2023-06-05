<script name="Carousel" setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, toRefs, useCssModule } from 'vue'
import type { ISketchProps } from './factory'
import { SketchType, createSketch } from './factory'
import type Sketch from './factory/sketch'

interface ICarouselProps {
  images: string[]
  sketchType?: SketchType
  autoplay?: boolean
  intervals?: number
}

const props = withDefaults<ICarouselProps>(defineProps<ICarouselProps>(), {
  sketchType: SketchType.Type1,
  autoplay: true,
  intervals: 3000,
})
const { images, sketchType, autoplay, intervals } = toRefs(props)
const carouselRef = ref<HTMLElement>()
const styles = useCssModule()
const sketch = ref<Sketch>()
const frame = ref<number>(0)
const switching = ref<boolean>(false)
const currentIdx = ref<number>(0) // 当前轮播图索引
const bulletIndex = ref<number>(0) // 跳转目标轮播图
const duration = ref<string>('1.5s')

const durationValue = computed(() => +String(duration.value).replace(/[^\d.-]/g, ''))
const sketchFactory = computed(() => createSketch(sketchType.value))
const activeIndex = computed(() => {
  const index = bulletIndex.value % images.value.length
  return index < 0 ? index + images.value.length : index
})

function stop() {
  cancelAnimationFrame(frame.value)
}

function start() {
  if (autoplay.value)
    frame.value = requestAnimationFrame(handleAutoplay)
}

let lastTime = 0
function handleAutoplay(timestamp: number) {
  if (lastTime + intervals.value < timestamp) {
    lastTime = timestamp
    jumpTo(currentIdx.value + 1)
  }
  else if (switching.value) {
    lastTime = timestamp
  }
  frame.value = requestAnimationFrame(handleAutoplay)
}

async function jumpTo(index) {
  if (index === currentIdx.value || switching.value)
    return
  switching.value = true
  bulletIndex.value = index
  bulletIndex.value = currentIdx.value = await sketch.value?.jumpTo(index).finally(() => switching.value = false)
}

function handleUnmount() {
  stop()
  sketch.value?.destroy?.()
}

function render(props: ISketchProps) {
  return sketchFactory.value?.(props)
}

function init() {
  handleUnmount()
  if (carouselRef.value) {
    sketch.value = render({
      images: images?.value ?? [],
      container: carouselRef.value!,
      duration: durationValue.value,
    })
  }
}

onBeforeUnmount(handleUnmount)

nextTick(() => {
  init()
  start()
})
</script>

<template>
  <div :class="styles.container">
    <div ref="carouselRef" :class="styles.carousel" @mouseover.stop="stop" @mouseout.stop="start" />
    <nav v-if="sketch" :class="styles.pagination">
      <ul>
        <li v-for="(_, i) in images.length" :key="i" :class="{ [styles.active]: i === activeIndex }" @click="jumpTo(i)" />
        <li :class="styles.slider" />
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" module>
$bullet-bg: #1a1a1a;
$bullet-bg-active: rgba(250, 0, 146, 0.72);
$bullet-size: 7px;
$bullet-interval: 6px;
$duration: v-bind(duration);

.container {
  height: 100%;
  position: relative;

  .carousel {
    height: 100%;
    cursor: pointer;
  }

  nav.pagination {
    width: 100%;
    text-align: center;
    height: 0;

    ul, li {
      margin: 0;
      padding: 0;
    }

    ul {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
      bottom: 24px;

      li {
        list-style: none;
        width: $bullet-size;
        height: $bullet-size;
        border-radius: 50%;
        line-height: $bullet-size;
        text-align: center;
        font-size: 12px;
        position: relative;
        margin: 0 $bullet-interval;
        background-color: $bullet-bg;
        cursor: pointer;
        opacity: .3;
        transition: opacity ease $duration;

        &:hover {
          transform: scale(1.3);
        }

        &.active {
          opacity: 0;
        }

        @for $i from 1 to 20 {
          &:nth-child(#{$i}).active ~ .slider {
            left: calc(($bullet-interval * 2 + $bullet-size) * ($i - 1) - $bullet-size / 2);
            &:before {
              content: '#{$i}';
              position: absolute;
              left: calc($bullet-size / 2);
              line-height: 13px;
            }
          }
        }
        &.slider {
          position: absolute;
          left: - calc($bullet-size / 2);
          width: $bullet-size * 2;
          height: $bullet-size * 2;
          line-height: $bullet-size * 2;
          background-color: $bullet-bg-active;
          opacity: 1;
          transform: scale(0.85);
          transition: left ease $duration;
        }
      }
    }
  }
}
</style>
