// vue.config.js
module.exports = {
  publicPath: "http://localhost:8084/",

  chainWebpack: (config) => {
    /* module federation plugin import */
    config.optimization.delete("splitChunks");
    config
      .plugin("module-federation-plugin")
      .use(require("webpack").container.ModuleFederationPlugin, [
        {
          name: "home", // 模块名称
          filename: "remoteEntry.js",
          exposes: {
            // 对外暴露的组件
            "./HelloWorld": "./src/components/HelloWorld.vue",
          },
        },
      ]);
  },

  devServer: {
    port: 8084,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
};
