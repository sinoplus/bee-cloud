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
})

const emit = defineEmits(['change'])

const { items: navs } = toRefs(props)

const isShow = ref<boolean>(false)
const hoverPath = ref<string>('') // 悬浮中的元素
const activeValue = ref<string>('')

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
  <div class="container">
    <nav class="navs" @mouseleave.stop="mouseleave">
      <div v-if="$slots.title" class="title">
        <slot name="title" />
      </div>
      <ul>
        <li v-for="nav in navs" :key="nav.value" :class="{ current: currentPath === nav.value }" @click="handleChange(nav)" @mouseenter.stop="mouseover(nav.value)" @mousemove.stop>
          <a href="#">{{ nav.label }}</a>
        </li>
        <div class="slider" />
      </ul>
      <transition
        enter-active-class="animate__animated animate__fadeInDownBig"
        leave-active-class="animate__animated animate__fadeOutUpBig"
        :duration="400"
      >
        <div class="content">
          <template v-for="nav in navs" :key="nav.value">
            <slot v-if="showExpand && currentNav.value === nav.value" :name="nav.value" :data="nav" />
          </template>
        </div>
      </transition>
    </nav>
  </div>
</template>

<style scoped lang="scss">
$navsHeight: 40px;
$navWidth: 120px;
$navNum: 20; // v-bind(navLength)
$backgroundColor: rgba(250, 0, 146, 0.72);

.container{
  z-index: 999;
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $navsHeight;
    background: $backgroundColor;
    z-index: 999;

    .title {
      margin-right: 18px;
    }

    ul, li {
      margin: 0;
      padding: 0;
    }

    ul {
      display: flex;
      position: relative;
      z-index: 1;
      height: $navsHeight;

      li {
        list-style: none;
        width: $navWidth;
        line-height: $navsHeight;
        text-align: center;

        a {
          color: white;
          text-decoration: none;
        }

        @for $i from 1 to $navNum + 1 {
          &:nth-child(#{$i}):hover ~ .slider,
          &:nth-child(#{$i}).current ~ .slider {
            left: $navWidth * ($i - 1) + 10px;
          }
        }
      }

      .slider {
        width: 100px;
        height: $navsHeight;
        background-color: darken($backgroundColor, 1%);
        border-radius: 4px;
        position: absolute;
        left: 10px;
        bottom: 0;
        z-index: -1;
        transition: all ease 0.4s;
      }
    }

    .content {
      position: absolute;
      top: $navsHeight;
      width: 100%;
      z-index: -1;
      box-shadow: 0 5px 10px -5px #bfcbd9;
      border-radius: 0 0 10px 10px;
      color: #5a5a5a;
      background: white;
    }
  }
}
</style>
