<template>
  <AuthTemplate @cancel-login="cancelLogin" @update:active-view="setActiveView">
    <template #default>
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="email"
            placeholder="Email input"
            value="hello@"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <!-- <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span> -->
        </div>
        <!-- <p class="help is-danger">This email is invalid</p> -->
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input is-danger"
            type="password"
            placeholder="Text input"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <button class="button is-success">Login</button>
      <button class="button">Cancel</button>
    </template>
  </AuthTemplate>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthTemplate from "./AuthTemplate.vue";

export default defineComponent({
  name: "LoginView",
  emits: ["cancel-login", "update:active-view"],
  methods: {
    cancelLogin() {
      this.$emit("cancel-login");
    },
    setActiveView(view: string) {
      this.$emit("update:active-view", view);
    },
  },
  components: { AuthTemplate },
});
</script>
