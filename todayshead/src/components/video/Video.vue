<template>
  <div>
    <NavBar class="home-navbar">
      <template v-slot:center>
        <div>今日头条</div>
      </template>
    </NavBar>
  </div>

  <div class="video" v-for="(item, index) in state.newslist2.filter((obj) => obj.has_video&&obj.large_image_list)" @click="openurl(item.display_url)">
    <div>
      <a class="title">{{ item.share_info.title }}</a>
      <div class="pic">
        <img class="pic-img" :src="`${item.large_image_list[0].url}`" />
      </div>
      <div class="footer">
        <span class="source">{{ item.media_info.name }}</span>
        <span class="comment">{{ item.comment_count }}评论</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "../navbar/NavBar.vue";
import { onMounted, reactive, ref } from "vue";
import request from "../../utils/request";
const state = reactive({
  newslist2: [],
});
const newslist2 = () => {
  request({
    url: "/2/article/v25/stream/",
    method: "get",
  }).then((res) => {
    console.log(res);
    state.newslist2 = res.data.data;
  });
};
onMounted(() => {
  newslist2();
});
const openurl = (e: string) => {
  window.location.href = e;
};
</script>

<style lang="less" scoped>
.home-navbar {
  background-color: #ef3a41;
  color: white;
}
.video{
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
