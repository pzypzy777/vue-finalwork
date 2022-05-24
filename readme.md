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

​	登录后右边会出现个人主页，点一下会出现侧边弹出框，包含个人信息和头像

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





搜索记录存储和删除操作

```typescript
import { defineStore } from 'pinia'
import { toHandlers } from 'vue'


export const userStore = defineStore({
  id: '1',
  state: () => {
    return {
      user_name: "",
      user_id: '',
      user_pwd: '',
      follow: 0,
      fans: 0,
      toutiao: 0,
      zan: 0,
      searchHistoryList: []
    }
  },

  getters: {

  },

  actions: {
    addSearchHistory(e){
      if(this.searchHistoryList.indexOf(e)===-1){
        this.searchHistoryList.push(e);
      }
    },
    clearSearchHistory(e){
      this.searchHistoryList.length = 0;;
    }
  },


})

```



搜索框

```vue
  <div class="search-box">
    <van-search
      v-model="value"
      show-action
      background="#ef3a41"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onClickButton">搜索</div>
      </template>
    </van-search>
  </div>
<div class="search">
    <!-- 搜索历史 -->
    <div class="history" v-if="state.isShowHistory">
      <div class="proHot">搜索历史</div>
      <!-- 存放历史记录信息 -->
      <div class="searchBtn-div">
        <span v-for="(item, index) in state.historyList" :key="index" class="searchValBtn" >
          <van-button
            round
            size="middle"
            @click="onSearch(item)"
            >{{ item }}
          </van-button>
        </span>
      </div>
      <van-divider>————————————————</van-divider>
    <van-button class="delHotSearch" round @click="delHostClick" color="linear-gradient(to right, #ff6034, #ee0a24)">清除历史</van-button>
    </div>
  </div>
```



```typescript
import { onMounted, reactive, ref } from "vue"; 
import axios from "axios";
import { Toast , Dialog} from "vant";
import { userStore } from "../../../store/index"
import { storeToRefs } from "pinia";
import NavBar from "../../navBar/NavBar.vue";
import router from "../../../router/index"
const toHome = () => {
	router.push('Home')
}
const $store = userStore()
const{ searchHistoryList } = storeToRefs($store)
const value = ref("");
const onSearch = (val) => {
  axios({
    url: "http://api.tianapi.com/topnews/index?key=6f2593743a93b250035c55862030f4b2",
    method: "post",
    params: {
        word: val,
        num: 50
    }
  }).then((res) => {
    state.isShowHistory=true;
    state.newslist = res.data.newslist;
    $store.addSearchHistory(val);
  });
}
const onClickButton = () => {
  axios({
    url: "http://api.tianapi.com/topnews/index?key=6f2593743a93b250035c55862030f4b2",
    method: "post",
    params: {
        word: value.value,
        num: 50
    }
  }).then((res) => {
    state.isShowHistory=true;
    state.newslist = res.data.newslist;
    $store.addSearchHistory(value.value);
  });
};

const state = reactive({
  newslist: [],
  isShowHistory: false, // 是否显⽰历史记录
  historyList:new Array(),//历史记录
});

const delHostClick = async () => {
      Dialog.confirm({
        message: '确定要删除历史搜索吗？',
      }).then(() => {
       // 清空历史记录信息
        $store.clearSearchHistory(state);
        state.isShowHistory = false;
        Toast({
          message: '删除成功',
          position: 'bottom',
        });
      });
    };


const openurl = (e: string) => {
  window.location.href = e;
};

onMounted(async () => {
      // 判断初始化是否显⽰历史搜索
      state.historyList = $store.searchHistoryList;
      if (state.historyList.length > 0) {
        state.isShowHistory = true;
      } else {
        state.isShowHistory = false;
      }
    });
```







文字动画

```vue
<template>
    <h2>
        <!-- 利用var()给字母排序，以实现依次闪烁效果 -->
        <span style="--o:1">V</span>
        <span style="--o:2">i</span>
        <span style="--o:3">d</span>
        <span style="--o:4">e</span>
        <span style="--o:5">o</span>
        <span style="--o:6">H</span>
        <span style="--o:7">a</span>
        <span style="--o:8">l</span>
        <span style="--o:9">l</span>
    </h2>
</template>

<style lang="less" scoped>
* {
    /* 清除预设margin和padding */
    margin: 0;
    padding: 0;
    /* 把borders和padding全都包含在定义的宽高里面 */
    box-sizing: border-box;
    /* 设置字体（cursive为备选字体） */
    font-family: "MV Boli", cursive;
}
body {
    background: #111;
}
h2 {
    /* flex布局 */
    display: flex;
    /* 初始文字透明 */
    color: transparent;
    /* 文字水平垂直居中显示 */
    justify-content: center;
    align-items: center;
    /* h2高度 */
    height: 100vh;
    /* 字号 */
    font-size: 15vw;
}
h2 span:nth-child(6) {
    /* 单词间隙 */
    margin-left: 5vw;
}
h2 span {
    animation: LetterColor 3s linear infinite;
    /* 计算每个字的动画起始时间 */
    animation-delay: calc(0.1s * var(--o));
}
@keyframes LetterColor {
    0% {
        color: #fff;
        /* 利用模糊距离不同的阴影实现霓虹灯光晕效果 */
        text-shadow: 
        0 0 10px #00b3ff,
        0 0 20px #00b3ff,
        0 0 40px #00b3ff,
        0 0 80px #00b3ff,
        0 0 120px #00b3ff,
        0 0 200px #00b3ff,
        0 0 300px #00b3ff,
        0 0 400px #00b3ff;
        /* 设置高斯模糊与色调，实现模糊效果和颜色变换 */
        filter: blur(2px) hue-rotate(0deg);
    }
    30%,
    70% {
        color: #fff;
        /* 减少光晕大小 */
        text-shadow: 
        0 0 10px #00b3ff,
        0 0 20px #00b3ff,
        0 0 40px #00b3ff,
        0 0 80px #00b3ff,
        0 0 120px #00b3ff,
        0 0 200px #00b3ff;
        /* 色调变换360度 */
        filter: blur(2px) hue-rotate(360deg);
    }
    100% {
        /* 动画结束字变透明 */
        color: transparent;
        /* 动画结束消除阴影 */
        text-shadow: none;
        /* 动画结束色调重置 */
        filter: blur(2px) hue-rotate(0deg);
    }
}
</style>
```





### 大作业总结

​		作业采用vite而不是vue-cli，因为vite更小，速度比后者快一个数量级，采用ts是因为ts是js的超集，js能干的ts都能干，所以就选好了框架，然后开始设计顶部和底部导航栏，这俩是自定义组件，然后就设计主页的排版，三种不同类型的文字要采用不同的编排方式。搜索界面利用store存储搜索记录，并且有删除记录。我的和登录组件父子组件传值引入了defineEmits和defineProps。

​		在做的过程中遇到了很多问题，环境就配了很久，还有跨域问题，网上的回答时间太久远，跟现在的用法不太一样，整了一个晚上才解决跨域。

​		大作业就是把平时学到的东西能多用就多用，做出一些有意思的东西，多看看应用市场的app也会获得一些灵感，会好奇它这个是怎么做到的，然后就会一直百度搜索，就会学到一些书上学不到的知识。

​		大作业存在的问题还有一些，主要没有开发后台，如果有后台就会更完善，大三时间也比较紧，能做到这样子个人觉得已经不错了，以后有空可能还会完善，增加开发经验。



自我打分：90

