<script setup name="Search" lang="ts">
import { useCssModule } from 'vue'
import { Search } from '@element-plus/icons-vue'

const styles = useCssModule()
</script>

<template>
  <div :class="styles['search-box']">
    <div :class="styles.group">
      <div :class="styles.icon">
        <el-icon><Search /></el-icon>
      </div>
      <input name="keyword" :class="styles.search" type="text" autocomplete="off">
      <div :class="styles.btn">
        <el-button type="primary" color="rgba(250, 0, 146, 0.72)" round>
          搜索
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.search-box {
  position: relative;
  .group {
    display: inline-flex;
    align-items: center;
    position: relative;
    max-width: 480px;
    width: 100%;
    height: 48px;
    border-radius: 24px;
    border: 2px solid rgba(250, 0, 146, 0.72);
    .icon {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      margin-left: 8px;
      height: 100%;
      color: #bbc1c5;
    }
    .search {
      outline: none;
      width: 264px;
      height: 100%;
      font-size: 14px;
      border: none;
      background-color: inherit;
    }
    .btn {
      width: 118px;
      height: 100%;
      button {
        width: 100%;
        height: 100%;
        border-radius: 24px;
        outline: none;
        color: white;
        font-size: 18px;
        font-weight: bold;
        border: none;
      }
    }
  }
}
</style>
