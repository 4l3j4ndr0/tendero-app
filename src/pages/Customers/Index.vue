<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <q-card flat bordered class>
      <q-card-section>
        <div class="text-h6">Clientes</div>
      </q-card-section>
      <q-card-section>
        <q-btn
          @click="$router.push('/customers/create')"
          color="primary"
          label="Crear cliente"
          no-caps
          icon="add"
          push
        />
      </q-card-section>
      <q-separator inset></q-separator>
      <Table
        @request="
          ({ page, rowsPerPage, filter }) =>
            getCustomers(page, rowsPerPage, filter)
        "
        @edit="(customer) => router.push('/customers/edit/' + customer.id)"
        @delete="(customer) => deleteCustomer(customer)"
        :columns="columns"
        :data="customers"
      ></Table>
    </q-card>
  </q-layout>
</template>
<script>
import Table from "../../components/Table.vue";
import mixin from "../../mixins/mixin";
import { useCustomersStore } from "../../stores/Customers";
import { useUserStore } from "../../stores/User";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
export default {
  name: "CustomersPage",
  components: {
    Table,
  },
  setup() {
    const $q = useQuasar();
    const { showLoading, hideLoading, showNoty } = mixin();
    const customer = useCustomersStore();
    const user = useUserStore();
    const router = useRouter();

    const customers = computed(() => {
      return useCustomersStore().customers;
    });

    const columns = ref([
      { name: "id", label: "Id", field: "id" },
      { name: "name", label: "Nombre", field: "name" },
      { name: "last_name", label: "Apellidos", field: "last_name" },
      { name: "cellphone", label: "Celular", field: "cellphone" },
    ]);

    const getCustomers = (page = 1, rowsPerPage = 50, filter = null) => {
      showLoading("Consultando clientes...");
      customer
        .getCustomers(page, rowsPerPage, filter, user.$state.bussines.id)
        .then((response) => {
          hideLoading();
        })
        .catch((error) => {
          showNoty("error", "Ocurrió un error al consultar los clientes.");
          hideLoading();
        });
    };

    onMounted(() => {
      if (!user.$state.bussines) router.push("/");
      getCustomers();
    });

    const deleteCustomer = (element) => {
      $q.dialog({
        title: "Eliminar cliente",
        message: `Esta seguro de querer eliminar el cliente ${element.name}?`,
        cancel: {
          label: "Cancelar",
          color: "blue",
        },
        ok: {
          label: "Eliminar",
          color: "red",
          push: true,
        },
        persistent: true,
      })
        .onOk(() => {
          showLoading("Eliminando cliente...");
          customer
            .deleteCustomer(element.id)
            .then((response) => {
              hideLoading();
              showNoty("success", "Cliente eliminado");
              getCustomers();
            })
            .catch((error) => {
              hideLoading();
              showNoty("error", "Ocurrió un error al eliminar el cliente.");
            });
        })
        .onCancel(() => {});
    };

    return {
      router,
      columns,
      customers,
      getCustomers,
      deleteCustomer,
    };
  },
};
</script>
