<template>
  <div>
    <div class="tab-bar">
      <div class="tab-bar-item" @click="itemClick('/home')">
        <div v-if="!isActive('/home')">
          <img src="../../assets/tabbar/home.svg" alt="" />
        </div>
        <div v-else><img src="../../assets/tabbar/home-active.svg" alt="" /></div>
        <div :class="{ active: isActive('/home') }">首页</div>
      </div>
      <div class="tab-bar-item" @click="itemClick('/video')">
        <div v-if="!isActive('/video')">
          <img src="../../assets/tabbar/video.svg" alt="" />
        </div>
        <div v-else><img src="../../assets/tabbar/video-active.svg" alt="" /></div>
        <div :class="{ active: isActive('/video') }">视频</div>
      </div>
      <div class="tab-bar-item" @click="itemClick('/show')">
        <div v-if="!isActive('/show')">
          <img src="../../assets/tabbar/show.svg" alt="" />
        </div>
        <div v-else><img src="../../assets/tabbar/show-active.svg" alt="" /></div>
        <div :class="{ active: isActive('/show') }">放映厅</div>
      </div>
      <div class="tab-bar-item" @click="itemClick('/mine')">
        <div v-if="!isActive('/mine')">
          <img src="../../assets/tabbar/mine.svg" alt="" />
        </div>
        <div v-else><img src="../../assets/tabbar/mine-active.svg" alt="" /></div>
        <div :class="{ active: isActive('/mine') }">我的</div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();


const itemClick = (path: string) => {
  router.replace(path);
};

const isActive = computed(() => {
  return function (path: string) {
    return router.currentRoute.value.path.indexOf(path) !== -1;
  };

});
</script>

<style lang="less" scoped>
.tab-bar {
  z-index: 999;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px -1px 1px rgba(100, 100, 100, 0.08);
  font-size: 12px;
  color: #8a8a8a;
  background-color: white;

  &-item {
    flex: 1;
    text-align: center;
    height: 49px;

    img {
      width: 24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
      margin-bottom: 4px;
    }
  }
}

.active {
  color: #ef3a41;
}
</style>
