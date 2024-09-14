<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button @click="receive">接收主应用参数</el-button>
  </div>
</template>
<script>
// 引入 actions 实例
import actions from "@/shared/actions";
export default {
  data(){
    return{
      token:''
    }
  },
  mounted() {
    // 注册观察者函数
    // onGlobalStateChange 第二个参数为 true，表示立即执行一次观察者函数
    actions.onGlobalStateChange((state) => {
      const { token } = state;
      // 不存在
      if (!token) {
        this.$message.error("未检测到登录信息！");
      }
      this.token = token
    }, true);
  },

  methods: {
    receive() {
      this.$message.success(this.token)
    },
  },
};
</script>
