<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <q-card flat bordered class>
      <q-card-section>
        <div class="text-h6">Editar proveedor</div>
      </q-card-section>
      <q-card-section>
        <q-btn
          @click="router.push('/providers')"
          color="primary"
          label="Regresar a proveedores"
          icon="arrow_back"
          no-caps
          flat
          push
        />
      </q-card-section>
      <q-separator inset></q-separator>
      <div class="q-pa-md" style="max-width: 400px" v-if="provider">
        <q-form ref="myForm" @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="provider.name"
            label="Nombre"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <q-input
            v-model="provider.last_name"
            label="Apellidos"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <q-input
            v-model="provider.cellphone"
            label="Celular"
            lazy-rules
            type="tel"
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <div>
            <q-btn label="Editar proveedor" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-layout>
</template>
<script>
import mixin from "../../mixins/mixin";
import { useUserStore } from "../../stores/User";
import { useProvidersStore } from "../../stores/Providers";
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "ProviderEditPage",
  setup(props, { root }) {
    const { showLoading, hideLoading, showNoty } = mixin();
    const router = useRouter();
    const route = useRoute();
    const myForm = ref(null);
    const user = useUserStore();
    const providers = useProvidersStore();

    const provider = computed(() => {
      return useProvidersStore().provider;
    });

    onMounted(() => {
      if (!user.$state.bussines) router.push("/");
      showLoading("Consultando cliente...");
      providers
        .getProvider(route.params.id, user.$state.bussines.id)
        .then(() => {
          hideLoading();
        });
    });

    const updateProvider = () => {
      providers
        .updateProvider(provider.value)
        .then(() => {
          hideLoading();
          showNoty("success", "Proveedor actualizado correctamente.");
          router.push("/providers");
        })
        .catch(() => {
          hideLoading();
          showNoty("error", "Error al actualizar el proveedor.");
        });
    };

    const onSubmit = () => {
      myForm.value.validate().then((success) => {
        if (success) {
          showLoading("Guardando información...");
          updateProvider();
        }
      });
    };

    const onFilter = (val, update) => {};

    return {
      myForm,
      onSubmit,
      router,
      provider,
      onFilter,
    };
  },
};
</script>
