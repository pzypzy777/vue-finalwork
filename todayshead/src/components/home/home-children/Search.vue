<template>
  <NavBar class="navbar">
      <template v-slot:center>
        <div>搜索</div>
      </template>
      <template v-slot:left>
        <van-icon class="toHome" @click="toHome" size="25px" name="revoke" />
      </template>
    </NavBar>
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
            size="normal"
            @click="onSearch(item)"
            >{{ item }}
          </van-button>
        </span>
      </div>
      <van-divider>————————————————</van-divider>
    <van-button class="delHotSearch" round @click="delHostClick" color="linear-gradient(to right, #ff6034, #ee0a24)">清除历史</van-button>
    </div>
  </div>

  <div class="content" v-for="(item, index) in state.newslist" @click="openurl(item['url'])">
    <div>
      <a class="title">{{ item['title'] }}</a>
      <div class="footer">
        <span class="source">{{ item['source'] }}</span>
        <span class="comment">99+评论</span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
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

</script>

<style lang="less" scoped>
.navbar {
  background-color: #ef3a41;
  color: white;
}
.proHot{
  margin-left: 10px;
  margin-top: 10px;
}
.toHome{
  margin-top: 8px;
  margin-left: 15px;
}
.searchValBtn{
  padding: 10px;
}
.content{
	margin-left: 10px;
	margin-top: 10px;
}
.pic-img {
	margin-top: 5px;
  margin-left: 20px;
  width: 350px;
  height: 200px;
}
.title {
  opacity: 0.87;
  line-height: 20px;
  letter-spacing:2px;
  padding:5px;
  font-size: 15px;
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden; /*超出的文本隐藏*/
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
}
.delHotSearch{
  margin-left: 3rem;
}
.footer {
  font-size: 5px;
  margin-top: 5px;
}
.source {
  margin-left: 5px;
  color: #8a8a8a;
}
.comment {
  margin-left: 5px;
  color: #8a8a8a;
}
</style>
