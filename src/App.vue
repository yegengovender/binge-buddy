<template>
  <div class="navbar has-background-grey-dark is-transparent is-flex">
    <div class="navbar-brand">
      <div class="navbar-item logo has-text-white-bis">BINGE BUDDY</div>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start"></div>
      <!-- <div class="navbar-search navbar-item is-expanded is-flex-grow-1 dropdown is-active">
        <input
          class="input dropdown-trigger"
          type="text"
          id="search-shows"
          placeholder="What are you watching today?"
        />
      </div> -->

      <SearchShows
        v-if="searchVisible === true"
        :search-method="TvService.doSearch"
        :add-to-my-shows="addToMyShows"
      />

      <div class="navbar-end">
        <div @click="showSearch(!searchVisible)" class="navbar-item">
          <span class="icon is-large has-text-white-bis">
            <i v-if="searchVisible === true" class="fas fa-times-circle"></i>
            <i v-else class="fas fa-search"></i>
          </span>
        </div>
        <UserInfo
          :logout="logout"
          :user="user"
          v-if="user && user.loggedIn"
        ></UserInfo>
        <div class="navbar-item user-section" v-else>
          <CommonButton @click="isLoggingIn(true)">Login</CommonButton>
        </div>
      </div>
    </div>
  </div>

  <div class="main-content has-background-grey-darker section">
    <ShowDetails
      v-if="false && showDetailsVisible"
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

  <!-- LOGIN -->
  <div class="login">
    <LoginPanel
      :logging-in="loggingIn"
      :login-error="loginError"
      :registration-error="registrationError"
      v-if="loggingIn && !user.loggedIn"
      @cancel-login="isLoggingIn(false)"
      @login="login"
      @register="register"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Show } from "@/types/Show";
import { User } from "@/types/User";
import { TvEpisode } from "./types/TvEpisode";

import { TvService } from "@/services/TvService";
import { UserService } from "@/services/UserService";
import { UserShowService } from "@/services/UserShowService";

import CommonButton from "@/components/Button.vue";
import SearchShows from "@/components/Search/SearchShows.vue";
import MyShows from "@/components/Shows/MyShows.vue";
import ShowDetails from "@/components/Shows/ShowDetails.vue";
import LoginPanel from "@/components/Authentication/LoginPanel.vue";
import UserInfo from "@/components/Authentication/UserInfo.vue";

export default defineComponent({
  name: "App",
  components: {
    MyShows,
    SearchShows,
    ShowDetails,
    CommonButton,
    LoginPanel,
    UserInfo,
  },
  data() {
    return {
      TvService,
      user: {} as User,
      showDetails: {} as Show,
      myShows: [] as Show[],
      searchVisible: false,
      showDetailsVisible: false,
      loggingIn: false,
      loginError: null as string | null,
      registrationError: null as string | null,
    };
  },
  methods: {
    isLoggingIn(isLoggingIn: boolean) {
      this.loggingIn = isLoggingIn;
    },
    showSearch(isVisible: boolean) {
      this.searchVisible = isVisible;
    },
    displayShowDetails(show: Show) {
      this.showDetails = show;
      this.showDetailsVisible = true;
    },
    hideShowDetails() {
      this.showDetailsVisible = false;
    },
    async logout() {
      this.user = {} as User;
      this.isLoggingIn(false);
    },
    async login(username: string, password: string) {
      try {
        this.loginError = null;
        this.user = await UserService.login(username, password);
        this.myShows = this.user.shows;
        this.isLoggingIn(false);
      } catch (error) {
        this.loginError = "unable to log in";
      }
    },
    async register(username: string, email: string, password: string) {
      this.user = await UserService.register(username, email, password);
      this.myShows = this.user.shows;
    },
    async addToMyShows(show: Show) {
      show.episodes = await TvService.getEpisodes(show.id);
      show.seasons = await TvService.getSeasons(show.id);
      await UserShowService.addShow(this.user, show);

      this.myShows = this.user.shows;
      this.showSearch(false);
    },
    async removeShow(show: Show) {
      await UserShowService.removeShow(this.user, show);
      this.myShows = this.user.shows;
    },
    async watchedEpisode(episode: TvEpisode, show: Show, isWatched: boolean) {
      await UserShowService.watchedEpisode(this.user, episode, isWatched);
      this.myShows = this.user.shows;
      this.showDetails = this.user.shows.find((s) => s.id === show.id) as Show;
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
  display: inline-block;
  border: solid rgb(153, 164, 199);
  border-width: 0 15px 18px 15px;
  border-radius: 6px 6px 3px 3px;
  padding: 8px 12px;
  margin: 10px;
  background-color: #3c4349;

  img {
    width: 70px;
    /* Adjust the width as needed */
    height: auto;
    /* Maintain aspect ratio */
  }
}

.main-content {
  background-color: #222;
  /* Choose your desired dark background color */
  color: #fff;
  padding: 20px;
  /* Adjust the padding as needed */
}
</style>
