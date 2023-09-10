<template>
  <div class="modal is-active">
    <div class="modal-background" @click="cancelLogin"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign In</p>
        <button class="delete" aria-label="close" @click="cancelLogin"></button>
      </header>

      <section class="modal-card-body">
        <!-- Content ... -->
        <div class="tabs">
          <ul>
            <li
              :class="activeView === 'login' ? 'is-active' : ''"
              @click="setActiveView('login')"
            >
              <a>Login</a>
            </li>
            <li
              :class="activeView !== 'login' ? 'is-active' : ''"
              @click="setActiveView('register')"
            >
              <a>Register</a>
            </li>
          </ul>
        </div>

        <slot></slot>
      </section>

      <footer class="modal-card-foot">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AuthTemplate",
  emits: ["cancel-login", "update:active-view"],
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
      this.$emit("update:active-view", view);
    },
  },
});
</script>
