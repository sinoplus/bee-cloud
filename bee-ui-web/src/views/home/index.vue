<script setup name="Home" lang="ts">
import { ref, useCssModule } from 'vue'

import img1 from './imgs/img1.jpeg'
import img2 from './imgs/img2.jpeg'
import img3 from './imgs/img3.jpeg'
import img4 from './imgs/img4.jpeg'
import Category from './components/Category'
import type { ICateProps } from '@/views/home/components/Category/index.vue'
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

const cateItems = ref<ICateProps[]>([
  {
    value: 0,
    label: '鲜花用途',
    cateList: [
      {
        value: 0,
        label: '爱情鲜花',
      },
      {
        value: 1,
        label: '生日鲜花',
      },
      {
        value: 2,
        label: '友情鲜花',
      },
      {
        value: 3,
        label: '问候长辈',
      },
      {
        value: 4,
        label: '探病慰问',
      },
      {
        value: 5,
        label: '道歉鲜花',
      },
      {
        value: 6,
        label: '祝贺鲜花',
      },
      {
        value: 7,
        label: '婚庆鲜花',
      },
      {
        value: 8,
        label: '商务鲜花',
      },
    ],
  },
  {
    value: 1,
    label: '鲜花花材',
    cateList: [
      {
        value: 0,
        label: '玫瑰',
      },
      {
        value: 1,
        label: '康乃馨',
      },
      {
        value: 2,
        label: '向日葵',
      },
      {
        value: 3,
        label: '扶郎',
      },
      {
        value: 4,
        label: '郁金香',
      },
      {
        value: 5,
        label: '马蹄莲',
      },
    ],
  },
  {
    value: 2,
    label: '永生花',
    cateList: [
      {
        value: 0,
        label: '永生瓶花',
      },
      {
        value: 1,
        label: '经典花盒',
      },
      {
        value: 2,
        label: '特色永生花',
      },
    ],
  },
  {
    value: 3,
    label: '蛋糕',
    cateList: [
      {
        value: 0,
        label: '元祖',
      },
      {
        value: 1,
        label: '幸福西饼',
      },
      {
        value: 2,
        label: '21cake',
      },
      {
        value: 3,
        label: '诺心蛋糕',
      },
      {
        value: 4,
        label: '窝夫小子',
      },
      {
        value: 5,
        label: 'BONCAKE',
      },
    ],
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
            <Category name="全部商品分类" :items="cateItems" />
          </div>
          <Navbar :height="navHeight" :items="navs" @change="nav => console.log(nav)">
            <template v-for="nav in navs.filter(a => a.value !== 'home')" :key="nav.value" #[nav.value]>
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
        width: 1300px;
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
