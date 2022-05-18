<template>
  <div>
    <van-popup
      v-model:show="show"
      position="right"
      round
      closeable
      :style="{ height: '100%', width: '50%' }"
    >
      <img class="pic" src="../../../assets/user/jjking.jpg" />
      <van-cell-group>
        <van-cell title="用户名" is-link value="jjking" />
        <van-cell title="简介" is-link  value="待完善" />
				<van-cell title="背景图" is-link value="去更换" />
        <van-cell title="性别"  is-link value="不展示" />
				<van-cell title="生日" is-link value="待完善" />
        <van-cell title="所在地" is-link value="待完善" />
      </van-cell-group>
    </van-popup>
  </div>
</template>>

<script setup lang="ts">
import { ref } from "vue";

const show = ref<boolean>(false);
defineExpose({
  show,
});
</script>

<style lang="less" scoped>
.pic {
  margin-top: 45px;
  margin-left: 60px;
  width: 80px;
  height: 80px;
}
</style>