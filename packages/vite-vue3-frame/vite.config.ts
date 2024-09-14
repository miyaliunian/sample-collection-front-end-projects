import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 需要安装的插件@types/node
import path from "path";
const resolve = (dir: string) => path.join(__dirname, dir);
// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "public", // 公共文件路径,会被复制到outDir 根目录
  // 路径相关规则
  resolve: {
    alias: {
      "@": resolve("src"), // 取相对路径别名, @表示当前的src目录路径
    },
  },
  // 为服务器设置代理规则
  server: {
    host: "127.0.0.1", // 指定服务器主机名
    port: 8080, // 指定服务端口号
    open: false, // 运行自动打开浏览器
    // https: false, // 关闭https
    strictPort: true, // 若8088端口被占用,直接结束项目
    // proxy: {
    //   // 选项写法
    //   "/api": {
    //     target: "http://10.0.104.125:8080",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
  plugins: [vue()],
});
