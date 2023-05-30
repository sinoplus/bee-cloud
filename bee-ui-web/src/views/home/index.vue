<script setup name="Home" lang="ts">
import { ref } from 'vue'
import Navbar from '@/components/Navbar'

const navs = ref<any[]>([
  {
    path: '/home',
    title: '首页',
  },
  {
    path: '/flower',
    title: '鲜花',
  },
  {
    path: '/cake',
    title: '蛋糕',
  },
  {
    path: '/gift',
    title: '礼品',
  },
  {
    path: '/flash',
    title: '秒杀',
  },
  {
    path: '/group',
    title: '团购',
  },
])
</script>

<template>
  <Navbar :items="navs" />
</template>

<style scoped lang="scss">
$navs_height: 40px;
.container{
  margin: 0 10px 0 10px;
  position: relative;
  color: white;
  z-index: 1;

  .navs {
    width: 100%;
    height: $navs_height;
    background: #f56c6c;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .nav {
      flex: 1;
      text-align: center;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 6px;
      border-radius: 4px;
      &:hover {
        background: #ff9494;
        transform: scale(1.05);
      }
      &.active {
        background: #ef4f4f;
      }
    }
  }
  .content {
    position: absolute;
    top: $navs_height;
    height: 150px;
    width: 100%;
    z-index: -1;
    box-shadow: 0 5px 10px -5px #bfcbd9;
    border-radius: 0 0 10px 10px;
    color: #5a5a5a;
    background: white;
  }
}
</style>
