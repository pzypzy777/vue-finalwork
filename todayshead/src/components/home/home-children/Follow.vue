<template>
  <div class="concern">
    <img class="pic" src="../../../assets/concern.png">
  </div>
  <van-divider>———————————————————————</van-divider>
  <van-button  @Click="refresh" class="button" color="#808080" round="true">内容已看完 看看推荐></van-button>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"; 
const refresh = () => {
    location.reload() //直接刷新界面
};
</script>

<style lang="less" scoped>
.button{
  margin-left: 2.2rem;
}
.pic{
    width: 100%;
    /*background: #f2f2f2;*/
    display: flex;
    justify-content: center;
    align-items: center;

}
</style>