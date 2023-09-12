<template>
  <div v-if="episode">
    <a>
      <div class="panel">
        <div class="panel-heading has-background-grey-dark">
          <div class="columns is-multiline is-3">
            <span class="column is-full">
              <p class="title is-6 has-text-grey-light">
                Season {{ episode.season }} - Episode {{ episode.number }}

                <span v-if="!!episode.watchedDate" class="icon mr-1"
                  ><i class="fas fa-check has-text-success"></i
                ></span>
              </p>
              <p class="subtitle is-7 has-text-grey-lighter">
                {{ episode.name }} - {{ episode.runtime }} mins
              </p>
            </span>

            <span class="column is-one-third is-full-mobile"></span>

            <span class="column has-text-right is-two-thirds is-full-mobile">
              <span
                v-if="!!episode.watchedDate"
                class="button is-outlined is-full-widht is-success is-pulled-right is-small"
                @pointerenter="
                  (event) => {
                    (event.target as HTMLElement).classList.add('is-danger');
                  }
                "
                @pointerleave="(event) => {
                    (event.target as HTMLElement).classList.remove('is-danger');
                  }"
                @click="watchedEpisode(episode, show, false)"
              >
                <span> Mark as Unwatched </span>
              </span>

              <span
                v-else
                class="button is-outlined is-responsive is-info is-pulled-right is-small"
                @click="watchedEpisode(episode, show, true)"
              >
                Mark as Watched
              </span>
            </span>
          </div>
        </div>

        <div class="has-background-grey-lighter has-text-grey-dark">
          <p class="p-2 is-size-7 summary-block" v-html="episode.summary"></p>
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

<style lang="scss">
.summary-block {
  max-height: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
