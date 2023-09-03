<template>
  <header class="top-bar">
    <div class="logo">
      BINGE BUDDY
      <!-- <img src="logo.png" alt="Logo" /> -->
    </div>
    <nav class="main-navigation"></nav>
    <div class="user-section">
      <CommonButton v-if="user.loggedIn">{{ user.name }}</CommonButton>
      <CommonButton v-else @click="login">Login</CommonButton>
    </div>
  </header>

  <div class="main-content">
    <ShowDetails
      v-if="showDetailsVisible"
      :show="showDetails"
      :user="user"
      :close-click="hideShowDetails"
    />
    <MyShows
      :shows="myShows"
      :user="user"
      :show-search="showSearch"
      :show-info="displayShowDetails"
      :remove-show="removeShow"
    />

    <SearchShows
      v-if="searchVisible === true"
      :search-method="TvService.doSearch"
      :add-to-my-shows="addToMyShows"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TvService } from "@/services/TvService";
import { UserService } from "@/services/UserService";
import { Show } from "@/types/Show";
import { User } from "@/types/User";
import { ShowsProgress } from "@/types/ShowsProgress";
import SearchShows from "@/components/SearchShows.vue";
import MyShows from "@/components/MyShows.vue";
import MyShowsAnchor from "@/components/MyShowsAnchor.vue";
import ShowDetails from "@/components/ShowDetails.vue";

export default defineComponent({
  name: "App",
  components: {
    MyShows,
    SearchShows,
    // MyShowsAnchor,
    ShowDetails,
  },
  data() {
    return {
      TvService,
      user: {
        name: "John Doe",
        shows: new Set() as Set<Show>,
        showsProgress: new Set() as Set<ShowsProgress>,
      } as User,
      allShows: [] as Show[],
      showDetails: {} as Show,
      myShows: new Set() as Set<Show>,
      searchVisible: false,
      showDetailsVisible: false,
    };
  },
  methods: {
    showSearch(isVisible: boolean) {
      this.searchVisible = isVisible;
    },
    hideSearch(isVisible: boolean) {
      this.searchVisible = false;
    },
    async addToMyShows(show: Show) {
      show.episodes = await TvService.getEpisodes(show.id);
      UserService.addShow(this.user, show);
      this.myShows = this.user.shows;
      this.showSearch(false);
    },
    removeShow(show: Show) {
      UserService.removeShow(this.user, show);
      this.myShows = this.user.shows;
    },
    async displayShowDetails(show: Show) {
      this.showDetails = show;
      this.showDetailsVisible = true;
    },
    hideShowDetails() {
      this.showDetailsVisible = false;
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
    font-size: 16px;
    /* Adjust the font size as needed */
    transition: color 0.3s ease;
    /* Add a smooth color transition */
  }

  a:hover {
    color: #ff6600;
    /* Change the color on hover */
  }
}

.logo {
  color: #b1aeae;
  font-weight: bold;
  font-size: 26px;
  /* Adjust the font size as needed */

  img {
    width: 70px;
    /* Adjust the width as needed */
    height: auto;
    /* Maintain aspect ratio */
  }
}

/* Style the user/login section */
.user-section {
  display: flex;
  align-items: center;
  gap: 10px;
  /* Adjust the gap between items as needed */
}

.main-content {
  background-color: #222;
  /* Choose your desired dark background color */
  color: #fff;
  padding: 20px;
  /* Adjust the padding as needed */
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
  border-width: 0 15px 18px 15px;
  border-radius: 6px 6px 3px 3px;
  padding: 8px 12px;
  margin: 10px;
  background-color: #3c4349;
}
</style>
