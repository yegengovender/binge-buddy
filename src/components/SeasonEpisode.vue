<template>
  <div>
    <a>
      <div class="panel">
        <div class="panel-heading">
          Episode {{ episode.number }} - {{ episode.name }} <br />
          <span class="is-size-6"> {{ episode.runtime }} mins</span>
          &nbsp;
          <span class="tag is-success">
            <input
              type="checkbox"
              @change="$emit('watchedEpisode', episode, $event)"
            />&nbsp;Watched
          </span>
        </div>
        <div class="panel-block">
          <div classs="block" v-html="episode.summary"></div>
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import { TvEpisode } from "@/types/TvEpisode";
import { defineComponent, vModelCheckbox } from "vue";

export default defineComponent({
  name: "SeasonEpisode",
  emits: ["watchedEpisode"],
  props: {
    episode: {
      type: Object as () => TvEpisode,
      required: true,
    },
  },
});
</script>
