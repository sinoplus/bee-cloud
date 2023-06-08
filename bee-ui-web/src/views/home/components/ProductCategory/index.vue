<script setup name="ProductCategory" lang="ts">
import { GoodsFilled } from '@element-plus/icons-vue'
import { useCssModule } from 'vue'
import CircleText from '../CircleText'

const styles = useCssModule()
</script>

<template>
  <div :class="styles.container">
    <div :class="styles.header">
      <span>
        <el-icon color="pink" :size="20">
          <GoodsFilled />
        </el-icon>
        <span>新品上市</span>
      </span>
      <span>
        <span>
          <CircleText>
            新
          </CircleText>
          <span>每周上新</span>
        </span>
        <span>
          <CircleText>
            折
          </CircleText>
          <span>爆款88折</span>
        </span>
      </span>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  .header {

  }
}
</style>
