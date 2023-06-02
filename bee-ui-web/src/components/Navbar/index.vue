<script setup name="Home" lang="ts">
import { computed, ref, toRefs } from 'vue'

interface NavbarProps {
  label: string
  value: string
  showExpand?: boolean
}

const props = defineProps({
  items: {
    type: Array<NavbarProps>,
    required: true,
  },
  height: {
    type: String,
    default: '40px',
  },
})

const emit = defineEmits(['change'])

const { items: navs, height } = toRefs(props)

const isShow = ref<boolean>(false)
const hoverPath = ref<string>('') // 悬浮中的元素
const activeValue = ref<string>('')
activeValue.value = navs?.value?.[0]?.value ?? ''

// 当前悬浮的nav
const currentValue = computed(() => isShow.value ? hoverPath.value : activeValue.value)
const currentNav = computed(() => navs?.value!.find(nav => nav.value === currentValue.value))
const showExpand = computed(() => isShow.value)

function mouseover(path) {
  isShow.value = true
  hoverPath.value = path
}

function mouseleave() {
  isShow.value = false
  hoverPath.value = ''
}

function handleChange(item: NavbarProps) {
  activeValue.value = item.value
  emit('change', item)
}
</script>

<template>
  <div class="nav-container">
    <nav class="navs" @mouseleave.stop="mouseleave">
      <ul @mousemove.stop="mouseleave">
        <li v-for="nav in navs" :key="nav.value" :class="{ current: currentValue === nav.value }" @click="handleChange(nav)" @mouseenter.stop="mouseover(nav.value)" @mousemove.stop>
          <a href="#">{{ nav.label }}</a>
        </li>
        <div class="slider" />
      </ul>
      <div class="expand" :class="{ up: !showExpand, down: showExpand }">
        <template v-for="nav in navs" :key="nav.value">
          <slot name="expand" :data="nav">
            <slot v-if="currentNav?.value === nav.value" :name="nav.value" :data="nav" />
          </slot>
        </template>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
$height: v-bind(height);
$navSpace: 0;
$navWidth: 120px;
$navWidthActive: 100px;
$navOffsetX: calc(($navWidth - $navWidthActive) / 2) + $navSpace;
$navNum: 20;

.nav-container{
  z-index: 99;
  height: $height;
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    ul, li {
      margin: 0;
      padding: 0;
    }

    ul {
      display: flex;
      position: relative;
      z-index: 1;
      height: 100%;

      li {
        list-style: none;
        width: $navWidth;
        height: 100%;
        line-height: inherit;
        text-align: center;
        margin-left: $navSpace;

        a {
          text-decoration: none;
        }

        @for $i from 1 to $navNum + 1 {
          &:nth-child(#{$i}):hover ~ .slider,
          &:nth-child(#{$i}).current ~ .slider {
            left: ($navWidth + $navSpace) * ($i - 1) + $navOffsetX;
          }
        }
      }

      .slider {
        width: $navWidthActive;
        height: 100%;
        background-color: #d1dbe570;
        border-radius: 4px;
        position: absolute;
        left: $navOffsetX;
        bottom: 0;
        z-index: -1;
        transition: all ease 0.4s;
      }
    }

    .expand {
      max-height: 0;
      transition: max-height 0.4s linear;
      position: absolute;
      top: $height;
      left: 0;
      box-shadow: 0 5px 10px -5px #bfcbd9;
      border-radius: 0 0 5px 5px;
      width: 100vw;
      z-index: -1;
      color: #5a5a5a;
      background: rgba(256, 256, 256, 0.85);
      overflow: hidden;

      &.down {
        max-height: 40vh;
      }
    }
  }
}
</style>
