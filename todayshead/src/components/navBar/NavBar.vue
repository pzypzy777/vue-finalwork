<template>
  <div class="navbar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.navbar {
  display: flex;
  height: 44px;
  line-height: 44px;
//   background-color: #ef3a41;
  box-shadow: 0px 1px 1px rgba(100, 100, 100, 0.08);
  font-size: 18px;
}
.left{
  width: 80px;
  line-height: 44px;
  align-items: center;
}
.right {
  width: 80px;
  line-height: 44px;
  align-items: center;
}
.center {
  flex: 1;
  text-align: center;
}
</style>
