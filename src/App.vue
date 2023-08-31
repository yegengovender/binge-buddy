<template>
  <div>
    <h1 class="logo">BINGE BUDDY</h1>
  </div>

  <MyShows :shows="myShows" />
  <SearchShows :search-method="doSearch" :add-to-my-shows="addToMyShows" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchShows from "@/components/SearchShows.vue";
import MyShows from "@/components/MyShows.vue";
import { Show } from "@/types/Show";

export default defineComponent({
  name: "App",
  components: {
    MyShows,
    SearchShows,
  },
  data() {
    return {
      allShows: [],
      myShows: [],
    };
  },
  methods: {
    addToMyShows(e: any) {
      let show = e as Show;
      (this.myShows as Show[]).push(show);
      console.log(this.myShows);
    },
    async doSearch(searchText: string) {
      let data = await fetch(
        `https://api.tvmaze.com/search/shows?q=${searchText}`
      );
      let results = await data.json();
      results = results.map((show: any) => this.toShowObject(show.show));
      return results;
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
});
</script>

<style lang="scss">
body {
  position: absolute;
  margin: 0 15px;
  padding: 0;
  background-color: #464646;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #9198a0;
  margin-top: 60px;
}

.logo {
  display: inline-block;
  border: solid rgb(116, 124, 148);
  border-width: 0 20px 32px 20px;
  border-radius: 6px;
  padding: 15px;
}
</style>
