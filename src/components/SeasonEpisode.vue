<template>
  <div v-if="episode">
    <a>
      <div class="panel">
        <div class="panel-heading columns">
          <span class="column">
            <p class="title is-5">Episode {{ episode.number }}</p>
            <p class="subtitle is-6">
              {{ episode.name }} {{ episode.runtime }} mins
            </p>
          </span>
          <span class="column">
            <span
              v-if="!!episode.watchedDate"
              class="button is-outlined is-success"
              style="min-width: 180px"
              @pointerenter="isHover = true"
              @pointerleave="isHover = false"
              @click="watchedEpisode(episode, false)"
            >
              <span v-if="isHover"> Mark as Unwatched </span>
              <span v-else>
                <span class="icon mr-1"
                  ><i class="fas fa-check has-text-success"></i
                ></span>
                Watched
              </span>
            </span>

            <span
              v-else
              class="button is-outlined is-info"
              @click="watchedEpisode(episode, true)"
            >
              Mark as Watched
            </span>
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
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "SeasonEpisode",
  setup() {
    const app_watchedEpisode = inject("app_watchedEpisode") as (
      episode: TvEpisode,
      isWatched: boolean
    ) => void | undefined;
    const watchedEpisode = (episode: TvEpisode, watched: boolean) => {
      app_watchedEpisode(episode, watched);
    };
    return { watchedEpisode };
  },
  props: {
    episode: {
      type: Object as () => TvEpisode | undefined,
      required: true,
    },
  },
  data() {
    return {
      isHover: false,
    };
  },
});
</script>
