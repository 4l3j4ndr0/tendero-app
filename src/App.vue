<template>
  <router-view />
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { defineComponent, onMounted } from "vue";
import { useUserStore } from "./stores/User";

export default defineComponent({
  name: "App",
  setup() {
    const $q = useQuasar();
    const user = useUserStore();

    const setToken = (token: any) => {
      user.setToken(token);
    };

    onMounted(() => {
      const token = $q.sessionStorage.getItem("token");
      const negocio = $q.localStorage.getItem("bussiness");
      if (token) {
        setToken(token);
      }
      if (negocio) {
        user.$patch({
          bussines: negocio,
        });
      }
    });
  },
});
</script>
