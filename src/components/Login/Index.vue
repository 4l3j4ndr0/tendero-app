<template>
  <div
    class="animated bounceInUp"
    v-bind:style="$q.screen.lt.sm ? { width: '90%' } : { width: '35%' }"
  >
    <q-card>
      <q-card-section>
        <q-avatar
          style="z-index: 12"
          size="103px"
          class="absolute-center shadow-19"
        >
          <img :src="logo" />
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <!--  -->
      </q-card-section>
      <login-form></login-form>
    </q-card>
  </div>
</template>

<script>
import LoginForm from "./Login.vue";
export default {
  name: "login",
  components: {
    LoginForm,
  },
  setup() {
    const logo = new URL("../../assets/icons/logo.png", import.meta.url).href;
    return {
      logo,
    };
  },
};
</script>
