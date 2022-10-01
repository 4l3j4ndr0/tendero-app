import { defineStore } from "pinia";
import ApiService from "../helpers/ApiService";
export const useProductsStore = defineStore("products", {
  state: () => ({
    product: null,
    products: [],
  }),
  actions: {
    getProducts(
      page: Number,
      rowsPerPage: Number,
      filter: String,
      bussines_id: Number
    ) {
      return new Promise((resolve, reject) => {
        ApiService()
          .get(`/api/product/0/${bussines_id}`)
          .then((response) => {
            this.products = response.data.product;
            resolve(response.data);
          })
          .catch((error) => {
            console.log("ERROR LOGIN:::", error);
            reject(error);
          });
      });
    },
    getProduct(id: Number, bussines_id: String) {
      return new Promise((resolve, reject) => {
        ApiService()
          .get(`/api/product/${id}/${bussines_id}`)
          .then((response) => {
            this.product = response.data.product[0];
            resolve(response.data);
          })
          .catch((error) => {
            console.log("ERROR LOGIN:::", error);
            reject(error);
          });
      });
    },
    createProduct(
      product: String,
      description: String,
      bar_code: String,
      buy_price: Number,
      sell_price: Number,
      stock: Number,
      apply_iva: Boolean,
      send_alert: Number,
      bussiness_id: Number,
      provider_id: Number
    ) {
      return new Promise((resolve, reject) => {
        ApiService()
          .post(`/api/product`, {
            product,
            description,
            bar_code,
            buy_price,
            sell_price,
            stock,
            apply_iva,
            send_alert,
            bussiness_id,
            provider_id,
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log("ERROR LOGIN:::", error);
            reject(error);
          });
      });
    },
    updateProduct(product: any) {
      return new Promise((resolve, reject) => {
        ApiService()
          .put(`/api/product`, product)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log("ERROR LOGIN:::", error);
            reject(error);
          });
      });
    },
    deleteProduct(id: Number) {
      return new Promise((resolve, reject) => {
        ApiService()
          .remove(`/api/product/${id}/0`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log("ERROR LOGIN:::", error);
            reject(error);
          });
      });
    },
  },
});
