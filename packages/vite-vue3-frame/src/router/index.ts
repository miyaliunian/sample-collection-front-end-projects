import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Common from "./common";
import Home from "./home";

const routes: Array<RouteRecordRaw> = [...Common, ...Home];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
