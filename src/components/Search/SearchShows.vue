<template>
  <nav class="dropdown is-active">
    <div class="dropdown-trigger">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          id="search-shows"
          placeholder="What are you watching today?"
          @keyup="doSearch"
          v-model="searchText"
        />
      </p>
    </div>
    <div v-if="results.length" class="dropdown-menu" id="search-results">
      <div class="dropdown-content">
        <SearchResults :results="results" :add-to-my-shows="addSelectedShow" />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchResults from "@/components/Search/SearchResults.vue";
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
