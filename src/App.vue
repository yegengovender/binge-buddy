<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item logo has-text-white-bis">
        BINGE BUDDY
        <!-- <img src="logo.png" alt="Logo" /> -->
      </div>
    </div>

    <div class="navbar-menu is-active">
      <div class="navbar-start"></div>

      <div class="navbar-end is-fullwidth">
        <a class="navbar-item is-fullwidth">
          <div class="navbar-item">
            <SearchShows
              v-if="searchVisible === true"
              :search-method="TvService.doSearch"
              :add-to-my-shows="addToMyShows"
            />
          </div>
          <span
            @click="showSearch(!searchVisible)"
            class="navbar-item icon is-large has-text-white-bis"
          >
            <i v-if="searchVisible === true" class="fas fa-times-circle"></i>
            <i v-else class="fas fa-search"></i>
          </span>
        </a>
        <div class="navbar-item user-section">
          <CommonButton v-if="user.loggedIn">{{ user.name }}</CommonButton>
          <CommonButton v-else>Login</CommonButton>
        </div>
      </div>
    </div>
  </nav>

  <!-- <nav class="navbar has-background-grey-dark px-4">
    <div class="level-left">
      <div class="level-item logo has-text-white-bis">
        BINGE BUDDY
      </div>
    </div>

    <div class="level-right">
      <div class="level-item search-section">
        <SearchShows
          v-if="searchVisible === true"
          :search-method="TvService.doSearch"
          :add-to-my-shows="addToMyShows"
        />
      </div>
      <div class="level-item user-section">
        <CommonButton v-if="user.loggedIn">{{ user.name }}</CommonButton>
        <CommonButton v-else>Login</CommonButton>
      </div>
    </div>
  </nav> -->

  <div class="main-content has-background-grey-darker section">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TvService } from "@/services/TvService";
import { UserService } from "@/services/UserService";
import { Show } from "@/types/Show";
import { User } from "@/types/User";
import SearchShows from "@/components/SearchShows.vue";
import MyShows from "@/components/MyShows.vue";
import ShowDetails from "@/components/ShowDetails.vue";
import CommonButton from "@/components/Button.vue";
import { TvEpisode } from "./types/TvEpisode";

export default defineComponent({
  name: "App",
  components: {
    MyShows,
    SearchShows,
    ShowDetails,
    CommonButton,
  },
  data() {
    return {
      TvService,
      user: new User("John Doe", "john.doe@rip.peace"),
      showDetails: {} as Show,
      myShows: [] as Show[],
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
      show.seasons = await TvService.getSeasons(show.id);
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
    watchedEpisode(episode: TvEpisode, isWatched: boolean) {
      UserService.watchedEpisode(this.user, episode, isWatched);
    },
  },
  provide() {
    return {
      app_watchedEpisode: this.watchedEpisode,
    };
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

.logo {
  // color: #b1aeae;
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
  border: solid rgb(153, 164, 199);
  border-width: 0 15px 18px 15px;
  border-radius: 6px 6px 3px 3px;
  padding: 8px 12px;
  margin: 10px;
  background-color: #3c4349;
}
</style>
