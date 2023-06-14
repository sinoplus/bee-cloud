<script setup name="Flash" lang="ts">
import { Clock } from '@element-plus/icons-vue'
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
    <div :class="styles.productions">
      <div v-for="(_, i) in 3" :key="i" :class="styles.item">
        <div :class="styles.img">
          <img src="https://pml8a4109-pic32.websiteonline.cn/upload/6_05lt.jpg" alt="">
        </div>
        <div :class="styles.info">
          <p :class="styles.title">
            <a>情有独钟----戴安娜粉玫瑰50枝</a>
          </p>
          <p :class="styles.price">
            <label :class="styles.label">原价：</label>
            <span :class="styles.value">￥55.00</span>
          </p>
          <p :class="styles.price">
            <label :class="styles.label">秒杀价：</label>
            <span :class="styles.value">￥55.00</span>
          </p>
          <p>
            <el-button type="primary" :disabled="true" :icon="Clock as any" size="small">
              已结束
            </el-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 300px;

  .advert {
    width: 460px;
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
        background-color: rgba(0,0,0,.3);
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }

  .productions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    width: calc(100% - 460px);
    height: 100%;
    padding-left: 15px;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      height: 100%;
      padding: 0 10px 5px;
      border: 1px solid #eeeeee;
      cursor: pointer;
      width: 32.5%;
      .img {
        height: 180px;
        img {
          width: 100%;
        }
      }
      .info {
        flex: 1;
        line-height: 140%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .title {
          font-weight: bold;
          font-size: 14px;
          line-height: inherit;
        }
        .price {
          color: #acacac;
          line-height: inherit;

          .label {
            font-size: 12px;
          }
          .value {
            font-size: 18px;
            font-weight: bold;
            color: #8879d6;
          }
        }
      }
    }
  }
}
</style>
