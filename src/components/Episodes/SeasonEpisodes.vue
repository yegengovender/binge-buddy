<template>
  <div
    class="menu-list"
    v-for="(episode, i) in new Set(
      show.episodes.filter((e) => e.season === season)
    )"
    :key="i"
  >
    <SeasonEpisode :episode="episode" :show="show" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Show } from "@/types/Show";
import SeasonEpisode from "@/components/Episodes/SeasonEpisode.vue";

export default defineComponent({
  name: "SeasonEpisodes",
  emits: ["watchedEpisode"],
  props: {
    show: {
      type: Object as () => Show,
      required: true,
    },
    season: {
      type: Number,
      required: true,
    },
  },
  components: {
    SeasonEpisode,
  },
});
</script>
