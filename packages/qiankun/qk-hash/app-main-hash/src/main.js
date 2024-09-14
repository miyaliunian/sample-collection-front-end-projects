import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import routes from "./routes";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import startQiankun from "./micro";

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = false;
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

startQiankun();

/**
 * 注册路由实例
 * 即将开始监听 location 变化，触发路由规则
 */
const router = new VueRouter({
  mode: "hash",
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#main-app");
