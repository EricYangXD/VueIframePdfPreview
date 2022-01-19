import Vue from "vue";
import Router from "vue-router";
import login from "@/page/login/login.vue";
import haveIframe from "@/page/haveIframe/haveIframe.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/",
      name: "haveIframe",
      component: haveIframe
    }
  ]
});
