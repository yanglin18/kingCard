import Vue from "vue";
import Router from "vue-router";
import index from "@/views/index";
import form from "@/views/form";
import agree1 from "@/views/components/agreement/agreement1";
import agree2 from "@/views/components/agreement/agreement2";
import agree3 from "@/views/components/agreement/agreement3";
import agree4 from "@/views/components/agreement/agreement4";
Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: "/",
    //   name: "form",
    //   component: () => import("@/views/gdtform.vue"),
    //   meta: {
    //     keepAlive: true // 需要缓存的页面
    //   }
    // },
    {
      path: "/",
      name: "index",
      component: () => import("@/views/singlePage/index.vue"),
      meta: {
        keepAlive: true // 需要缓存的页面
      }
    },
    {
      path: "/",
      name: "shortform",
      component: () => import("@/views/gdtform.vue"),
      meta: {
        keepAlive: true // 需要缓存的页面
      }
    },
    {
      path: "/form",
      name: "form",
      component: form,
      meta: {
        keepAlive: true // 需要缓存的页面
      }
    },
    {
      path: "/moreUse",
      name: "moreUse",
      component: () => import("@/views/components/3card/moreUseLimit.vue")
    },
    {
      path: "/moreDetail",
      name: "moreDetail",
      component: () => import("@/views/components/3card/moredetail.vue")
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
    },
    {
      path: "/agree3",
      name: "agree3",
      component: agree3
    },
    {
      path: "/agree4",
      name: "agree4",
      component: agree4
    }
  ]
});
