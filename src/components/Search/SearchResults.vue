<template>
  <div v-for="(show, index) in results" :key="index">
    <a class="dropdown-item my-4">
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
            <CommonButton
              @click="showInfo(show)"
              :is-secondary="true"
              class="is-small"
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
    showInfo: {
      type: Function,
      required: true,
    },
  },
  components: { ShowPoster, CommonButton },
});
</script>
