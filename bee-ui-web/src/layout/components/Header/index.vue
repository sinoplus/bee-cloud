<script setup name="Header" lang="ts">
import { computed, ref, useCssModule } from 'vue'
import Category from './Category'
import Navigation from './Navigation'
import Carousel from '@/components/Carousel'
import useNaviStore from '@/store/modules/navi'

const navHeight = ref<string>('40px')
const styles = useCssModule()
const naviStore = useNaviStore()
const bannerImages = computed(() => naviStore.bannerImages)
const categoryList = computed(() => naviStore.categoryList)
</script>

<template>
  <header>
    <div :class="styles.navi">
      <div :class="styles.content">
        <div :class="styles.category">
          <Category name="全部商品分类" :items="categoryList" />
        </div>
        <Navigation />
      </div>
    </div>
    <div :class="styles.carousel">
      <Carousel :images="bannerImages" />
    </div>
  </header>
</template>

<style lang="scss" module>
$height: 440px;
$navsHeight: v-bind(navHeight);
$backgroundColor: rgba(250, 0, 146, 0.72);

header {
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  min-height: $height;
  color: white;

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

    .content {
      width: 1300px;
      height: 100%;
      margin: 0 auto;
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
    height: $height;
  }
}
</style>
