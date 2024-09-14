<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="我是主应用"/>
    <el-button @click="send">actions通信</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import actions from '@/shared/actions'

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  mounted(){
    // 注册一个观察者函数
    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      console.log("主应用观察者：token 改变前的值为 ", prevState.token);
      console.log("主应用观察者：登录状态发生改变，改变后的 token 的值为 ", state.token);
    });
  },
  methods:{
    send(){
       actions.setGlobalState({ token:'01-token数据测试' });
    }
  }
};
</script>
<style scoped>
.home {
  text-align: center;
}
</style>
