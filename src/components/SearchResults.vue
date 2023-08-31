<template>
  <div
    v-for="item in results"
    :key="item.id"
    class="result-item {{ item.id % 2 === 0 ? even-row : odd-row }}"
  >
    <div class="show-info">
      <ShowPoster :show="item" />

      <h2 class="show-name">{{ item.name }}</h2>

      <div>{{ item.language }}</div>
      <div>{{ item.premiered }}</div>
    </div>

    <div class="show-details">
      <div class="show-summary" v-html="item.summary"></div>
      <div>{{ item.rating }}</div>
      <CommonButton @click="addToMyShows(item)">+ I'm watching</CommonButton>
      <CommonButton :is-secondary="true">More Info</CommonButton>
      <hr />
    </div>
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
  display: grid;
  padding: 15px 0 50px;
  grid-template-areas: "topleft topright";
  grid-template-columns: max-content 1fr;

  &.even-row {
    background-color: #343333;
  }

  &.odd-row {
    background-color: #5e5e5e;
  }

  .show-info {
    grid-area: topleft;
    text-align: center;
  }

  .show-image {
    height: 200px;
  }

  .show-details {
    grid-area: topright;

    .show-summary {
      max-height: 70px;
      overflow: hidden;
      text-overflow: ellipsis;

      padding: 10px;
    }
  }
}
</style>
