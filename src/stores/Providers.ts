import { defineStore } from "pinia";
import ApiService from "../helpers/ApiService";
export const useProvidersStore = defineStore("providers", {
  state: () => ({
    provider: null,
    providers: [],
  }),
  actions: {
    getProviders(
      page: Number,
      rowsPerPage: Number,
      filter: String,
      bussines_id: Number
    ) {
      return new Promise((resolve, reject) => {
        ApiService()
          .get(`/api/provider/0/${bussines_id}`)
          .then((response) => {
            this.providers = response.data.provider;
            resolve(response.data.provider);
          })
          .catch((error) => {
            console.log("ERROR LOGIN:::", error);
            reject(error);
          });
      });
    },
    getProvider(id: Number, bussines_id: String) {
      return new Promise((resolve, reject) => {
        ApiService()
          .get(`/api/provider/${id}/${bussines_id}`)
          .then((response) => {
            this.provider = response.data.provider[0];
            resolve(response.data.provider);
          })
          .catch((error) => {
            console.log("ERROR LOGIN:::", error);
            reject(error);
          });
      });
    },
    createProvider(
      name: String,
      last_name: String,
      cellphone: String,
      bussiness_id: Number
    ) {
      return new Promise((resolve, reject) => {
        ApiService()
          .post(`/api/provider`, {
            name,
            last_name,
            cellphone,
            bussiness_id,
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
    updateProvider(provider: any) {
      return new Promise((resolve, reject) => {
        ApiService()
          .put(`/api/provider`, provider)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log("ERROR LOGIN:::", error);
            reject(error);
          });
      });
    },
    deleteProvider(id: Number) {
      return new Promise((resolve, reject) => {
        ApiService()
          .remove(`/api/provider/${id}/0`)
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
