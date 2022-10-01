<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <q-card flat bordered class>
      <q-card-section>
        <div class="text-h6">Crear producto</div>
      </q-card-section>
      <q-card-section>
        <q-btn
          @click="router.push('/products')"
          color="primary"
          label="Regresar a productos"
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
            v-model="product"
            label="Nombre del producto"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <q-input v-model="description" label="Descripción" />

          <q-input
            v-model="bar_code"
            label="Código de barras"
            type="tel"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <q-input
            v-model="buy_price"
            label="Precio de compra"
            type="tel"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <q-input
            v-model="sell_price"
            label="Precio de venta"
            type="tel"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <q-input
            v-model="stock"
            label="Cantidad en inventario"
            type="tel"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <q-toggle v-model="apply_iva" label="Aplicar IVA" />

          <q-input
            v-model="send_alert"
            label="Alertar cuando el stock este en"
            type="tel"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <q-select
            v-model="provider"
            :options="providersList"
            label="Selecciona el proveedor"
          >
            <template v-if="provider" v-slot:append>
              <q-icon
                name="cancel"
                @click.stop.prevent="provider = null"
                class="cursor-pointer"
              />
            </template>
          </q-select>
          <div>
            <q-btn label="Crear producto" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-layout>
</template>
<script>
import mixin from "../../mixins/mixin";
import { useProductsStore } from "../../stores/Products";
import { useProvidersStore } from "src/stores/Providers";
import { useUserStore } from "../../stores/User";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "ProductsCreatePage",
  setup(props, { root }) {
    const { showLoading, hideLoading, showNoty } = mixin();
    const router = useRouter();
    const myForm = ref(null);
    const products = useProductsStore();
    const providers = useProvidersStore();
    const user = useUserStore();

    const providersList = ref([]);
    const product = ref(null);
    const description = ref(null);
    const bar_code = ref(null);
    const buy_price = ref(null);
    const sell_price = ref(null);
    const stock = ref(null);
    const apply_iva = ref(false);
    const send_alert = ref(null);
    const provider = ref(null);

    const createProduct = () => {
      products
        .createProduct(
          product.value,
          description.value,
          bar_code.value,
          buy_price.value,
          sell_price.value,
          stock.value,
          apply_iva.value,
          send_alert.value,
          user.$state.bussines.id,
          provider.value.value
        )
        .then((response) => {
          hideLoading();
          showNoty("success", "Producto creado.");
          router.push("/products");
        })
        .catch((error) => {
          console.log(error);
          hideLoading();
          showNoty("error", "Ocurrió un error al crear el producto.");
        });
    };

    onMounted(() => {
      if (!user.$state.bussines) router.push("/");
      providers
        .getProviders(1, 50, null, user.$state.bussines.id)
        .then((data) => {
          data.map((i) => {
            providersList.value.push({
              label: `${i.name} ${i.last_name}`,
              value: i.id,
            });
          });
        });
    });

    const onSubmit = () => {
      myForm.value.validate().then((success) => {
        if (success) {
          showLoading("Creando producto...");
          createProduct();
        }
      });
    };

    return {
      myForm,
      onSubmit,
      router,
      product,
      description,
      bar_code,
      buy_price,
      sell_price,
      stock,
      apply_iva,
      send_alert,
      provider,
      providersList,
    };
  },
};
</script>
