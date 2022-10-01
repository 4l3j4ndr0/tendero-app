import { RouteRecordRaw } from "vue-router";
import CustomerPage from "../pages/Customers/Index.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/customers",
        component: CustomerPage,
      },
      {
        path: "/customers/create",
        component: import("pages/Customers/Create.vue"),
      },
      {
        path: "/customers/edit/:id",
        component: import("pages/Customers/Edit.vue"),
      },
      {
        path: "/providers",
        component: import("pages/Providers/Index.vue"),
      },
      {
        path: "/providers/create",
        component: import("pages/Providers/Create.vue"),
      },
      {
        path: "/providers/edit/:id",
        component: import("pages/Providers/Edit.vue"),
      },
      {
        path: "/products",
        component: import("pages/Products/Index.vue"),
      },
      {
        path: "/products/create",
        component: import("pages/Products/Create.vue"),
      },
      {
        path: "/products/edit/:id",
        component: import("pages/Products/Edit.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
