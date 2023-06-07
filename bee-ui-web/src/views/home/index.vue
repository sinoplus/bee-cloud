<script setup name="Home" lang="ts">
import { useCssModule } from 'vue'
import Flash from './components/Flash'

const styles = useCssModule()
</script>

<template>
  <div :class="styles.container">
    <div :class="styles['full-row']">
      <Flash />
    </div>
  </div>
</template>

<style lang="scss" module>
.container{
  width: 100%;
  margin: 0 auto;
  max-width: 1300px;

  .full-row {
    margin: 15px 0;
  }
}
</style>
