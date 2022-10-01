<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <q-card flat bordered class>
      <q-card-section>
        <div class="text-h6">Productos</div>
      </q-card-section>
      <q-card-section>
        <q-btn
          @click="$router.push('/products/create')"
          color="primary"
          label="Crear producto"
          no-caps
          icon="add"
          push
        />
      </q-card-section>
      <q-separator inset></q-separator>
      <Table
        @request="
          ({ page, rowsPerPage, filter }) =>
            getProducts(page, rowsPerPage, filter)
        "
        @edit="(product) => router.push('/products/edit/' + product.id)"
        @delete="(product) => deleteProduct(product)"
        :columns="columns"
        :data="products"
      ></Table>
    </q-card>
  </q-layout>
</template>
<script>
import Table from "../../components/Table.vue";
import mixin from "../../mixins/mixin";
import { useProductsStore } from "../../stores/Products";
import { useUserStore } from "../../stores/User";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
export default {
  name: "ProductsPage",
  components: {
    Table,
  },
  setup() {
    const $q = useQuasar();
    const { showLoading, hideLoading, showNoty } = mixin();
    const product = useProductsStore();
    const user = useUserStore();
    const router = useRouter();

    const products = computed(() => {
      return useProductsStore().products;
    });

    const columns = ref([
      { name: "id", label: "Id", field: "id" },
      { name: "product", label: "Producto", field: "product" },
      { name: "description", label: "Descripción", field: "description" },
      { name: "bar_code", label: "Código de barras", field: "bar_code" },
      { name: "buy_price", label: "Precio de compra", field: "buy_price" },
      { name: "sell_price", label: "Precio de venta", field: "sell_price" },
      { name: "stock", label: "Stock", field: "stock" },
      { name: "apply_iva", label: "Aplicar IVA", field: "apply_iva" },
      { name: "send_alert", label: "Alertar Stock en", field: "send_alert" },
    ]);

    const getProducts = (page = 1, rowsPerPage = 50, filter = null) => {
      showLoading("Consultando productos...");
      product
        .getProducts(page, rowsPerPage, filter, user.$state.bussines.id)
        .then((response) => {
          hideLoading();
        })
        .catch((error) => {
          showNoty("error", "Ocurrió un error al consultar los productos.");
          hideLoading();
        });
    };

    onMounted(() => {
      if (!user.$state.bussines) router.push("/");
      getProducts();
    });

    const deleteProduct = (element) => {
      $q.dialog({
        title: "Eliminar producto",
        message: `Esta seguro de querer eliminar el producto ${element.product}?`,
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
          showLoading("Eliminando producto...");
          product
            .deleteProduct(element.id)
            .then((response) => {
              hideLoading();
              showNoty("success", "Producto eliminado");
              getProducts();
            })
            .catch((error) => {
              hideLoading();
              showNoty("error", "Ocurrió un error al eliminar el producto.");
            });
        })
        .onCancel(() => {});
    };

    return {
      router,
      columns,
      products,
      getProducts,
      deleteProduct,
    };
  },
};
</script>
