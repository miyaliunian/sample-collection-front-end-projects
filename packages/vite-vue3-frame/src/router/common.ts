export default [
  //404
  {
    // 匹配所有路径  vue2使用*   vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
    path: "/:pathMatch(.*)*",
    name: "errorPage",
    meta: { title: "errorPage", keepAlive: false, auth: false },
    component: () => import("@/common/error.vue"),
  },
];
