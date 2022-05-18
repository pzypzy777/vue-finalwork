# VUE仿今日头条设计

### 框架

vue3.x + vite +  TypeScript + pinia + less

### 项目运行

```js
npm install
npm init vite
npm run dev
```

### 自定义组件

1. Navbar
2. Tabbar
3. Tab
4. Login
5. Personal



### 使用组件库

Vant3



### 主要技术

1. Pinia 是 Vue 的存储库，它允许您跨组件/页面共享状态

   ```
   登录界面的数据获取
   ```

   

2. vue-router

3. axios跨域问题

   ```js
   const service = axios.create({
       baseURL: '/api', // url = base url + request url
       timeout: 5000,
       withCredentials: true,  // send cookies when cross-domain requests
       headers: {
           // clear cors
           'Cache-Control': 'no-cache',
           'Pragma': 'no-cache'
       }
   })
   ```

   

4. 跑马灯文字

5. 弹出框、轮播图