<template>
  <LoginView
    v-if="activeView === 'login'"
    @cancel-login="cancelLogin"
    @update:active-view="setActiveView"
  />
  <RegistrationView
    v-if="activeView !== 'login'"
    :on-cancel-login="cancelLogin"
    @update:active-view="setActiveView"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegistrationView from "./RegistrationView.vue";
import LoginView from "./LoginView.vue";

export default defineComponent({
  name: "LoginPanel",
  emits: ["cancel-login"],
  props: {
    loggingIn: {
      type: Boolean,
      required: true,
    },
    // ...
  },
  data() {
    return {
      activeView: "login",
      // ...
    };
  },
  methods: {
    cancelLogin() {
      this.$emit("cancel-login");
    },
    setActiveView(view: string) {
      this.activeView = view;
    },
    // ...
  },
  components: { RegistrationView, LoginView },
});
</script>
