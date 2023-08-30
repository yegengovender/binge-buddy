<template>
  <div>
    <h1 class="logo">BINGE BUDDY</h1>
  </div>

  <MainPage />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainPage from "./components/MainPage.vue";

export default defineComponent({
  name: "App",
  components: {
    MainPage,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
  display: inline-block;
  border: solid rgb(116, 124, 148);
  border-width: 0 20px 32px 20px;
  border-radius: 6px;
  padding: 9px;
}
</style>
