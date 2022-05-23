<center><h1>移动应用交互设计</h1></center>

<center><h2>大作业报告</h2></center>



​																							![zucc](readme.assets/zucc-16532762252951.png)

​																				**专业班级: 			计算机1902班**

​																				**学生学号: 			31901049**

​																				**学生姓名: 			潘振宇**

​																				**实验指导教师: 	胡兴桥**





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

### 设计

#### 主页设计

```vue
<template>
  <div>
    <NavBar class="home-navbar">
      <template v-slot:center>
        <div>今日头条</div>
      </template>
      <template v-slot:right>
        <van-icon class="search" @click="toSearch" size="25px" name="search" />
      </template>
    </NavBar>
    <Tab></Tab>
  </div>
</template>
```

两个自定义组件构成（顶部标签栏和顶部导航栏）

顶部有左中右三部分组成（可编辑）右部有搜索按钮，可以搜索相关信息

主页分四个界面分别放“推荐”、“关注”、“热榜”、“杭州”、“抗疫”

推荐页面有三种样式，置顶文字、普通无图文字、三图+文字，三种样式中间有分割线

有下拉刷新功能

点击条目可跳转相关新闻页

#### 视频界面设计

标题+图片，点击可跳转视频播放页

#### 放映厅设计

放了一个跑马灯文字

#### 我的设计

上方头像+登录注册

​	点击登陆注册后用了vant组件底部弹出层设计

​	登录完之后下面的数据会发生变化 

下面利用vant中icon组件写了一排标签

底部有一个轮播图



### 实现



父子组件传值

```vue
<Login ref="isShow" @on-Login="getIsLogin"></Login> //父组件

//获取子组件传值
const getIsLogin = (
  isLogin: boolean,
  user_name: string,
  user_toutiao: number,
  user_zan: number,
  user_fans: number,
  user_follow: number
) => {
  state.isLogin = isLogin;
  state.user_name = user_name;
  state.follow = user_follow;
  state.fans = user_fans;
  state.zan = user_zan;
  state.toutiao = user_toutiao;
};
```





```vue
const emit = defineEmits(["on-Login"]);   //子组件传值
// 登录
const Login = () => {
  if (state.ischecked) {
    emit("on-Login", true, "jjking", 1, 12, 10, 21);
    show.value = false;
  } else {
    Toast("请先阅读并同意协议");
  }
};

// 给父组件暴露
const show = ref<boolean>(false);
defineExpose({
  show,
});
```

