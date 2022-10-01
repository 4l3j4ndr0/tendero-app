import { defineStore } from "pinia";
import ApiService from "../helpers/ApiService";
export const useCustomersStore = defineStore("customers", {
  state: () => ({
    customer: null,
    customers: [],
  }),
  actions: {
    getCustomers(
      page: Number,
      rowsPerPage: Number,
      filter: String,
      bussines_id: Number
    ) {
      return new Promise((resolve, reject) => {
        ApiService()
          .get(`/api/customer/0/${bussines_id}`)
          .then((response) => {
            this.customers = response.data.customer;
            resolve(response.data);
          })
          .catch((error) => {
            console.log("ERROR LOGIN:::", error);
            reject(error);
          });
      });
    },
    getCustomer(id: Number, bussines_id: String) {
      return new Promise((resolve, reject) => {
        ApiService()
          .get(`/api/customer/${id}/${bussines_id}`)
          .then((response) => {
            this.customer = response.data.customer[0];
            resolve(response.data);
          })
          .catch((error) => {
            console.log("ERROR LOGIN:::", error);
            reject(error);
          });
      });
    },
    createCustomer(
      name: String,
      last_name: String,
      cellphone: String,
      bussiness_id: Number
    ) {
      return new Promise((resolve, reject) => {
        ApiService()
          .post(`/api/customer`, {
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
    updateCustomer(customer: any) {
      return new Promise((resolve, reject) => {
        ApiService()
          .put(`/api/customer`, customer)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log("ERROR LOGIN:::", error);
            reject(error);
          });
      });
    },
    deleteCustomer(id: Number) {
      return new Promise((resolve, reject) => {
        ApiService()
          .remove(`/api/customer/${id}/0`)
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
