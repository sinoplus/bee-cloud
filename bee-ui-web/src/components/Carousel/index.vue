<script name="Carousel" setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, toRefs, useCssModule } from 'vue'
import type { ISketchProps } from './factory'
import { SketchType, createSketch } from './factory'
import type Sketch from './factory/sketch'

interface IProps {
  images: string[]
  sketchType?: SketchType
  autoplay?: boolean
  intervals?: number
}

const props = withDefaults<IProps>(defineProps<IProps>(), {
  sketchType: SketchType.Type1,
  autoplay: true,
  intervals: 3000,
})
const { images, sketchType, autoplay, intervals } = toRefs(props)
const carouselRef = ref<HTMLElement>()
const styles = useCssModule()
const sketch = ref<Sketch>()
const timer = ref<number>()
const currentIdx = ref<number>(0) // 当前轮播图索引
const bulletIndex = ref<number>(0) // 跳转目标轮播图
const isStop = ref<boolean>(false)
const duration = ref<string>('1.5s')

const sketchFactory = computed(() => createSketch(sketchType.value))
const activeIndex = computed(() => {
  const index = bulletIndex.value % images.value.length
  return index < 0 ? index + images.value.length : index
})

function handleStop() {
  isStop.value = true
  clearTimeout(timer.value!)
  timer.value = undefined
}

function handleStart() {
  isStop.value = false
  handleAutoplay()
}

function handleAutoplay() {
  if (autoplay.value && !timer.value && !isStop.value) {
    timer.value = setTimeout(() => {
      jumpTo(currentIdx.value + 1)
    }, intervals.value)
  }
}

async function jumpTo(index) {
  if (index === currentIdx.value || isStop.value)
    return
  bulletIndex.value = index
  handleStop()
  bulletIndex.value = currentIdx.value = await sketch.value?.jumpTo(index).finally(() => {
    handleStart()
  })
}

function handleUnmount() {
  sketch.value?.destroy?.()
  handleStop()
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
      duration: +duration.value.replace(/[^\d.-]/g, ''),
    })
  }
}

onBeforeUnmount(handleUnmount)

nextTick(() => {
  init()
  handleStart()
})
</script>

<template>
  <div :class="styles.container">
    <div ref="carouselRef" :class="styles.carousel" @mouseover="handleStop" @mouseout="handleStart" />
    <nav :class="styles.pagination">
      <ul>
        <li v-for="(_, i) in images" :key="i" :class="{ [styles.active]: i === activeIndex }" @click="jumpTo(i)" />
        <li :class="styles.slider">
          {{ activeIndex + 1 }}
        </li>
      </ul>
    </nav>
  </div>
</template>

<style module lang="scss">
$bullet-bg: #1a1a1a;
$bullet-bg-active: rgba(250, 0, 146, 0.72);
$bullet-size: 8px;
$bullet-interval: 6px;
$duration: v-bind(duration);

.container {
  height: 100%;
  position: relative;

  .carousel {
    height: 100%;
  }

  .pagination {
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    text-align: center;
    transition: .3s opacity;
    transform: translate3d(0, 0, 0);
    z-index: 10;

    ul, li {
      margin: 0;
      padding: 0;
      margin-block-start: 0;
      margin-block-end: 0;
    }
    ul {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      li {
        list-style: none;
        margin: 0 $bullet-interval;
        cursor: pointer;
        width: $bullet-size;
        height: $bullet-size;
        border-radius: 50%;
        line-height: $bullet-size;
        font-size: 12px;
        background-color: $bullet-bg;
        opacity: .3;
        transition: opacity ease $duration;

        &.active {
          opacity: 0;
        }

        @for $i from 1 to 20 {
          &:nth-child(#{$i}).active ~ .slider {
            left: calc(($bullet-interval * 2 + $bullet-size) * ($i - 1) - $bullet-size / 2);
          }
        }
      }

      .slider {
        position: absolute;
        left: - calc($bullet-size / 2);
        background-color: $bullet-bg-active;
        width: $bullet-size * 2;
        height: $bullet-size * 2;
        line-height: $bullet-size * 2;
        opacity: 1;
        transform: scale(0.8);
        transition: left ease $duration;
      }
    }
  }
}
</style>
