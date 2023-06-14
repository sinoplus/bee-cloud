<script setup name="CircleText" lang="ts">
import { toRefs, useCssModule } from 'vue'

interface ICircleTextProps {
  fontSize?: string
  color?: string
}

const props = withDefaults<ICircleTextProps>(defineProps<ICircleTextProps>(), {
  fontSize: '12px',
  color: 'rgba(250, 0, 146, 0.72)',
})
const { fontSize, color } = toRefs(props)
const styles = useCssModule()
</script>

<template>
  <span :class="styles.circle">
    <slot />
  </span>
</template>

<style lang="scss" module>
$fontSize: v-bind(fontSize);
$color: v-bind(color);
$borderWidth: 2px;
$width: calc($fontSize * 1.8);
$lineHeight: calc($width - $borderWidth * 2);

.circle {
  display: inline-block;
  border-radius: 50%;
  width: $width;
  height: $width;
  color: $color;
  font-size: $fontSize;
  line-height: $lineHeight;
  border: $borderWidth $color solid;
  font-weight: normal;
  text-align: center;
}
</style>
