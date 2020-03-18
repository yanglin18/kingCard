// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import axios from "axios";
import qs from "qs";

Vue.config.productionTip = false;
/* eslint-disable no-new */

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

router.beforeEach((to, from, next) => {
  window.scrollTo({
    top: 0
  });
  next();
});

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
