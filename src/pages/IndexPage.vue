<template>
  <q-page class="row items-center justify-evenly">
    <lottie-player
      src="https://assets1.lottiefiles.com/packages/lf20_ujzt2n1j.json"
      background="transparent"
      speed="1"
      style="width: 600px; height: 600px"
      loop
      autoplay
    ></lottie-player>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from "components/models";
import ExampleComponent from "components/ExampleComponent.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: { ExampleComponent },
  setup() {
    return {};
  },
});
</script>
