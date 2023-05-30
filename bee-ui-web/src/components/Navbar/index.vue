<script setup name="Home" lang="ts">
import { computed, ref, toRefs } from 'vue'

const props = defineProps({
  items: {
    type: Array<any>,
    required: true,
  },
})

const { items: navs } = toRefs(props)

const isShow = ref<boolean>(false)
const hoverPath = ref(null) // 悬浮中的元素
const activePath = ref(null) // 选中的元素

function mouseover(path) {
  isShow.value = true
  hoverPath.value = path
}

function mouseleave() {
  isShow.value = false
  hoverPath.value = null
}

const hoverNav = computed(() => navs?.value!.find(nav => nav.path === hoverPath.value))
const currentPath = computed(() => isShow.value ? hoverPath.value : activePath.value)
</script>

<template>
  <div class="container">
    <nav class="navs" @mouseleave.stop="mouseleave">
      <ul>
        <li v-for="nav in navs" :key="nav.path" :class="{ current: currentPath === nav.path }" @click="activePath = nav.path" @mouseenter.stop="mouseover(nav.path)" @mousemove.stop>
          <a href="#">{{ nav.title }}</a>
        </li>
        <div class="slider" />
      </ul>
      <transition
        enter-active-class="animate__animated animate__fadeInDownBig"
        leave-active-class="animate__animated animate__fadeOutUpBig"
        :duration="400"
      >
        <div
          v-if="isShow"
          class="content"
        >
          {{ hoverNav.title }}
        </div>
      </transition>
    </nav>
  </div>
</template>

<style scoped lang="scss">
$navsHeight: 40px;
$backgroundColor: #f56c6c;
$activeBgColor: #f69f9f;

.container{
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $navsHeight;
    background: $backgroundColor;

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
        width: 120px;
        line-height: $navsHeight;
        text-align: center;

        a {
          color: white;
          text-decoration: none;
        }
      }

      .slider {
        width: 100px;
        height: $navsHeight;
        background-color: $activeBgColor;
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
      height: 150px;
      width: 100%;
      z-index: -1;
      box-shadow: 0 5px 10px -5px #bfcbd9;
      border-radius: 0 0 10px 10px;
      color: #5a5a5a;
      background: white;
    }
  }

  ul li:nth-child(1):hover ~ .slider,
  li:nth-child(1).current ~ .slider {
    left: 10px;
  }

  ul li:nth-child(2):hover ~ .slider,
  li:nth-child(2).current ~ .slider  {
    left: 128px;
  }

  ul li:nth-child(3):hover ~ .slider,
  li:nth-child(3).current ~ .slider  {
    left: 248px;
  }

  ul li:nth-child(4):hover ~ .slider,
  li:nth-child(4).current ~ .slider  {
    left: 368px;
  }

  ul li:nth-child(5):hover ~ .slider,
  li:nth-child(5).current ~ .slider  {
    left: 488px;
  }

  ul li:nth-child(6):hover ~ .slider,
  li:nth-child(6).current ~ .slider  {
    left: 608px;
  }
}
</style>
