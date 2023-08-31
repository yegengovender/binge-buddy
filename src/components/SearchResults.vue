<template>
  <div v-for="item in results" :key="item.id" class="result-item">
    <div class="show-info">
      <ShowPoster :show="item" />

      <h2 class="show-name">{{ item.name }}</h2>

      <div>{{ item.language }}</div>
      <div>{{ item.premiered }}</div>
    </div>

    <div class="show-details">
      <div class="show-summary" v-html="item.summary"></div>
      <div>{{ item.rating }}</div>
      <button @click="addToMyShows(item)">+ I'm watching</button>
      <button>More Info</button>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ShowPoster from "@/components/ShowPoster.vue";
import { Show } from "@/types/Show";

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
  components: { ShowPoster },
});
</script>

<style scoped lang="scss">
.result-item {
  display: grid;
  margin: 15px 0;
  grid-template-areas: "topleft topright";
  grid-template-columns: 1fr 3fr;

  .show-info {
    grid-area: topleft;
    text-align: center;
  }

  .show-image {
    height: 200px;
  }

  .show-details {
    grid-area: topright;

    button {
      background-color: #464646;
      color: white;
      border: 1px solid white;
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 1.2rem;
      cursor: pointer;
      margin-right: 10px;
    }

    .show-summary {
      max-height: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 10px;
    }
  }
}
</style>
