<template>
  <span :class="[isSecondary ? 'is-warning' : 'is-info', 'button', 'isLight']">
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

<style scoped lang="scss">
// Define the color variables
$primary-accent-color: #ff6600; // Primary accent color (orange)
$secondary-accent-color: #00aaff; // Secondary accent color (blue)
$text-color: #fff; // Text color (white)
$background-color: #222; // Background color (dark)
$header-footer-bg-color: #333; // Header and footer background color (slightly lighter dark)
$input-field-bg-color: #444; // Input field background color (dark)

// Button styles
// .button {
//   display: inline-block;
//   padding: 10px 20px; // Adjust padding as needed
//   background-color: $primary-accent-color;
//   color: $text-color;
//   border: none;
//   cursor: pointer;
//   font-weight: bold;
//   text-align: center;
//   text-decoration: none;
//   transition: background-color 0.3s ease;
//   border-radius: 5px;
//   margin-right: 10px;

//   &:hover {
//     background-color: darken(
//       $primary-accent-color,
//       10%
//     ); // Darken the color on hover
//   }
// }

// .secondary-button {
//   display: inline-block;
//   padding: 10px 20px; // Adjust padding as needed
//   background-color: $secondary-accent-color;
//   color: $text-color;
//   border: none;
//   cursor: pointer;
//   font-weight: bold;
//   text-align: center;
//   text-decoration: none;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: darken(
//       $secondary-accent-color,
//       10%
//     ); // Darken the color on hover
//   }
// }
</style>
