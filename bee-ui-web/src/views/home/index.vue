<script setup name="Home" lang="ts">
import { ref, useCssModule } from 'vue'

import img1 from './imgs/img1.jpeg'
import img2 from './imgs/img2.jpeg'
import img3 from './imgs/img3.jpeg'
import img4 from './imgs/img4.jpeg'
import Category from './components/Category'
import Carousel from '@/components/Carousel'
import Navbar from '@/components/Navbar'

const navs = ref<any[]>([
  {
    value: 'home',
    label: '首页',
  },
  {
    value: 'flower',
    label: '鲜花',
  },
  {
    value: 'cake',
    label: '蛋糕',
  },
  {
    value: 'gift',
    label: '礼品',
  },
  {
    value: 'flash',
    label: '秒杀',
  },
  {
    value: 'group',
    label: '团购',
  },
])
const navHeight = ref<string>('40px')
const bannerImages = ref<string[]>([img1, img2, img3, img4])

const styles = useCssModule()
</script>

<template>
  <div :class="styles.container">
    <header>
      <div :class="styles.navi">
        <div :class="styles['navi-container']">
          <div :class="styles.category">
            <Category title="全部商品分类" />
          </div>
          <Navbar :height="navHeight" :items="navs" @change="nav => console.log(nav)">
            <template v-for="nav in navs" :key="nav.value" #[nav.value]>
              <div :class="styles.expand">
                {{ nav.label }}
              </div>
            </template>
          </Navbar>
        </div>
        <!--          <span :class="styles.call">24小时服务热线：400-000-0000</span> -->
      </div>
      <div :class="styles.carousel">
        <Carousel :images="bannerImages" />
      </div>
    </header>
    <div :class="styles.body" />
  </div>
</template>

<style lang="scss" module>
$backgroundColor: rgba(250, 0, 146, 0.72);
$navsHeight: v-bind(navHeight);
.container{
  width: 100%;
  color: white;

  header {
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    .navi {
      position: relative;
      min-width: 1200px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: $navsHeight;
      line-height: $navsHeight;
      z-index: 1;

      .navi-container {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
      }

      &:before {
        content: '';
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -10;
        width: 100vw;
        height: $navsHeight;
        background-color: $backgroundColor;
      }

      .expand {
        min-height: 150px;
      }

      .category {
        position: relative;
        width: 240px;
        height: 52px;
        float: left;
        border-radius: 12px 12px 0 0;
        margin-right: 40px;
      }
    }

    .carousel {
      position: absolute;
      width: 100vw;
      top: 0;
      left: 0;
      height: 440px;
    }
  }

  .body {
    margin: 0 auto;
    width: 88vw;
    max-width: 1500px;
  }
}
</style>
