<script setup name="Flash" lang="ts">
import { useCssModule } from 'vue'

const styles = useCssModule()
</script>

<template>
  <div :class="styles.container">
    <div :class="styles.advert">
      <img src="https://pml8a4109-pic32.websiteonline.cn/upload/h1.jpg" alt="flash">
      <div :class="styles.cst">
        <el-button type="warning" size="small" :class="styles.btnText">
          限时秒杀
        </el-button>
        <span :class="styles.text">每款限量10个</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  width: 100%;
  display: flex;

  .advert {
    width: 442px;
    position: relative;
    img {
      width: 100%;
    }
    .cst {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 45%;
      left: 20px;
      .btnText {
        width: 95px;
      }
      .text {
        color: rgb(255, 255, 255);
        font-size: 20px;
        line-height: 35px;
        font-weight: bold;
      }
    }
    &:hover {
      cursor: pointer;
      &:before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}
</style>
