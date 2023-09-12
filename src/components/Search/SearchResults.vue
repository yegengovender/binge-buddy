<template>
  <div
    v-for="(show, index) in results"
    :key="index"
    class="notification result-item"
    :class="index % 2 == 0 ? 'even-row' : 'odd-row'"
  >
    <a class="dropdown-item">
      <div class="media block">
        <div class="media-left">
          <ShowPoster :show="show" class="is-96x96" />
        </div>

        <div class="media-content">
          <div class="show-info">
            <h2 class="title is-5 show-name">
              {{ show.name }} - {{ show.premiered }}
            </h2>

            <div>{{ show.language }}</div>
          </div>

          <div class="show-details">
            <div class="show-summary" v-html="show.summary"></div>
            <div>{{ show.rating }}</div>

            <CommonButton @click="addToMyShows(show)" class="is-small mr-2">
              <span class="icon is-medium"
                ><i class="fas fa-solid fa-plus"></i></span
              >&nbsp; I'm watching
            </CommonButton>
            <CommonButton :is-secondary="true" class="is-small"
              >More Info</CommonButton
            >
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Show } from "@/types/Show";
import ShowPoster from "@/components/Shows/ShowPoster.vue";
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
  //   .show-image {
  //     height: 100px;
  //   }

  &.even-row {
    background-color: hsl(0, 0%, 71%);
  }

  //   &.odd-row {
  //     background-color: hsl(0, 0%, 86%);
  //   }

  //   .show-details {
  //     .show-summary {
  //       max-height: 70px;
  //       overflow: hidden;
  //       text-overflow: ellipsis;
  //       padding: 10px;
  //     }
  //   }
}
</style>
