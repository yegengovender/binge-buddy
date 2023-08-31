<template>
  <div>
    <h1>My Shows</h1>
    <div class="shows-content">
      <div
        v-for="show in (shows as Set<Show>)"
        :key="show.id"
        class="show-info"
      >
        <ShowPoster :show="show" />
        <h2 class="show-name">{{ show.name }}</h2>

        <div>
          {{ new Set(show.episodes.map((e) => e.season)).size }} Seasons
        </div>

        <div>{{ show.episodes.length }} Episodes</div>

        <div class="control-box">
          <CommonButton @click="showInfo(show)">More Info</CommonButton>
        </div>

        <div class="control-box">
          <CommonButton @click="removeShow(show)" :is-secondary="true"
            >Remove</CommonButton
          >
        </div>
      </div>
      <div v-if="shows.size === 0">No shows yet</div>
    </div>
  </div>
  <SearchShows />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Show } from "@/types/Show";
import ShowPoster from "@/components/ShowPoster.vue";
import CommonButton from "@/components/Button.vue";

export default defineComponent({
  name: "MyShows",
  props: {
    shows: {
      type: Set,
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
  },
  components: { ShowPoster, CommonButton },
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
