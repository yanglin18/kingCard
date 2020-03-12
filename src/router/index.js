import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import index from "@/views/index";
import form from "@/views/form"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: index,
    },
    {
      path: "/form",
      name: "form",
      component: form
    }
  ]
});
