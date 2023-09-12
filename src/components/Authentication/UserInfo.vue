<template>
  <div class="navbar-item has-dropdown user-section is-hoverable">
    <div class="navbar-link">
      <CommonButton>{{ user.name }}</CommonButton>
    </div>
    <div class="navbar-dropdown is-right">
      <a class="navbar-item has-text-centered">
        <i class="fas fa-user"></i>
      </a>
      <a class="navbar-item has-text-centered"> {{ user.email }} </a>
      <hr class="navbar-divider" />
      <a class="navbar-item has-text-centered">
        <CommonButton @click="logout()" class="is-small">Log out</CommonButton>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { User } from "@/types/User";
import CommonButton from "@/components/Button.vue";

export default defineComponent({
  name: "UserInfo",
  props: {
    logout: {
      type: Function,
      required: true,
    },
    user: {
      type: Object as () => User,
      required: true,
    },
  },
  components: {
    CommonButton,
  },
});
</script>
