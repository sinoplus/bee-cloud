<script setup name="ProductCategory" lang="ts">
import { GoodsFilled } from '@element-plus/icons-vue'
import { computed, useCssModule } from 'vue'
import CircleText from '../CircleText'
import { SketchType } from '@/components/Carousel/factory'
import useNaviStore from '@/store/modules/navi'
import Carousel from '@/components/Carousel/index.vue'

const naviStore = useNaviStore()
const bannerImages = computed(() => naviStore.bannerImages)
const styles = useCssModule()
</script>

<template>
  <div :class="styles.container">
    <el-row :class="styles.header">
      <el-col :span="3">
        <el-row align="middle" :class="styles.title">
          <el-icon color="rgba(250, 0, 146, 0.72)" :size="30">
            <GoodsFilled />
          </el-icon>
          <span :class="styles.text">新品上市</span>
        </el-row>
      </el-col>
      <el-col :span="21" :class="styles.tags">
        <el-row align="middle">
          <el-row align="middle" :class="styles.tag">
            <CircleText color="#352b6c" :class="styles.icon">
              新
            </CircleText>
            <span :class="styles.text">每周上新</span>
          </el-row>
          <el-row align="middle" :class="styles.tag">
            <CircleText color="#352b6c" :class="styles.icon">
              折
            </CircleText>
            <span :class="styles.text">爆款88折</span>
          </el-row>
        </el-row>
      </el-col>
    </el-row>
    <el-row :class="styles.body">
      <div :class="styles.left" class="animate__animated animate__fadeInLeft">
        <img src="https://pml8a4109-pic32.websiteonline.cn/upload/ex5p.jpg" alt="">
      </div>
      <div :class="styles.right">
        <Carousel :sketch-type="SketchType.Type2" :images="bannerImages" />
      </div>
    </el-row>
    <el-row justify="start" :class="styles.productions">
      <div v-for="(_, i) in 10" :key="i" :class="styles.item">
        <el-row :class="styles.img">
          <img src="https://pml8a4109-pic32.websiteonline.cn/upload/1_gfo8.jpg" alt="">
        </el-row>
        <el-row justify="center" align="middle" :class="styles.info">
          <span>一见倾心(8寸)----</span>
          <span :class="styles.price">￥219.00</span>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<style lang="scss" module>
.container {
  .header {
    display: flex;
    align-items: center;

    .title {
      .text {
        margin-left: 2px;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .tags {
      .tag {
        margin-left: 15px;
        .icon {
          transform: scale(0.8);
        }
        .text {
          margin-left: 2px;
          font-size: 14px;
        }
      }
    }
  }
  .body {
    height: 440px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;

    .left {
      width: 236px;
      height: 100%;
      margin-right: 10px;
    }
    .right {
      flex: 1;
      height: 100%;
    }
  }
  .productions {
    margin-top: 10px;
    .item {
      border: #eeeeee 1px solid;
      height: 230px;
      display: flex;
      flex-direction: column;
      max-width: 15%;
      margin: 0 10px 10px;
      .img {
        width: 100%;
        height: 160px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        flex-direction: column;
        .price {
          font-size: 16px;
          color: #8879d6;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
