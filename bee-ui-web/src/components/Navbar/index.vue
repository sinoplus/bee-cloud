<script setup name="Home" lang="ts">
import { computed, ref, toRefs, useCssModule } from 'vue'

interface INavbarItemProps {
  label: string
  value: string
  hasPop?: boolean
}

interface INavbarProps {
  items: INavbarItemProps[]
  height?: string
}

const props = withDefaults<INavbarProps>(defineProps<INavbarProps>(), {
  height: '40px',
})

const emit = defineEmits(['change'])
const { items: navs, height } = toRefs(props)

const styles = useCssModule()

const showPop = ref<boolean>(false)
const hoverPath = ref<string>('') // 悬浮中的元素
const activeValue = ref<string>('')
activeValue.value = navs?.value?.[0]?.value ?? ''

// 当前悬浮的nav
const currentValue = computed(() => showPop.value ? hoverPath.value : activeValue.value)
const currentNav = computed(() => navs?.value!.find(nav => nav.value === currentValue.value))
const hasPop = computed(() => showPop.value)

function mouseover(path) {
  showPop.value = true
  hoverPath.value = path
}

function mouseleave() {
  showPop.value = false
  hoverPath.value = ''
}

function handleChange(item: INavbarItemProps) {
  activeValue.value = item.value
  emit('change', item)
}
</script>

<template>
  <div :class="styles.container">
    <nav :class="styles.navs" @mouseleave.stop="mouseleave">
      <ul @mousemove.stop="mouseleave">
        <li v-for="nav in navs" :key="nav.value" :class="{ [styles.current]: currentValue === nav.value }" @click="handleChange(nav)" @mouseenter.stop="mouseover(nav.value)" @mousemove.stop>
          <a href="#">{{ nav.label }}</a>
        </li>
        <li :class="styles.slider" />
      </ul>
      <div :class="[styles.pop, !hasPop ? styles.up : styles.down]">
        <template v-for="nav in navs" :key="nav.value">
          <span v-if="currentNav?.value === nav.value" @click="handleChange(nav)">
            <slot :name="nav.value" :data="nav" />
          </span>
        </template>
      </div>
    </nav>
  </div>
</template>

<style module lang="scss">
$height: v-bind(height);
$navWidth: 120px;
$navWidthActive: 100px;
$navOffsetX: calc(($navWidth - $navWidthActive) / 2);
$navNum: 20;

.container {
  height: $height;
  nav {
    height: 100%;

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

        @for $i from 1 to $navNum + 1 {
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

      &.down {
        max-height: 40vh;
      }
    }
  }
}
</style>
