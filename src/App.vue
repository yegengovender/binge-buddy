<template>
  <header class="top-bar">
    <div class="logo">
      BINGE BUDDY
      <!-- <img src="logo.png" alt="Logo" /> -->
    </div>
    <nav class="main-navigation">
      <MyShowsAnchor @click="toggleMyShows">
        {{ myShows.size ? `(${myShows.size})` : "" }}</MyShowsAnchor
      >
    </nav>
    <div class="user-section">
      <li><a href="#">Login</a></li>
    </div>
  </header>

  <div class="main-content">
    <!-- <div class="main-space"> -->
    <MyShows
      v-if="showsVisible"
      :shows="myShows"
      :show-info="showInfo"
      :remove-show="removeShow"
    />

    <SearchShows
      :search-method="TvService.doSearch"
      :add-to-my-shows="addToMyShows"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TvService } from "@/services/TvService";
import { Show } from "@/types/Show";
import SearchShows from "@/components/SearchShows.vue";
import MyShows from "@/components/MyShows.vue";
import MyShowsAnchor from "@/components/MyShowsAnchor.vue";

export default defineComponent({
  name: "App",
  components: {
    MyShows,
    SearchShows,
    MyShowsAnchor,
  },
  data() {
    return {
      allShows: [],
      myShows: new Set(),
      TvService,
      showsVisible: false,
    };
  },
  methods: {
    toggleMyShows() {
      this.showsVisible = !this.showsVisible;
    },
    async addToMyShows(show: Show) {
      show.episodes = await TvService.getEpisodes(show.id);
      this.myShows = new Set(this.myShows).add(show);
    },
    removeShow(show: Show) {
      this.myShows.delete(show);
      console.log("deleted", this.myShows);
    },
    async showInfo(show: Show) {
      show = await TvService.getShow(show.id);
      console.log(show);
    },
  },
});
</script>

<style lang="scss">
$primary-accent-color: #ff6600; // Primary accent color (orange)
$secondary-accent-color: #00aaff; // Secondary accent color (blue)
$text-color: #fff; // Text color (white)
$background-color: #222; // Background color (dark)
$header-footer-bg-color: #333; // Header and footer background color (slightly lighter dark)
$input-field-bg-color: #444;

body,
h1,
h2,
p,
ul,
li {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #b7bcc1;
}

.top-bar {
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  ul {
    list-style: none;
    display: flex;
    gap: 20px;
  }

  a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    font-size: 16px; /* Adjust the font size as needed */
    transition: color 0.3s ease; /* Add a smooth color transition */
  }

  a:hover {
    color: #ff6600; /* Change the color on hover */
  }
}

.logo {
  color: #b1aeae;
  font-weight: bold;
  font-size: 26px; /* Adjust the font size as needed */

  img {
    width: 70px; /* Adjust the width as needed */
    height: auto; /* Maintain aspect ratio */
  }
}

/* Style the user/login section */
.user-section {
  display: flex;
  align-items: center;
  gap: 10px; /* Adjust the gap between items as needed */
}

.main-content {
  background-color: #222; /* Choose your desired dark background color */
  color: #fff;
  padding: 20px; /* Adjust the padding as needed */
}
/* Add more specific styles for user information, login, etc. */

.main {
  position: absolute;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: grid;
  grid-template-rows: 80px 1fr;
}

.logo {
  display: inline-block;
  border: solid rgb(116, 124, 148);
  border-width: 0 10px 14px 10px;
  border-radius: 3px;
  padding: 8px;
  margin: 10px;
}
</style>
