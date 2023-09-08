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
              <h2 class="title is-3">{{ show.name }}</h2>

              <ShowPoster :show="show" />

              <div class="title is-5">
                {{ new Set(show.episodes.map((e) => e.season)).size }} Seasons
              </div>

              <div class="subtitle is-6">
                {{ show.episodes.length }} Episodes
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
            </figure>

            <div class="media-content">
              <div class="content">
                <h4 class="title is-5 has-text-grey">Next Episode:</h4>
                <h5>
                  <SeasonEpisode :episode="show.nextEpisode" />
                </h5>
              </div>
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
import { User } from "@/types/User";
import { Show } from "@/types/Show";
import ShowPoster from "@/components/Shows/ShowPoster.vue";
import CommonButton from "@/components/Button.vue";
import SeasonEpisode from "@/components/Episodes/SeasonEpisode.vue";

export default defineComponent({
  name: "MyShows",
  emits: ["watchedEpisode"],
  props: {
    shows: {
      type: Array as () => Show[],
      required: true,
    },
    showInfo: {
      type: Function,
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
