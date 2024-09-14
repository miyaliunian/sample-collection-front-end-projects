<template>
  <div id="app_qk_app_a_hash">
    <div id="nav_qk_app_a_hash">
      <router-link to="/vuehash">Home</router-link> |
      <router-link to="/vuehash/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app_qk_app_a_hash {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav_qk_app_a_hash {
  padding: 30px;
}

#nav_qk_app_a_hash a {
  font-weight: bold;
  color: #2c3e50;
}

#nav_qk_app_a_hash a.router-link-exact-active {
  color: #42b983;
}
</style>
