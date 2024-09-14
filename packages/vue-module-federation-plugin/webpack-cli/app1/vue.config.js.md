const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  chainWebpack: (config) => {
    config
      .plugin("module-federation-plugin")
      .use(require("webpack").container.ModuleFederationPlugin, [
        {
          // 提供给其他服务加载的文件
          filename: "remoteEntry.js",
          // 唯一ID，用于标记当前服务
          name: "app1",
          library: { type: "var", name: "app1" },
          // 需要暴露的模块，使用时通过 `${name}/${expose}` 引入
          exposes: {
            "./Button": "./src/components/Button.vue",
          },
        },
      ]);
  },
  devServer: {
    port: 8080,
    host:'0.0.0.0',
    hot: true,
    // 处理websocket连接失败
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
});
