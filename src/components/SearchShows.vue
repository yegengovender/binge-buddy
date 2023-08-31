<template>
  <div class="search-bar">
    <h3 for="search-shows">Search for a show</h3>
    <input
      type="text"
      id="search-shows"
      placeholder="What are you watching today?"
      @keyup="doSearch"
      v-model="searchText"
    />
    <!-- <input type="text" placeholder="Search..."> -->
    <!-- <button>Search</button> -->
  </div>

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
  // padding: 0.5rem;
  font-size: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
.search-bar {
  background-color: #222; /* Dark background color */
  padding: 20px; /* Adjust the padding as needed */
  text-align: center;
}

.search-bar input[type="text"] {
  width: 60%; /* Adjust the width of the input field */
  padding: 10px; /* Adjust the padding as needed */
  border: none;
  background-color: #444; /* Input field background color */
  color: #fff; /* Text color */
}

.search-bar button {
  padding: 10px 20px; /* Adjust the padding as needed */
  background-color: #ff6600; /* Button background color */
  color: #fff; /* Text color */
  border: none;
  cursor: pointer;
}

/* Center the search bar items horizontally */
.search-bar input[type="text"],
.search-bar button {
  display: inline-block;
  vertical-align: middle;
}

/* Add more specific styles for the search bar if needed */
</style>
