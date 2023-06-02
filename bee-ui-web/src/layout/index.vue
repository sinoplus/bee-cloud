<script setup lang="ts">
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()
const theme = computed(() => settingsStore.theme)

const classObj = computed(() => ({
}))

const { width } = useWindowSize()
</script>

<template>
  <div
    :class="classObj"
    class="app-wrapper"
    :style="{ '--current-color': theme }"
  />
</template>

<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
@import '@/assets/styles/variables.module.scss';
</style>
