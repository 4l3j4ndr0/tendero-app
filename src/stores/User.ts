import { defineStore } from "pinia";
import ApiService from "../helpers/ApiService";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    bearer_token: null,
    refresh_token: null,
    bussines: null,
  }),
  actions: {
    login(email: String, password: String) {
      return new Promise((resolve, reject) => {
        ApiService()
          .post("/api/token/", {
            username: email,
            password,
          })
          .then((response) => {
            this.bearer_token = response.data.access;
            this.refresh_token = response.data.refresh;
            this.getInfoUser();
            resolve(response.data.access);
          })
          .catch((error) => {
            console.log("ERROR LOGIN:::", error);
            reject(error);
          });
      });
    },
    getInfoUser() {
      return new Promise((resolve, reject) => {
        ApiService()
          .get("/api/user")
          .then((response) => {
            this.user = response.data.user;
            if (response.data.user.bussiness.length === 1) {
              this.bussines = response.data.user.bussiness[0];
            }
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logOut() {
      this.bearer_token = null;
      this.refresh_token = null;
    },
    setToken(token: any) {
      this.bearer_token = token;
      this.getInfoUser();
    },
  },
});
