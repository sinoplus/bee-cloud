<script setup lang="ts">
import { toRefs, useCssModule } from 'vue'

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
const { name, items } = toRefs<ICategoryProps>(props)
const styles = useCssModule()
</script>

<template>
  <div :class="styles.container">
    <div :class="styles.title">
      {{ name }}
    </div>
    <div :class="styles.body">
      <nav>
        <ul :class="styles.cate">
          <li v-for="item in items" :key="item.value" :class="styles.item">
            <a :class="styles['cate-label']">{{ item.label }}</a>
            <div :class="styles['cate-list']">
              <a v-for="cate in item.cateList" :key="cate.value">{{ cate.label }}</a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  position: relative;
  width: 240px;
  border-radius: 12px 12px 6px 6px;
  min-height: 440px;
  background-color: rgb(59 74 104 / 61%);
  .title {
    border-radius: 12px 12px 0 0;
    background-color: #6c5c81;
    text-align: center;
  }
  .body {
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
          border-bottom: 1px dashed rgba(255,255,255,0.2);

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

            a {
              display: inline-block;
              font-size: 14px;
              line-height: 24px;
              padding: 0 4px;
            }
          }
        }
      }
    }
  }
}
</style>
