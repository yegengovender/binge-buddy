<template>
  <label for="search-shows">Search for a show</label>
  <input type="text" id="search-shows" @keyup="doSearch" v-model="searchText" />
  <pre> {{ results }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainPage",
  data() {
    return {
      searchText: "",
      results: {},
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
      this.results = await data.json();
      console.log("searching for ", this.searchText);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
