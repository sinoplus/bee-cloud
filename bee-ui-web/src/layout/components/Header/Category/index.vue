<script setup name="Category" lang="ts">
import { computed, ref, toRefs, useCssModule } from 'vue'

export interface ICateProps {
  value: string | number
  label: string
  hasPop?: boolean
  cateList: Omit<ICateProps, 'hasPop' | 'cateList'>[]
}

interface ICategoryProps {
  name: string
  items: ICateProps[]
}

const props = withDefaults<ICategoryProps>(defineProps<ICategoryProps>(), {})
const emit = defineEmits(['change'])
const { name, items } = toRefs<ICategoryProps>(props)
const styles = useCssModule()

const hoverValue = ref<string>('') // 悬浮中的元素
const activeValue = ref<string>('')
const currentData = computed(() => items?.value?.find(item => item.value === hoverValue.value) ?? {})
const showPop = computed(() => currentData.value?.hasPop)

function mouseenter(path) {
  hoverValue.value = path
}

function mouseleave() {
  hoverValue.value = ''
}

function handleChange(item: ICateProps) {
  activeValue.value = String(item.value)
  emit('change', item)
}
</script>

<template>
  <div :class="styles.container">
    <div :class="styles.title">
      {{ name }}
    </div>
    <div :class="styles.body">
      <nav @mouseleave.stop="mouseleave">
        <ul :class="styles.cate">
          <li
            v-for="item in items"
            :key="item.value"
            :class="[styles.item, item.hasPop && item.value === hoverValue ? styles.hasPop : '']"
            @mouseenter.stop="mouseenter(item.value)"
          >
            <a :class="styles['cate-label']">{{ item.label }}</a>
            <div :class="styles['cate-list']">
              <a v-for="cate in item.cateList" :key="cate.value">{{ cate.label }}</a>
            </div>
          </li>
        </ul>
        <div :class="[styles.pop, !showPop ? styles.up : styles.down]">
          <span @click="handleChange(currentData)">
            <slot name="pop" :data="currentData" />
          </span>
        </div>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" module>
$width: 240px;
$titleHeight: 40px;
$bodyMinHeight: 480px;

.container {
  width: $width;
  .title {
    border-radius: 12px 12px 0 0;
    background-color: #352b6cc2;
    text-align: center;
    height: $titleHeight;
  }
  .body {
    border-radius: 0 0 6px 6px;
    background-color: #352b6c6e;
    min-height: $bodyMinHeight;
    position: relative;
    nav {
      ul, li {
        margin: 0;
        padding: 0;
      }

      ul.cate {
        line-height: 24px;
        li.item {
          list-style: none;
          padding: 9px 0 9px 20px;
          border-top: 1px dashed rgba(255,255,255,0.2);

          .cate-label {
            margin-top: 2px;
            padding-left: 4px;
            padding-right: 28px;
            display: inline-block;
            font-size: 16px;
            line-height: 20px;
            font-weight: bold;
            width: 100%;
            box-sizing: border-box;
          }

          .cate-list {
            margin-top: 5px;
          }

          a {
            display: inline-block;
            font-size: 14px;
            line-height: 24px;
            padding: 0 4px;
            &:hover {
              color: #fd5fae;
            }
          }

          &.hasPop {
            background-color: #fff;
            color: #70797f;

            &.cate-label {
              color: #242628;
            }
          }
        }
      }

      .pop {
        height: 100%;
        transition: width 0.2s linear;
        position: absolute;
        top: 0;
        left: $width;
        max-width: 800px;
        box-shadow: 10px 5px 10px -5px #bfcbd9;
        border-radius: 0 5px 5px 0;
        width: 0;
        z-index: 99;
        background-color: #fff;
        color: #70797f;
        overflow: hidden;

        &.up {
          width: 0;
        }

        &.down {
          width: 60vw;
        }
      }
    }
  }
}
</style>
