<template>
  <div style="text-align: center">
    <img alt="Vue logo" src="../assets/logo.png" style="width: 200px" />
    <HelloWorld msg="我是子应用(hash模式)" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
