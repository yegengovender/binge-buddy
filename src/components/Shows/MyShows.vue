<template>
  <div class="level">
    <h3 class="title is-3 has-text-grey-light">My Shows</h3>
    <p>
      <CommonButton @click="showSearch(true)" class="is-small is-success">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span class="ml-1"> Add a show </span>
      </CommonButton>
    </p>
  </div>

  <div class="columns">
    <div
      v-for="show in (shows as Show[])"
      :key="show.id"
      class="column is-one-quarter is-full-mobile panel m-2 has-background-grey-dark"
    >
      <div class="media">
        <div class="media-left">
          <ShowPoster class="is-64x64" :show="show" />
        </div>

        <div class="media-content">
          <h2 class="title is-5 has-text-grey-lighter">
            {{ show.name }} -
            {{ new Set(show.episodes.map((e) => e.season)).size }} Seasons
          </h2>

          <div class="subtitle is-6 has-text-grey-lighter">
            {{ show.episodes.length }} Episodes
          </div>

          <div class="block">
            <h4 class="subtitle is-6 has-text-white-ter">Next Episode:</h4>
          </div>
        </div>
      </div>

      <SeasonEpisode :episode="show.nextEpisode" :show="show" />

      <div class="level">
        <div class="block my-2">
          <CommonButton class="is-small" @click="showInfo(show)"
            >More Info</CommonButton
          >
        </div>

        <div class="block my-2">
          <CommonButton
            class="is-small"
            @click="removeShow(show)"
            :is-secondary="true"
            >Remove</CommonButton
          >
        </div>
      </div>
    </div>
  </div>
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
