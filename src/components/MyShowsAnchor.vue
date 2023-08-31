<template>
  <ul>
    <li>
      <a href="#"> My Shows <slot></slot> </a>
    </li>
    <!-- Add more main navigation items as needed -->
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyShowsAnchor",
});
</script>
<style scoped lang="scss">
.my-shows-anchor {
  display: inline-block;
  margin-top: 20px;
  margin-left: 20px;
  font-size: larger;
  cursor: pointer;
}
</style>
