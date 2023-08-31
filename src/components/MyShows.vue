<template>
  <div>
    <h1>My Shows</h1>
    <div v-for="show in shows" :key="show.id">
      {{ show.name }}
    </div>
  </div>
  <SearchShows />
</template>
<script lang="ts">
import { Show } from "@/types/Show";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyShows",
  props: {
    shows: {
      type: Array as () => Show[],
      required: true,
    },
  },
  components: {},
});
</script>
