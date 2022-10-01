<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <q-card flat bordered class>
      <q-card-section>
        <div class="text-h6">Editar producto</div>
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
      <div class="q-pa-md" style="max-width: 400px" v-if="product">
        <q-form ref="myForm" @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="product.product"
            label="Nombre del producto"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <q-input v-model="product.description" label="Descripción" />

          <q-input
            v-model="product.bar_code"
            label="Código de barras"
            type="tel"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido.']"
          />

          <q-input
            v-model="product.buy_price"
            label="Precio de compra"
            type="tel"
          />

          <q-input
            v-model="product.sell_price"
            label="Precio de venta"
            type="tel"
          />

          <q-input
            v-model="product.stock"
            label="Cantidad en inventario"
            type="tel"
          />

          <q-toggle v-model="product.apply_iva" label="Aplicar IVA" />

          <q-input
            v-model="product.send_alert"
            label="Alertar cuando el stock este en"
            type="tel"
          />

          <q-select
            v-model="product.provider_id"
            :options="providersList"
            label="Selecciona el proveedor"
          >
            <template v-if="product.provider_id" v-slot:append>
              <q-icon
                name="cancel"
                @click.stop.prevent="product.provider_id = null"
                class="cursor-pointer"
              />
            </template>
          </q-select>
          <div>
            <q-btn label="Editar producto" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-layout>
</template>
<script>
import mixin from "../../mixins/mixin";
import { useUserStore } from "../../stores/User";
import { useProductsStore } from "../../stores/Products";
import { useProvidersStore } from "src/stores/Providers";
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "ProductsEditPage",
  setup(props, { root }) {
    const { showLoading, hideLoading, showNoty } = mixin();
    const router = useRouter();
    const route = useRoute();
    const myForm = ref(null);
    const user = useUserStore();
    const products = useProductsStore();
    const providers = useProvidersStore();

    const providersList = ref([]);

    const product = computed(() => {
      return useProductsStore().product;
      // if (p) {
      //   const providerId = p.provider_id;
      //   p.provider_id = providers.$state.providers.find(
      //     (e) => e.value === providerId
      //   );
      // }
      return p;
    });

    onMounted(() => {
      if (!user.$state.bussines) router.push("/");
      showLoading("Consultando productos...");
      providers
        .getProviders(1, 50, null, user.$state.bussines.id)
        .then((data) => {
          data.map((i) => {
            providersList.value.push({
              label: `${i.name} ${i.last_name}`,
              value: i.id,
            });
          });
          products
            .getProduct(route.params.id, user.$state.bussines.id)
            .then(() => {
              hideLoading();
            });
        });
    });

    const updateProduct = () => {
      const copyProduct = product.value;
      if (copyProduct.provider_id.value)
        product.value.provider_id = copyProduct.provider_id.value;
      products
        .updateProduct(product.value)
        .then(() => {
          hideLoading();
          showNoty("success", "Producto actualizado correctamente.");
          router.push("/providers");
        })
        .catch(() => {
          hideLoading();
          showNoty("error", "Error al actualizar el producto.");
        });
    };

    const onSubmit = () => {
      myForm.value.validate().then((success) => {
        if (success) {
          showLoading("Guardando información...");
          updateProduct();
        }
      });
    };

    const onFilter = (val, update) => {};

    return {
      myForm,
      onSubmit,
      router,
      product,
      onFilter,
      providersList,
    };
  },
};
</script>
