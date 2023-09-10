<template>
  <AuthTemplate @cancel-login="cancelLogin" @update:active-view="setActiveView">
    <template #default>
      <div class="field">
        <label class="label">Username</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="text"
            placeholder="Username"
            id="username"
            v-model="username"
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
import AuthTemplate from "./AuthTemplate.vue";

export default defineComponent({
  name: "LoginView",
  emits: ["cancel-login", "update:active-view", "login"],
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
