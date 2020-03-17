import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import index from "@/views/index";
import form from "@/views/form";
import agree1 from "@/views/components/agreement/agreement1";
import agree2 from "@/views/components/agreement/agreement2";

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
    },
    {
      path: "/agree1",
      name: "agree1",
      component: agree1
    },
    {
      path: "/agree2",
      name: "agree2",
      component: agree2
    }
  ]
});
