// vue.config.js
module.exports = {
  publicPath: "http://localhost:8085/",

  chainWebpack: (config) => {
    /* module federation plugin import */
    config.optimization.delete("splitChunks");
    config
      .plugin("module-federation-plugin")
      .use(require("webpack").container.ModuleFederationPlugin, [
        {
          name: "app",
          remotes: {
            // 导入
            home: "home@http://localhost:8084/remoteEntry.js",
          },
        },
      ]);
  },

  devServer: {
    port: 8085,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
};
