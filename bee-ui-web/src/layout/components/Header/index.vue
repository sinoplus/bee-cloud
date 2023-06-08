<script setup name="Header" lang="ts">
import { computed, ref, useCssModule } from 'vue'
import Category from './Category'
import Navigation from '@/components/Navigation'
import Carousel from '@/components/Carousel'
import useNaviStore from '@/store/modules/navi'

const navHeight = ref<string>('40px')
const styles = useCssModule()
const naviStore = useNaviStore()
const navs = computed<any[]>(() => naviStore.items)
const bannerImages = computed(() => naviStore.bannerImages)
const categoryList = computed(() => naviStore.categoryList)
</script>

<template>
  <div :class="styles.container">
    <div :class="styles.header">
      <div :class="styles.content">
        <div :class="styles.category">
          <Category name="全部商品分类" :items="categoryList" />
        </div>
        <div :class="styles.navi">
          <Navigation :height="navHeight" :items="navs" @change="nav => console.log(nav)">
            <template #pop="data">
              <div v-if="data.data.category?.length > 0" :class="styles.pop">
                <div v-for="cate in data.data.category" :key="cate.value" class="animate__animated animate__zoomIn" :class="[styles.item]">
                  <img :src="cate.img" :alt="cate.label" :class="styles.img">
                  <span :class="styles.label">{{ cate.label }}</span>
                </div>
              </div>
            </template>
          </Navigation>
        </div>
        <div :class="styles.call">
          <span>24小时服务热线：400-000-0000</span>
        </div>
      </div>
    </div>
    <div :class="styles.carousel">
      <Carousel :images="bannerImages" />
    </div>
  </div>
</template>

<style lang="scss" module>
$navsHeight: v-bind(navHeight);
$carouselHeight: 480px;
$height: calc($navsHeight + $carouselHeight);
$backgroundColor: rgba(250, 0, 146, 0.72);

.container {
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  min-height: $height;
  color: white;

  .header {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    line-height: $navsHeight;
    height: $navsHeight;
    width: 100%;
    &:before {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -10;
      width: 100%;
      height: $navsHeight;
      background-color: $backgroundColor;
    }

    .content {
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1400px;
      min-width: 1300px;
      height: 100%;

      .category {
        position: relative;
        width: 240px;
        height: 100%;
        border-radius: 12px 12px 0 0;
      }

      .navi {
        flex: 1;
        margin: 0 10px;

        .pop {
          height: 180px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: white;

          .item {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            position: relative;
            .img {
              height: 80%;
              transition: all ease 0.4s;
              &:hover {
                transform: scale(1.1);
              }
            }
            .label {
              font-size: 12px;
            }
          }
        }
      }

      .call {
        width: 250px;
      }
    }
  }

  .carousel {
    position: absolute;
    width: 100vw;
    top: $navsHeight;
    left: 0;
    height: $carouselHeight;
  }
}
</style>
