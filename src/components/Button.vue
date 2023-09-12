<template>
  <span
    :class="[
      isSecondary ? 'is-warning' : 'is-info',
      'button',
      'isLight',
      'isResponsive',
    ]"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CommonButton",
  props: {
    isSecondary: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss"></style>
