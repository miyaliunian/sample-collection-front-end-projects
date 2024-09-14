<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in menus"
        :key="index"
        :label="item.title"
        :name="item.name"
        :path="item.path"
        @click="jump(item.path)"
      ></el-tab-pane>
    </el-tabs>
    <div>
      <div>
        <!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
        <router-view v-show="$route.name" />
      </div>
      <div>
        <!-- 子应用渲染区，用于挂载子应用节点 -->
        <section v-show="!$route.name" id="frame"></section>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        {
          key: "Home",
          title: "主应用hash模式",
          path: "/",
          name: "main",
        },
        {
          key: "VueMicroAppHash",
          title: "子应用",
          path: "/vuehash",
          name: "two",
        },
      ],
      activeName: "main",
    };
  },
  methods: {
    handleClick(tab, event) {
      const path = this.menus[tab.index].path;
      this.$router.push(path);
    },
  },
};
</script>
