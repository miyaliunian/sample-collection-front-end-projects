import { createApp } from "vue";
import "./style/var.css";
import App from "./App.vue";
import router from "./router";
import 'amfe-flexible';

import { Button, List, Cell, Col, Row, Field, CellGroup, Search, Icon, Cascader, Popup, Form, DropdownMenu, DropdownItem, TreeSelect, Progress ,Picker,Tab, Tabs,Calendar,Toast} from "vant";
import "vant/lib/index.css";

// 引入mock数据，关闭则注释该行(to:fix)
import { mockXHR } from "@/mock/index";
mockXHR();

const app = createApp(App);
app.use(router).mount("#app");
app.use(Button)
  .use(List)
  .use(Cell)
  .use(Col)
  .use(Row)
  .use(Field)
  .use(CellGroup)
  .use(Search)
  .use(Icon)
  .use(Cascader)
  .use(Popup)
  .use(Form)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(TreeSelect)
  .use(Progress)
  .use(Picker)
  .use(Tab)
  .use(Tabs)
  .use(Calendar)
  .use(Toast)

import * as echarts from 'echarts'
app.config.globalProperties.$echarts = echarts

router.afterEach((to) => {
  if (to.meta.title) document.title = to.meta.title + " - 机械设备管理系统";
});
