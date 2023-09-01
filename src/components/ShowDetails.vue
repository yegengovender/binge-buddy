<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Show Details</p>
        <button class="delete" aria-label="close"></button>
      </header>

      <section class="modal-card-body">
        <div class="card-image">
          <figure class="image is-4by3 has-text-centered" is-ce>
            <img
              :src="show.imageLarge"
              alt="Placeholder image"
              style="width: auto"
            />
          </figure>
        </div>

        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="show.image" alt="Placeholder image" />
              </figure>
            </div>

            <div class="media-content">
              <p class="title is-4">{{ show.name }}</p>
              <p class="subtitle is-6">{{ show.premiered }}</p>
            </div>
          </div>

          <div class="card-content">
            <div class="tabs is-fullwidth is-active is-toggle">
              <ul>
                <li
                  @click="setTab('summary')"
                  :class="currentTab === 'summary' ? 'is-active' : ''"
                >
                  <a>Summary</a>
                </li>
                <li
                  @click="setTab('episodes')"
                  :class="currentTab === 'episodes' ? 'is-active' : ''"
                >
                  <a>Episodes</a>
                </li>
              </ul>
            </div>
            <div
              v-if="currentTab === 'summary'"
              class="has-text-grey"
              v-html="show.summary"
            ></div>

            <div v-if="currentTab === 'episodes'" class="has-text-grey">
              <div class="columns">
                <div class="column is-one-quarter block menu">
                  <h2 class="has-text=weight-bold is-size-6 menu-label">
                    Seasons
                  </h2>
                  <ul
                    class="menu-list"
                    v-for="(s, i) in new Set(
                      show.episodes.map((e) => e.season)
                    )"
                    :key="i"
                  >
                    <li>
                      <a
                        @click="selectedSeason = s"
                        :class="s === selectedSeason ? 'is-active' : ''"
                        >{{ s }}</a
                      >
                    </li>
                  </ul>
                </div>

                <div class="column menu">
                  <h2 class="has-text=weight-bold is-size-6 menu-label">
                    Episodes
                  </h2>

                  <SeasonEpisodes :show="show" :season="selectedSeason" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="modal-card-foot"></footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Show } from "@/types/Show";
import { defineComponent } from "vue";
import SeasonEpisodes from "./SeasonEpisodes.vue";

export default defineComponent({
  name: "ShowDetails",
  data() {
    return {
      currentTab: "summary",
      selectedSeason: 1,
    };
  },
  props: {
    show: {
      type: Object as () => Show,
      required: true,
    },
  },
  methods: {
    setTab(tab: string) {
      this.currentTab = tab;
    },
  },
  components: { SeasonEpisodes },
});
</script>
