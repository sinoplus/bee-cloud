<script setup name="Navigation" lang="ts">
import { computed, ref, useCssModule } from 'vue'
import useNaviStore from '@/store/modules/navi'
import Navbar from '@/components/Navbar'

const navHeight = ref<string>('40px')
const styles = useCssModule()
const naviStore = useNaviStore()

const navs = computed<any[]>(() => naviStore.items)
</script>

<template>
  <Navbar :height="navHeight" :items="navs" @change="nav => console.log(nav)">
    <template #pop="data">
      <div v-if="data.data.category?.length > 0" :class="styles.pop">
        <div v-for="cate in data.data.category" :key="cate.value" class="animate__animated animate__zoomIn" :class="[styles.item]">
          <img :src="cate.img" :alt="cate.label" :class="styles.img">
          <span :class="styles.label">{{ cate.label }}</span>
        </div>
      </div>
    </template>
  </Navbar>
</template>

<style module lang="scss">
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
</style>
