<template>
  <div>
    <NavBar class="home-navbar">
      <template v-slot:center>
        <div>今日头条</div>
      </template>
      <template v-slot:right>
        <van-icon class="search" @click="toSearch" size="25px" name="search" />
      </template>
    </NavBar>
    <Tab></Tab>
  </div>
</template>

<script setup lang="ts">
import NavBar from "../navbar/NavBar.vue";
import Tab from "./home-children/Tab.vue"
import router from "../../router/index"
const toSearch = () => {
	router.push('Search')
}
</script>

<style lang="less" scoped>
.home-navbar {
  background-color: #ef3a41;
  color: white;
}
.search{
  margin-top: 8px;
  margin-left: 40px;
}
</style>
