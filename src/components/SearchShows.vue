<template>
  <h2 for="search-shows">Search for a show</h2>
  <input
    type="text"
    id="search-shows"
    placeholder="What are you watching today?"
    @keyup="doSearch"
    v-model="searchText"
  />
  <div v-if="results.length">
    <SearchResults :results="results" :add-to-my-shows="addToMyShows" />
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchResults from "./SearchResults.vue";

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
      type: Function as any,
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
  },
  components: {
    SearchResults,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#search-shows {
  width: 100%;
  padding: 0.5rem;
  font-size: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
</style>
