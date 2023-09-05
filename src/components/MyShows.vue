<template>
  <nav class="card has-background-grey-lighter">
    <div class="card-header has-background-grey has-text-white-ter">
      <p class="card-header-title is-4">
        My Shows
        <span class="card-header-icon">
          <CommonButton @click="showSearch(true)"> Add a show </CommonButton>
        </span>
      </p>
    </div>

    <div class="panel-block">
      <div>
        <div v-for="show in (shows as Show[])" :key="show.id">
          <div class="media">
            <figure class="media-left">
              <ShowPoster :show="show" />
            </figure>

            <div class="media-content">
              <div class="content">
                <h2 class="x-show-name">{{ show.name }}</h2>

                <div>
                  {{ new Set(show.episodes.map((e) => e.season)).size }} Seasons
                </div>

                <div>{{ show.episodes.length }} Episodes</div>

                <h4>Next Episode:</h4>
                <h5>
                  <SeasonEpisode :episode="show.nextEpisode" />
                </h5>
              </div>

              <nav class="level is-mobile">
                <div class="level-left">
                  <div class="control-box">
                    <CommonButton @click="showInfo(show)"
                      >More Info</CommonButton
                    >
                  </div>

                  <div class="control-box">
                    <CommonButton @click="removeShow(show)" :is-secondary="true"
                      >Remove</CommonButton
                    >
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div v-if="shows.length === 0">No shows yet</div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Show } from "@/types/Show";
import ShowPoster from "@/components/ShowPoster.vue";
import CommonButton from "@/components/Button.vue";
import SeasonEpisodes from "./SeasonEpisodes.vue";
import SeasonEpisode from "./SeasonEpisode.vue";
import { User } from "@/types/User";

export default defineComponent({
  name: "MyShows",
  emits: ["watchedEpisode"],
  props: {
    shows: {
      type: Array as () => Show[],
      required: true,
    },
    showInfo: {
      type: Function as any,
      required: true,
    },
    removeShow: {
      type: Function as any,
      required: true,
    },
    showSearch: {
      type: Function as any,
      required: true,
    },
    user: {
      type: Object as () => User,
      required: true,
    },
  },
  components: {
    ShowPoster,
    CommonButton,
    SeasonEpisode,
    // SeasonEpisodes,
  },
  methods: {
    watchedEpisode(episode: any, isWatched: boolean) {
      this.$emit("watchedEpisode", episode, isWatched);
    },
  },
});
</script>

<style scoped lang="scss">
.shows-content {
  display: block;
  margin: 15px 0;
}

.show-info {
  display: inline-block;
  text-align: center;
}

.control-box {
  display: block;
  margin: 5px;
}
</style>
