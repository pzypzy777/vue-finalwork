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
      <img class="doge" src="../../../assets/login/qq.svg" />
    </template>

    <!-- 加载提示 -->
    <template #loading>
      <img class="doge" src="../../../assets/login/toutiao.svg" />
    </template>
  <div>
    <div
      class="stick"
      v-for="(item, index) in state.newslist2.filter(
        (obj) =>
          obj.hasOwnProperty('label') || obj.hasOwnProperty('stick_label')
      )"
      @click="openurl(item.display_url)"
    >
      <div>
        <a class="title">{{ item.abstract }}</a>
        <div class="footer">
          <span class="stick-label">置顶</span>
          <span class="source">{{ item.media_info.name }}</span>
          <span class="comment">{{ item.comment_count }}评论</span>
        </div>
      </div>
    </div>
<van-divider />
    <div
      class="not-stick"
      v-for="(item, index) in state.newslist2.filter(
        (obj) =>
          !obj.hasOwnProperty('image_list') &&
          !(obj.hasOwnProperty('label') || obj.hasOwnProperty('stick_label'))&&!obj.has_video
      ).slice(0,4)"
      @click="openurl(item.display_url)"
    >
      <div>
        <a class="title">{{ item.abstract }}</a>
        <div class="footer">
          <span class="source">{{ item.media_info.name }}</span>
          <span class="comment">{{ item.comment_count }}评论</span>
        </div>
      </div>
    </div>
<van-divider />
    <div
      class="pic"
      v-for="(item, index) in state.newslist2.filter((obj) =>
        obj.hasOwnProperty('image_list')
      )"
      @click="openurl(item.display_url)"
    >
      <div>
        <a class="title">{{ item.abstract }}</a>
        <div class="pic-imglist">
          <img class="pic-img" :src="`${item.image_list[0].url}`" />
          <img class="pic-img" :src="`${item.image_list[1].url}`" />
          <img class="pic-img" :src="`${item.image_list[2].url}`" />
        </div>
        <div class="footer">
          <span class="source">{{ item.media_info.name }}</span>
          <span class="comment">{{ item.comment_count }}评论</span>
        </div>
      </div>
    </div>
  </div>
  <div class="kkk"></div>
  </van-pull-refresh>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import request from "../../../utils/request";
import { Toast } from "vant";
const count = ref(0);
const isLoading = ref(false);
const onRefresh = () => {
  setTimeout(() => {
    Toast("刷新成功");
    isLoading.value = false;
    newslist2();
  }, 1000);
};
const state = reactive({
  newslist2: [],
});
const newslist2 = () => {
  request({
    url: "/2/article/v25/stream/",
    method: "get",
  }).then((res) => {
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
.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}
.kkk {
  height: 60px;
}
.stick {
  margin-left: 15px;
  margin-top: 15px;
}
.not-stick {
  margin-left: 15px;
  margin-top: 15px;
}

.title {
  opacity: 0.87;
  line-height: 20px;
  margin-top: 20px;
  letter-spacing:1px;
  font-size: 15px;
  display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
  -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
  overflow: hidden; /*超出的文本隐藏*/
  text-overflow: ellipsis; /* 溢出用省略号*/
  -webkit-box-orient: vertical ; /*伸缩盒子的子元素排列：从上到下*/
}
.footer {
  font-size: 5px;
  margin-top: 8px;
}
.pic-imglist {
  margin-top: 10px;
}
.pic {
  margin-left: 15px;
  margin-top: 15px;
}
.pic-img {
  margin-left: 5px;
  width: 120px;
  height: 100px;
}
.stick-label {
  color: red;
}
.source {
  margin-left: 5px;
  color: #8a8a8a;
}
.comment {
  margin-left: 5px;
  color: #8a8a8a;
}
.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}
</style>