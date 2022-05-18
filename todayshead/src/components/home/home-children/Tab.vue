<template>
  <div>
    <van-tabs v-model:active="state.active" animated sticky>
      <van-tab title="推荐"><Recommended></Recommended></van-tab>
      <van-tab title="关注"><Follow></Follow></van-tab>
      <van-tab title="热榜"><HotChart></HotChart></van-tab>
      <van-tab title="杭州"><HangZhou></HangZhou></van-tab>
      <van-tab title="抗疫 "><Covid></Covid></van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Recommended from "./Recommended.vue"
import Follow from "./Follow.vue"
import HotChart from "./HotChart.vue"
import HangZhou from "./HangZhou.vue"
import Covid from "./Covid.vue"
const state = reactive({
  active: 0,
});
</script>

<style lang="less" scoped></style>
