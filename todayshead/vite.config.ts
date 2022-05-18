import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true, // 是否自动在浏览器打开
    port: 9000, // 端口号
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://ic.snssdk.com/", // 后台接口
        changeOrigin: true,
        secure: true, // 如果是https接口，需要配置这个参数
        // ws: true, //websocket支持
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
