<template>
  <AuthTemplate @cancel-login="cancelLogin" @update:active-view="setActiveView">
    <template #default>
      <div class="field">
        <label class="label">Username</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="text"
            placeholder="Text input"
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
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="email"
            placeholder="Email input"
            v-model="email"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <!-- <span class="icon is-small is-right">
                        <i class="fas fa-exclamation-triangle"></i>
                      </span> -->
        </div>
        <p class="help is-danger">This email is invalid</p>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input is-danger"
            type="password"
            placeholder="Text input"
            v-model="password"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <button class="button is-success" @click="register">Register</button>
      <button class="button">Cancel</button>
    </template>
  </AuthTemplate>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthTemplate from "./AuthTemplate.vue";

export default defineComponent({
  name: "RegistrationView",
  emits: ["cancel-login", "update:active-view", "register"],
  data() {
    return {
      username: "",
      email: "",
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
    register() {
      this.$emit("register", this.username, this.email, this.password);
    },
  },
  components: { AuthTemplate },
});
</script>
