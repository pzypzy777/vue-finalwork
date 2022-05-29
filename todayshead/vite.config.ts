import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
module.exports = defineConfig({
  build: {
    target: 'modules',
    outDir: 'dist', //指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser' // 混淆器，terser构建后文件体积更小
},
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

