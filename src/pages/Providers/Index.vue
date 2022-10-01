<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <q-card flat bordered class>
      <q-card-section>
        <div class="text-h6">Proveedores</div>
      </q-card-section>
      <q-card-section>
        <q-btn
          @click="$router.push('/providers/create')"
          color="primary"
          label="Crear proveedor"
          no-caps
          icon="add"
          push
        />
      </q-card-section>
      <q-separator inset></q-separator>
      <Table
        @request="
          ({ page, rowsPerPage, filter }) =>
            getProviders(page, rowsPerPage, filter)
        "
        @edit="(provider) => router.push('/providers/edit/' + provider.id)"
        @delete="(provider) => deleteProvider(provider)"
        :columns="columns"
        :data="providers"
      ></Table>
    </q-card>
  </q-layout>
</template>
<script>
import Table from "../../components/Table.vue";
import mixin from "../../mixins/mixin";
import { useProvidersStore } from "../../stores/Providers";
import { useUserStore } from "../../stores/User";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
export default {
  name: "ProvidersPage",
  components: {
    Table,
  },
  setup() {
    const $q = useQuasar();
    const { showLoading, hideLoading, showNoty } = mixin();
    const provider = useProvidersStore();
    const user = useUserStore();
    const router = useRouter();

    const providers = computed(() => {
      return useProvidersStore().providers;
    });

    const columns = ref([
      { name: "id", label: "Id", field: "id" },
      { name: "name", label: "Nombre", field: "name" },
      { name: "last_name", label: "Apellidos", field: "last_name" },
      { name: "cellphone", label: "Celular", field: "cellphone" },
    ]);

    const getProviders = (page = 1, rowsPerPage = 50, filter = null) => {
      showLoading("Consultando proveedores...");
      provider
        .getProviders(page, rowsPerPage, filter, user.$state.bussines.id)
        .then((response) => {
          hideLoading();
        })
        .catch((error) => {
          showNoty("error", "Ocurrió un error al consultar los proveedores.");
          hideLoading();
        });
    };

    onMounted(() => {
      if (!user.$state.bussines) router.push("/");
      getProviders();
    });

    const deleteProvider = (element) => {
      $q.dialog({
        title: "Eliminar proveedor",
        message: `Esta seguro de querer eliminar el proveedor ${element.name}?`,
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
          showLoading("Eliminando proveedor...");
          provider
            .deleteProvider(element.id)
            .then((response) => {
              hideLoading();
              showNoty("success", "Proveedor eliminado");
              getProviders();
            })
            .catch((error) => {
              hideLoading();
              showNoty("error", "Ocurrió un error al eliminar el proveedor.");
            });
        })
        .onCancel(() => {});
    };

    return {
      router,
      columns,
      providers,
      getProviders,
      deleteProvider,
    };
  },
};
</script>
