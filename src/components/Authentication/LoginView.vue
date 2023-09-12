<template>
  <AuthTemplate @cancel-login="cancelLogin" @update:active-view="setActiveView">
    <template #default>
      <div class="field">
        <label class="label">Username</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="text"
            v-model="username"
            id="login-username"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input is-danger" type="password" v-model="password" />
        </div>
        <p v-if="error" class="help is-danger">{{ error }}</p>
      </div>
    </template>

    <template #footer>
      <button class="button is-success" @click="login">Login</button>
      <button class="button">Cancel</button>
    </template>
  </AuthTemplate>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthTemplate from "@/components/Authentication/AuthTemplate.vue";

export default defineComponent({
  name: "LoginView",
  emits: ["cancel-login", "update:active-view", "login"],
  mounted() {
    document.getElementById("login-username")?.focus();
  },
  props: {
    error: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    cancelLogin() {
      this.$emit("cancel-login");
    },
    setActiveView(view: string) {
      this.$emit("update:active-view", view);
    },
    login() {
      this.$emit("login", this.username, this.password);
    },
  },
  components: { AuthTemplate },
});
</script>
