// 使用 home 项目里面的组件
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="测试模块联邦组件接收："/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    HelloWorld: () => import('home/HelloWorld')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
