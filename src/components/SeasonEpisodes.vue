<template>
  <ul
    class="menu-list"
    v-for="(s, i) in new Set(show.episodes.filter((e) => e.season === season))"
    :key="i"
  >
    <li>
      <a>
        <h3 class="has-text-weight-semibold">
          Episode {{ s.number }} - {{ s.name }}
        </h3>
        <div classs="block" v-html="s.summary"></div>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Show } from "@/types/Show";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SeasonEpisodes",
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
});
</script>
