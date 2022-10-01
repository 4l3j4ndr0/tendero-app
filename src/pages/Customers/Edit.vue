<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <q-card flat bordered class>
      <q-card-section>
        <div class="text-h6">Editar cliente</div>
      </q-card-section>
      <q-card-section>
        <q-btn
          @click="router.push('/customers')"
          color="primary"
          label="Regresar a clientes"
          icon="arrow_back"
          no-caps
          flat
          push
        />
      </q-card-section>
      <q-separator inset></q-separator>
      <div class="q-pa-md" style="max-width: 400px" v-if="customer">
        <q-form ref="myForm" @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="customer.name"
            label="Nombre"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <q-input
            v-model="customer.last_name"
            label="Apellidos"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <q-input
            v-model="customer.cellphone"
            label="Celular"
            lazy-rules
            type="tel"
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <div>
            <q-btn label="Editar cliente" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-layout>
</template>
<script>
import mixin from "../../mixins/mixin";
import { useUserStore } from "../../stores/User";
import { useCustomersStore } from "../../stores/Customers";
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "CustomerEditPage",
  setup(props, { root }) {
    const { showLoading, hideLoading, showNoty } = mixin();
    const router = useRouter();
    const route = useRoute();
    const myForm = ref(null);
    const user = useUserStore();
    const customers = useCustomersStore();

    const customer = computed(() => {
      return useCustomersStore().customer;
    });

    onMounted(() => {
      if (!user.$state.bussines) router.push("/");
      showLoading("Consultando cliente...");
      customers
        .getCustomer(route.params.id, user.$state.bussines.id)
        .then(() => {
          hideLoading();
        });
    });

    const updateCustomer = () => {
      customers
        .updateCustomer(customer.value)
        .then(() => {
          hideLoading();
          showNoty("success", "Cliente actualizado correctamente.");
          router.push("/customers");
        })
        .catch(() => {
          hideLoading();
          showNoty("error", "Error al actualizar el cliente.");
        });
    };

    const onSubmit = () => {
      myForm.value.validate().then((success) => {
        if (success) {
          showLoading("Guardando información...");
          updateCustomer();
        }
      });
    };

    const onFilter = (val, update) => {};

    return {
      myForm,
      onSubmit,
      router,
      customer,
      onFilter,
    };
  },
};
</script>
