<script setup name="Home" lang="ts">
import { ref } from 'vue'
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
</script>

<template>
  <div class="container">
    <header>
      <Navbar :items="navs" @change="nav => console.log(nav)">
        <template #title>全部商品分类</template>
        <template v-for="nav in navs" :key="nav.value" #[nav.value]>
          <div style="height: 150px">
            {{ nav.label }}
          </div>
        </template>
      </Navbar>
    </header>
    <div>12312312</div>
  </div>
</template>

<style scoped lang="scss">
.container{
  color: white;
}
</style>
