<template>
  <div
    :style="{ backgroundImage: 'url(' + show.image + ')' }"
    class="image is-2by3 poster"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Show } from "@/types/Show";

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
  // height: 150px;
  // width: 205px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
