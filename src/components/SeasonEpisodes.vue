<template>
  <ul
    class="menu-list"
    v-for="(s, i) in new Set(show.episodes.filter((e) => e.season === season))"
    :key="i"
  >
    <li>
      <a>
        <div class="panel">
          <div class="panel-heading">
            Episode {{ s.number }} - {{ s.name }} <br />
            <span class="is-size-6"> {{ s.runtime }} mins</span>
            &nbsp;
            <span class="tag is-success">
              <input type="checkbox" />&nbsp;Watched
            </span>
          </div>
          <div class="panel-block">
            <div classs="block" v-html="s.summary"></div>
          </div>
        </div>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Show } from "@/types/Show";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SeasonEpisodes",
  props: {
    show: {
      type: Object as () => Show,
      required: true,
    },
    season: {
      type: Number,
      required: true,
    },
  },
});
</script>
