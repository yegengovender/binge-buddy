<template>
  <LoginView
    v-if="activeView === 'login'"
    @cancel-login="cancelLogin"
    @update:active-view="setActiveView"
    @login="login"
  />
  <RegistrationView
    v-if="activeView !== 'login'"
    :on-cancel-login="cancelLogin"
    @update:active-view="setActiveView"
    @register="register"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegistrationView from "./RegistrationView.vue";
import LoginView from "./LoginView.vue";

export default defineComponent({
  name: "LoginPanel",
  emits: ["cancel-login", "login", "register"],
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
    login(username: string, password: string) {
      this.$emit("login", username, password);
    },
    register(username: string, email: string, password: string) {
      this.$emit("register", username, email, password);
    },
  },
  components: { RegistrationView, LoginView },
});
</script>
