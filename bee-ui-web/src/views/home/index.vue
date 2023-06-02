<script setup name="Home" lang="ts">
import { ref } from 'vue'
import Carousel from './carousel'
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
const navHeight = ref('40px')
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="nav-bg" />
      <header>
        <div class="navbar">
          <span class="title">全部商品分类</span>
          <Navbar :height="navHeight" :items="navs" @change="nav => console.log(nav)">
            <template v-for="nav in navs" :key="nav.value" #[nav.value]>
              <div class="expand">
                {{ nav.label }}
              </div>
            </template>
          </Navbar>
          <span class="call">24小时服务热线：400-000-0000</span>
        </div>
        <div class="carousel">
          <Carousel />
        </div>
      </header>
    </div>
  </div>
</template>

<style scoped lang="scss">
$backgroundColor: rgba(250, 0, 146, 0.72);
$navsHeight: v-bind(navHeight);
.container{
  width: 100%;
  color: white;

  .content {
    margin: 0 auto;
    width: 85vw;
    min-height: 4494px;

    .navbar {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: $navsHeight;
      line-height: $navsHeight;
      width: 100%;

      .expand {
        height: 150px;
      }

      .title {
        position: relative;
        z-index: 99;
      }

      .call {
        position: relative;
        z-index: 99;
      }
    }

    .nav-bg {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      width: 100vw;
      height: $navsHeight;
      background-color: $backgroundColor;
    }

    .carousel {
      position: absolute;
      width: 100vw;
      top: 0;
      left: 0;
      height: 440px;
    }
  }
}
</style>
