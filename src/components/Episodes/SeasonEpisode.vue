<template>
  <div v-if="episode">
    <a>
      <div class="panel">
        <div class="panel-heading has-background-grey-dark">
          <div class="columns">
            <span class="column">
              <p class="title is-5 has-text-grey-light">
                Episode {{ episode.number }}
                <span v-if="!!episode.watchedDate" class="icon mr-1"
                  ><i class="fas fa-check has-text-success"></i
                ></span>
              </p>
              <p class="subtitle is-6 has-text-grey-lighter">
                {{ episode.name }} ( {{ episode.runtime }} mins )
              </p>
            </span>
            <span class="column">
              <span
                v-if="!!episode.watchedDate"
                class="button is-outlined is-pulled-right"
                :class="isHover ? 'is-danger' : 'is-success'"
                style="min-width: 180px"
                @pointerenter="isHover = true"
                @pointerleave="isHover = false"
                @click="watchedEpisode(episode, show, false)"
              >
                <span v-if="isHover"> Mark as Unwatched </span>
                <span v-else> Mark as Unwatched </span>
              </span>

              <span
                v-else
                class="button is-outlined is-info is-pulled-right"
                style="min-width: 180px"
                @click="watchedEpisode(episode, show, true)"
              >
                Mark as Watched
              </span>
            </span>
          </div>
        </div>

        <div class="panel-block has-background-grey-lighter">
          <div classs="block" v-html="episode.summary"></div>
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { TvEpisode } from "@/types/TvEpisode";
import { Show } from "@/types/Show";

export default defineComponent({
  name: "SeasonEpisode",
  setup() {
    const app_watchedEpisode = inject("app_watchedEpisode") as (
      episode: TvEpisode,
      show: Show,
      isWatched: boolean
    ) => void | undefined;
    const watchedEpisode = (
      episode: TvEpisode,
      show: Show,
      watched: boolean
    ) => {
      app_watchedEpisode(episode, show, watched);
    };
    return { watchedEpisode };
  },
  props: {
    episode: {
      type: Object as () => TvEpisode | undefined,
      required: true,
    },
    show: {
      type: Object as () => Show,
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
