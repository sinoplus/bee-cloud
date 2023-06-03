<script setup lang="ts">
import { toRefs, useCssModule } from 'vue'

interface IMenuProps {
  title: string
}

const props = withDefaults<IMenuProps>(defineProps<IMenuProps>(), {})
const { title } = toRefs(props)
const styles = useCssModule()
</script>

<template>
  <div :class="styles.container">
    <div :class="styles.title">
      {{ title }}
    </div>
    <div :class="styles.body">
      <nav>
        <ul :class="styles.cate">
          <li :class="styles.item">
            <a :class="styles['item-title']">鲜花用途</a>
            <div :class="styles['cate-list']">
              <a>送朋友</a>
              <a>送家人</a>
              <a>送爱人</a>
              <a>送朋友</a>
              <a>送家人</a>
              <a>送爱人</a>
              <a>送朋友</a>
              <a>送家人</a>
              <a>送爱人</a>
            </div>
          </li>
          <li :class="styles.item">
            <a :class="styles['item-title']">鲜花用途</a>
            <div :class="styles['cate-list']">
              <a>送朋友</a>
              <a>送家人</a>
              <a>送爱人</a>
            </div>
          </li>
          <li :class="styles.item">
            <a :class="styles['item-title']">鲜花用途</a>
            <div :class="styles['cate-list']">
              <a>送朋友</a>
              <a>送家人</a>
              <a>送爱人</a>
            </div>
          </li>
          <li :class="styles.item">
            <a :class="styles['item-title']">鲜花用途</a>
            <div :class="styles['cate-list']">
              <a>送朋友</a>
              <a>送家人</a>
              <a>送爱人</a>
            </div>
          </li>
          <li :class="styles.item">
            <a :class="styles['item-title']">鲜花用途</a>
            <div :class="styles['cate-list']">
              <a>送朋友</a>
              <a>送家人</a>
              <a>送爱人</a>
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
  border-radius: 12px 12px 0 0;
  min-height: 440px;
  background-color: #546c9dc2;
  .title {
    border-radius: 12px 12px 0 0;
    background-color: #8f56b4;
    text-align: center;
  }
  .body {
    nav {
      ul, li {
        margin: 0;
        padding: 0;
      }

      ul.cate {
        li.item {
          list-style: none;
          padding: 9px 0 9px 20px;
          border-bottom: 1px dashed rgba(255,255,255,0.2);

          .item-title {
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
