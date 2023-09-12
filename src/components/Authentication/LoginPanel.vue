<template>
  <LoginView
    v-if="activeView === 'login'"
    :error="loginError"
    @cancel-login="cancelLogin"
    @update:active-view="setActiveView"
    @login="login"
  />
  <RegistrationView
    v-if="activeView !== 'login'"
    :error="registrationError"
    :on-cancel-login="cancelLogin"
    @update:active-view="setActiveView"
    @register="register"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegistrationView from "@/components/Authentication/RegistrationView.vue";
import LoginView from "@/components/Authentication/LoginView.vue";

export default defineComponent({
  name: "LoginPanel",
  emits: ["cancel-login", "login", "register"],
  props: {
    loggingIn: {
      type: Boolean,
      required: true,
    },
    loginError: {
      type: String,
      required: false,
    },
    registrationError: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      activeView: "login",
    };
  },
  methods: {
    setActiveView(view: string) {
      this.activeView = view;
    },
    cancelLogin() {
      this.$emit("cancel-login");
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
