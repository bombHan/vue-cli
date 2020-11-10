import Vue from "vue";
import Router from "vue-router";
import AppRouter from "./config";

Vue.use(Router);

const router = new Router({
  routes: AppRouter,
});

export default router;
