<script setup name="Navigation" lang="ts">
import { computed, ref, toRefs, useCssModule, watch } from 'vue'

export interface INaviItemProps {
  label: string
  value: string
  hasPop?: boolean
}

interface INaviProps {
  items: INaviItemProps[]
  height?: string
}

const props = withDefaults<INaviProps>(defineProps<INaviProps>(), {
  height: '40px',
})

const emit = defineEmits(['change'])
const { items: navs, height } = toRefs(props)

const styles = useCssModule()

const hoverValue = ref<string>('') // 悬浮中的值
const activeValue = ref<string>('') // 选中的值
watch(navs, (newVal) => {
  activeValue.value = newVal?.[0]?.value ?? ''
}, { immediate: true })

// 当前的nav
const currentValue = computed(() => hoverValue.value || activeValue.value)
const currentNav = computed(() => navs?.value?.find(nav => nav.value === currentValue.value) ?? {})
const showPop = computed(() => !!hoverValue.value)

function mouseenter(value) {
  hoverValue.value = value
}

function mouseleave() {
  hoverValue.value = ''
}

function handleChange(item: INaviItemProps) {
  activeValue.value = item.value
  emit('change', item)
}
</script>

<template>
  <div :class="styles.container">
    <nav :class="styles.navs" @mouseleave.stop="mouseleave">
      <ul @mousemove.stop="mouseleave">
        <li
          v-for="nav in navs"
          :key="nav.value"
          :class="{ [styles.current]: currentValue === nav.value }"
          @click="handleChange(nav)"
          @mouseenter.stop="mouseenter(nav.value)"
          @mousemove.stop
        >
          <a href="#">{{ nav.label }}</a>
        </li>
        <li :class="styles.slider" />
      </ul>
      <div :class="[styles.pop, !showPop ? styles.up : styles.down]">
        <span @click="handleChange(currentNav)">
          <slot name="pop" :data="currentNav" />
        </span>
      </div>
    </nav>
  </div>
</template>

<style module lang="scss">
$height: v-bind(height);
$navWidth: 120px;
$navWidthActive: calc($navWidth * 0.85);
$navOffsetX: calc(($navWidth - $navWidthActive) / 2);
$navMaxNum: 8;

.container {
  height: $height;
  nav {
    height: 100%;
    text-align: center;

    ul, li {
      margin: 0;
      padding: 0;
    }

    ul {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;

      li {
        list-style: none;
        width: $navWidth;
        height: 100%;
        line-height: inherit;
        text-align: center;

        @for $i from 1 to $navMaxNum + 1 {
          &:nth-child(#{$i}).current ~ .slider {
            left: $navWidth * ($i - 1) + $navOffsetX;
          }
        }

        a {
          text-decoration: none;
        }

        &.slider {
          position: absolute;
          bottom: 0;
          left: $navOffsetX;
          width: $navWidthActive;
          height: 100%;
          z-index: -1;
          border-radius: 4px;
          background-color: #d1dbe570;
          transition: left ease 0.4s;
        }
      }
    }

    .pop {
      max-height: 0;
      transition: max-height 0.4s linear;
      position: absolute;
      top: $height;
      left: 0;
      box-shadow: 0 5px 10px -5px #bfcbd9;
      border-radius: 0 0 5px 5px;
      width: 100vw;
      z-index: 99;
      color: #5a5a5a;
      background: rgba(256, 256, 256, 0.85);
      overflow: hidden;

      &.up {
        max-height: 0;
      }

      &.down {
        max-height: 220px;
      }
    }
  }
}
</style>
