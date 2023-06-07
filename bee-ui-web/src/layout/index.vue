<script setup lang="ts">
import { useCssModule } from 'vue'
import { AppMain, Header } from './components'

const styles = useCssModule()
</script>

<template>
  <div :class="styles.container">
    <Header />
    <AppMain />
  </div>
</template>

<style lang="scss" module>
@import '@/assets/styles/mixin.scss';
@import '@/assets/styles/variables.module.scss';

.container {
  width: 100%;
}
</style>
