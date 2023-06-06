<script setup lang="ts">
import { ref, useCssModule } from 'vue'
import Navbar from '@/components/Navbar'

const navHeight = ref<string>('40px')
const styles = useCssModule()

const navs = ref<any[]>([
  {
    value: 'home',
    label: '首页',
  },
  {
    value: 'flower',
    label: '鲜花',
    category: [
      {
        value: 'hmg',
        label: '红玫瑰',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/12.jpg',
      },
      {
        value: 'hmg',
        label: '白玫瑰',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/11.jpg',
      },
      {
        value: 'huangmg',
        label: '黄玫瑰',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/13.jpg',
      },
      {
        value: 'lmg',
        label: '蓝玫瑰',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/9.jpg',
      },
      {
        value: 'bh',
        label: '百合',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/14.jpg',
      },
      {
        value: 'ml',
        label: '茉莉',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/15.jpg',
      },
    ],
  },
  {
    value: 'cake',
    label: '蛋糕',
    category: [
      {
        value: 'sydg',
        label: '生日蛋糕',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/1_gfo8.jpg',
      },
      {
        value: 'hqdg',
        label: '婚庆蛋糕',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/2_br3r.jpg',
      },
      {
        value: 'nydg',
        label: '奶油蛋糕',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/3_hcla.jpg',
      },
      {
        value: 'msdg',
        label: '慕斯蛋糕',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/4_f9sg.jpg',
      },
      {
        value: 'ddg',
        label: '大蛋糕',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/8_ou6u.jpg',
      },
      {
        value: 'xxdg',
        label: '小小蛋糕',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/6_05lt.jpg',
      },
    ],
  },
  {
    value: 'gift',
    label: '礼品',
    category: [
      {
        value: 'srlp',
        label: '生日礼品',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/10.jpg',
      },
      {
        value: 'qllp',
        label: '情侣礼品',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/19.jpg',
      },
      {
        value: 'txlp',
        label: '同学礼品',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/1_9el9.jpg',
      },
      {
        value: 'tslp',
        label: '同事礼品',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/4_bau6.jpg',
      },
      {
        value: 'fwlp',
        label: '服务礼品',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/2_hbo8.jpg',
      },
      {
        value: 'hzlp',
        label: '孩子礼品',
        img: 'https://pml8a4109-pic32.websiteonline.cn/upload/6_nify.jpg',
      },
    ],
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
  <Navbar :height="navHeight" :items="navs" @change="nav => console.log(nav)">
    <template v-for="nav in navs.filter(a => a.category?.length)" :key="nav.value" #[nav.value]>
      <div :class="styles.expand">
        <div v-for="cate in nav.category" :key="cate.value" class="animate__animated animate__fadeInLeft" :class="[styles.item]">
          <img :src="cate.img" :alt="cate.label" :class="styles.img">
          <span :class="styles.label">{{ cate.label }}</span>
        </div>
      </div>
    </template>
  </Navbar>
</template>

<style lang="scss" module>
.expand {
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
