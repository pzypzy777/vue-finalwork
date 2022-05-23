<template>
<img class="pic" src="../../../assets/hot/hot.png">
  <div class="rebang" v-for="(item, index) in state.newslist">
    <div>
      <a class=rank style="display:inline;">{{index+1}}</a>
      <a style="display:inline;" class="title">{{ item.word }}</a>
    </div>
    <van-divider />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"; 
import request from "../../../utils/request";
const state = reactive({
  newslist: [],
});
const newslist = () => {
  request({
    url: "/api/suggest_words/?business_id=10016",
    method: "get",
  }).then((res) => {
    state.newslist = res.data.data[0].words
  });
};
onMounted(() => {
  newslist();
});

</script>

<style lang="less" scoped>
.pic{
    width: 100%;
    /*background: #f2f2f2;*/
    display: flex;
    justify-content: center;
    align-items: center;

}
.rank{
  color:red;
}
.home-navbar {
  background-color: #ef3a41;
  color: white;
}
.rebang{
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
  margin-left: 5px;
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
