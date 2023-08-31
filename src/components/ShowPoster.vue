<template>
  <div
    :style="{ backgroundImage: 'url(' + show.image + ')' }"
    class="poster"
  ></div>
</template>

<script lang="ts">
import { Show } from "@/types/Show";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ShowPoster",
  props: {
    show: {
      type: Object as () => Show,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.poster {
  height: 150px;
  width: 205px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
