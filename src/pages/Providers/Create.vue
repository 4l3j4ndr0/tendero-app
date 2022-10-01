<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <q-card flat bordered class>
      <q-card-section>
        <div class="text-h6">Crear proveedor</div>
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
      <div class="q-pa-md" style="max-width: 400px">
        <q-form ref="myForm" @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="name"
            label="Nombre"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <q-input
            v-model="last_name"
            label="Apellidos"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <q-input
            v-model="cellphone"
            label="Celular"
            type="tel"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <div>
            <q-btn label="Crear proveedor" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-layout>
</template>
<script>
import mixin from "../../mixins/mixin";
import { useProvidersStore } from "../../stores/Providers";
import { useUserStore } from "../../stores/User";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "ProviderCreatePage",
  setup(props, { root }) {
    const { showLoading, hideLoading, showNoty } = mixin();
    const router = useRouter();
    const myForm = ref(null);
    const providers = useProvidersStore();
    const user = useUserStore();

    const name = ref(null);
    const last_name = ref(null);
    const cellphone = ref(null);

    const createProvider = () => {
      providers
        .createProvider(
          name.value.toUpperCase(),
          last_name.value.toUpperCase(),
          cellphone.value,
          user.$state.bussines.id
        )
        .then((response) => {
          hideLoading();
          showNoty("success", "Proveedor creado.");
          router.push("/providers");
        })
        .catch((error) => {
          console.log(error);
          hideLoading();
          showNoty("error", "Ocurrió un error al crear el proveedor.");
        });
    };

    onMounted(() => {
      if (!user.$state.bussines) router.push("/");
    });

    const onSubmit = () => {
      myForm.value.validate().then((success) => {
        if (success) {
          showLoading("Creando proveedor...");
          createProvider();
        }
      });
    };

    return {
      myForm,
      onSubmit,
      router,
      name,
      last_name,
      cellphone,
    };
  },
};
</script>
