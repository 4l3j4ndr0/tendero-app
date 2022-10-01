<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="q-gutter-md">
          <q-avatar style="cursor-pointer" square @click="router.push('/')">
            <img :src="logo" />
          </q-avatar>
          <q-btn
            flat
            :label="
              user.$state.bussines
                ? user.$state.bussines.name
                : 'Selecciona un negocio'
            "
            icon-right="expand_more"
          >
            <q-menu fit auto-close>
              <q-list style="min-width: 100px">
                <q-item
                  clickable
                  v-for="item in user.$state.user.bussiness"
                  @click="
                    () => {
                      user.$patch({
                        bussines: item,
                      });
                      $q.localStorage.set('bussiness', item);
                      reloadPage();
                    }
                  "
                >
                  <q-item-section>{{ item.name }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar-title>
        <div class="q-gutter-lg">
          <q-btn
            icon="add_business"
            v-if="user.$state.bussines"
            size="md"
            outline
            :label="user.$state.bussines.address"
          />
          <q-btn @click="logOut" round icon="logout" />
        </div>
      </q-toolbar>

      <q-tabs align="left" v-if="user.$state.bussines">
        <q-route-tab to="/customers" label="Clientes" />
        <q-route-tab to="/providers" label="Proveedores" />
        <q-route-tab to="/products" label="Productos" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/User";
import { useQuasar } from "quasar";
import mixin from "../mixins/mixin";
export default {
  name: "MainLayout",
  setup() {
    const logo = new URL("../../src/assets/icons/logo.png", import.meta.url)
      .href;
    const $q = useQuasar();
    const user = useUserStore();
    const { showLoading, hideLoading, showNoty } = mixin();
    const leftDrawerOpen = ref(true);
    const router = useRouter();
    const logOut = () => {
      showLoading("Cerrando sesión...");
      user.logOut();
      $q.localStorage.clear();
      hideLoading();
      router.push("/login");
    };
    const reloadPage = () => {
      window.location.reload();
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      router,
      logOut,
      logo,
      user,
      reloadPage,
    };
  },
};
</script>
