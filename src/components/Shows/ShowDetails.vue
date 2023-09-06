<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-background-grey-dark">
        <div class="modal-card-title column">
          <div class="media block">
            <div class="media-left">
              <p class="title is-4 has-text-white-ter">{{ show.name }}</p>
              <p class="subtitle is-6 has-text-white-ter">
                {{ show.premiered }}
              </p>

              <figure class="block image is-48x48px is-2by3">
                <img :src="show.image" alt="Placeholder image" />
              </figure>
            </div>

            <div class="media-content">
              <p
                class="container block is-size-7 has-text-grey-lighter"
                v-html="show.summary"
              ></p>

              <!-- Seasons List -->
              <div
                class="level is-one-quarter block menu has-background-grey-light"
              >
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
            </div>
          </div>
        </div>

        <button class="delete" aria-label="close" @click="closeClick"></button>
      </header>

      <section class="modal-card-body has-background-grey">
        <div class="card-content">
          <!-- Episodes -->
          <div class="columns">
            <!-- Season Episodes -->
            <div class="column menu">
              <h2 class="has-text-white title is-size-6 menu-label">
                Episodes - Season {{ selectedSeason }}
              </h2>

              <SeasonEpisodes :show="show" :season="selectedSeason" />
            </div>
          </div>
        </div>
      </section>

      <footer class="modal-card-foot has-background-grey"></footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Show } from "@/types/Show";
import SeasonEpisodes from "@/components/Episodes/SeasonEpisodes.vue";

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
