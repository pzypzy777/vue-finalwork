<template>

<van-pull-refresh v-model="isLoading" :head-height="80" @refresh="onRefresh">
  <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
  <template #pulling="props">
    <img
      class="doge"
      src="../../../assets/login/douyin.svg"
      :style="{ transform: `scale(${props.distance / 80})` }"
    />
  </template>

  <!-- 释放提示 -->
  <template #loosing>
    <img
      class="doge"
      src="../../../assets/login/qq.svg"
    />
  </template>

  <!-- 加载提示 -->
  <template #loading>
    <img
      class="doge"
      src="../../../assets/login/toutiao.svg"
    />
  </template>
  <div class="yiqing" v-for="(item, index) in state.newslist" @click="openurl(item['url'])">
    <div>
      <a class="title">{{ item['title'] }}</a>
      <div class="footer">
        <span class="source">{{ item['source'] }}</span>
        <span class="comment">99+评论</span>
      </div>
    </div>
  </div>
</van-pull-refresh>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"; 
import axios from "axios";
import {Toast} from "vant"

const count = ref(0);
    const isLoading = ref(false);
    const onRefresh = () => {
      setTimeout(() => {
        Toast('刷新成功');
        isLoading.value = false;
        count.value++;
      }, 1000);
    }
const state = reactive({
  newslist: [],
});
const newslist = () => {
  axios({
    url: "http://api.tianapi.com/topnews/index?key=6f2593743a93b250035c55862030f4b2",
    method: "post",
    params: {
        word: "疫情",
        num: 50
    }
  }).then((res) => {
    console.log(res);
    state.newslist = res.data.newslist;
  });
};
onMounted(() => {
  newslist();
});
const openurl = (e: string) => {
  window.location.href = e;
};
</script>

<style lang="less" scoped>
 .doge {
    width: 140px;
    height: 72px;
    margin-top: 8px;
    border-radius: 4px;
  }
.home-navbar {
  background-color: #ef3a41;
  color: white;
}
.yiqing{
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
  letter-spacing:1px;
  padding:5px;
  font-size: 15px;
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden; /*超出的文本隐藏*/
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
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
