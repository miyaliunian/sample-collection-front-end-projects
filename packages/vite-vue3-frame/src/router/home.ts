export default [
  {
    path: "/",
    component: () => import("@/views/project/index.vue"),
    meta: {
      title: "项目看板",
      describe: "",
    },
  },
  {
    path: "/projectlist",
    component: () => import("@/views/projectList/index.vue"),
    meta: {
      title: "项目列表",
      describe: "",
    },
  },
  {
    path: "/projectmap",
    component: () => import("@/views/projectMap/index.vue"),
    meta: {
      title: "地图监测",
      describe: "",
    },
  },
  {
    path: "/machinelist",
    name: "MachineList",
    component: () => import("@/views/machineList/index.vue"),
    meta: {
      title: "设备列表",
      describe: "",
    },
  }
];
