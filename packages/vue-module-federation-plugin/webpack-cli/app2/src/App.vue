<template>
  <div id="app">
    <h1>我是子应用</h1>
    <p>我将使用主应用的共享组件</p>
    <ul>
      <li>
        <Button />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  components: {
    Button: () => import("app1/Button"),
  },
};
</script>
