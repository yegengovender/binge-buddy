<template>
  <label for="search-shows">Search for a show</label>
  <input type="text" id="search-shows" @keyup="doSearch" v-model="searchText" />
  <div v-if="results.length">
    <SearchResults :results="results" />
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SearchResults from "./SearchResults.vue";
import { Show } from "@/domain/Show";
export default defineComponent({
  name: "MainPage",
  data() {
    return {
      searchText: "",
      results: [],
    };
  },
  props: {
    // searchText: String,
  },
  methods: {
    async doSearch() {
      let data = await fetch(
        `https://api.tvmaze.com/search/shows?q=${this.searchText}`
      );
      let results = await data.json();
      this.results = results.map((show: any) => this.toShowObject(show.show));
    },
    toShowObject(show: any): Show {
      return {
        id: show.id,
        language: show.language,
        name: show.name,
        premiered: show.premiered,
        status: show.status,
        summary: show.summary,
        image: show.image?.medium || "",
        rating: show.rating.average,
      } as Show;
    },
  },
  components: {
    SearchResults,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
