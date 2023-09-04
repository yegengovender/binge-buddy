<template>
  <div
    class="menu-list"
    v-for="(episode, i) in new Set(
      show.episodes.filter((e) => e.season === season)
    )"
    :key="i"
  >
    <SeasonEpisode :episode="episode" @watched-episode="watchedEpisode" />
  </div>
</template>

<script lang="ts">
import { Show } from "@/types/Show";
import { defineComponent } from "vue";
import SeasonEpisode from "@/components/SeasonEpisode.vue";

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
  methods: {
    watchedEpisode(episode: any, event: any) {
      this.$emit("watchedEpisode", episode, event.target.checked);
    },
  },
});
</script>
