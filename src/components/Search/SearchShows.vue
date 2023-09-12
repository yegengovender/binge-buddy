<template>
  <div
    class="navbar-search navbar-item is-expanded is-flex-grow-1 dropdown is-active"
  >
    <input
      class="input dropdown-trigger"
      type="text"
      id="search-shows"
      placeholder="What are you watching today?"
      @keyup="doSearch"
      v-model="searchText"
    />
    <div v-if="results.length" class="dropdown-menu" id="search-results">
      <div class="dropdown-content has-background-grey-lighter">
        <SearchResults
          :results="results"
          :add-to-my-shows="addSelectedShow"
          :show-info="showInfo"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Show } from "@/types/Show";
import SearchResults from "@/components/Search/SearchResults.vue";

export default defineComponent({
  name: "SearchShows",

  mounted() {
    document.getElementById("search-shows")?.focus();
  },
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
    showInfo: {
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
