<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-background-grey">
        <div class="modal-card-title column">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48 is-2by3">
                <img :src="show.image" alt="Placeholder image" />
              </figure>
            </div>

            <div class="media-content">
              <p class="title is-4 has-text-white-ter">{{ show.name }}</p>
              <p class="subtitle is-6 has-text-white-ter">
                {{ show.premiered }}
              </p>
              <p
                class="container is-size-7 has-text-grey-lighter"
                v-html="show.summary"
              ></p>
            </div>
          </div>
        </div>

        <button class="delete" aria-label="close" @click="closeClick"></button>
      </header>

      <section class="modal-card-body has-background-white-ter">
        <!-- TABS -->
        <div class="card-content">
          <h1 class="title">Episodes</h1>

          <!-- Episodes -->
          <div class="has-text-grey">
            <div class="columnsx">
              <!-- Seasons List -->
              <div class="level is-one-quarter block menu">
                <div class="level-left">
                  <li class="level-item">
                    <span class="level-item title is-5">Seasons</span>
                  </li>

                  <div
                    class="menu-list"
                    v-for="(s, i) in new Set(
                      show.episodes.map((e) => e.season)
                    )"
                    :key="i"
                  >
                    <li class="level-item">
                      <a
                        @click="setSeason(s)"
                        :class="s === selectedSeason ? 'is-active' : ''"
                        >{{ s }}</a
                      >
                    </li>
                  </div>
                </div>
              </div>

              <!-- Season Episodes -->
              <div class="column menu">
                <h2 class="has-text=weight-bold is-size-6 menu-label">
                  Episodes - Season {{ selectedSeason }}
                </h2>

                <SeasonEpisodes :show="show" :season="selectedSeason" />
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
    closeClick: {
      type: Function as any,
      required: true,
    },
  },
  methods: {
    setTab(tab: string) {
      this.currentTab = tab;
    },
    setSeason(season: number) {
      this.selectedSeason = season;
    },
  },
  components: { SeasonEpisodes },
});
</script>
