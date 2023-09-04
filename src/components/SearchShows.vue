<template>
  <nav class="panel has-background-grey-light">
    <p class="panel-heading">Add a show</p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input
          class="input is-large"
          type="text"
          id="search-shows"
          placeholder="What are you watching today?"
          @keyup="doSearch"
          v-model="searchText"
        />
      </p>
    </div>
    <div v-if="results.length">
      <SearchResults :results="results" :add-to-my-shows="addSelectedShow" />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchResults from "./SearchResults.vue";
import { Show } from "@/types/Show";

export default defineComponent({
  name: "SearchShows",
  data() {
    return {
      searchText: "",
      results: [],
    };
  },
  props: {
    searchMethod: Function,
    addToMyShows: {
      type: Function,
      required: true,
    },
    // searchText: String,
  },
  methods: {
    async doSearch() {
      if (!this.searchMethod) {
        return;
      }

      this.results = await this.searchMethod(this.searchText);
    },
    addSelectedShow(show: Show) {
      this.addToMyShows(show);
      this.results = [];
      this.searchText = "";
    },
  },
  components: {
    SearchResults,
  },
});
</script>

<style scoped lang="scss"></style>
