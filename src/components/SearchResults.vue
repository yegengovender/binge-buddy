<template>
  <div
    v-for="(show, index) in results"
    :key="index"
    class="result-item"
    :class="index % 2 == 0 ? 'even-row' : 'odd-row'"
  >
    <a class="panel-block">
      <div class="show-info">
        <ShowPoster :show="show" />

        <h2 class="show-name">{{ index % 2 }} {{ show.name }}</h2>

        <div>{{ show.language }}</div>
        <div>{{ show.premiered }}</div>
      </div>

      <div class="show-details">
        <div class="show-summary" v-html="show.summary"></div>
        <div>{{ show.rating }}</div>
        <CommonButton @click="addToMyShows(show)">
          <span class="icon is-medium"
            ><i class="fas fa-solid fa-plus"></i></span
          >&nbsp; I'm watching
        </CommonButton>
        <CommonButton :is-secondary="true">More Info</CommonButton>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ShowPoster from "@/components/ShowPoster.vue";
import { Show } from "@/types/Show";
import CommonButton from "@/components/Button.vue";

export default defineComponent({
  name: "SearchResults",
  props: {
    results: {
      type: Array as () => Show[],
      required: true,
    },
    addToMyShows: {
      type: Function as any,
      required: true,
    },
  },
  components: { ShowPoster, CommonButton },
});
</script>

<style scoped lang="scss">
.result-item {
  .show-image {
    height: 200px;
  }

  &.even-row {
    background-color: hsl(0, 0%, 71%);
  }

  &.odd-row {
    background-color: hsl(0, 0%, 86%);
  }

  .show-details {
    .show-summary {
      max-height: 70px;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 10px;
    }
  }
}
</style>
