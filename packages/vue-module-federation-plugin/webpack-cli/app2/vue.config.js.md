const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  chainWebpack: (config) => {
    config
      .plugin("module-federation-plugin")
      .use(require("webpack").container.ModuleFederationPlugin, [
        {
          name: "app2",
          remotes: {
            app1: "app1@http://localhost:8080/remoteEntry.js",
          },
        },
      ]);
  },
  configureWebpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
  },
  devServer: {
    port: 8081,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
});
