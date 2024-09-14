<template>
  <div id="app">
    <h1>我是主应用</h1>
    <p>这是我的Button组件，我将把它共享给我的子应用~</p>
    <ul>
      <li>
        <Button />
      </li>
    </ul>
  </div>
</template>
<script>
import Button from "./components/Button.vue";
export default {
  components: {
    Button,
  },
};
</script>
