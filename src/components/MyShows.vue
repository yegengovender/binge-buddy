<template>
  <div>
    <h1>My Shows</h1>
    <div v-for="show in shows" :key="show.id" class="show-info">
      <ShowPoster :show="show" />
      <h2 class="show-name">{{ show.name }}</h2>
      <div>{{ new Set(show.episodes.map((e) => e.season)).size }} Seasons</div>
      <div>{{ show.episodes.length }} Episodes</div>
    </div>
  </div>
  <SearchShows />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Show } from "@/types/Show";
import ShowPoster from "@/components/ShowPoster.vue";

export default defineComponent({
  name: "MyShows",
  props: {
    shows: {
      type: Array as () => Show[],
      required: true,
    },
  },
  components: { ShowPoster },
});
</script>

<style scoped lang="scss">
.show-info {
  display: inline-block;
  text-align: center;
}
</style>
