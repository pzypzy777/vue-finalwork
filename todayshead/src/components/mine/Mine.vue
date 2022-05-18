<template>
  <NavBar class="home-navbar">
    <template v-slot:center>
      <div>我的头条</div>
    </template>
    <template v-slot:left>
      <van-icon class="scan" size="25px" name="scan" />
    </template>
    <template v-slot:right>
      <van-icon class="message" size="25px" name="envelop-o" />
      <van-icon class="setting" size="25px" name="setting-o" />
    </template>
  </NavBar>

  <div class="first">
    <div class="login">
      <div class="login-img">
        <img src="../../assets/user/jjking.jpg" />
      </div>
      <div class="login-title" @click="login" v-if="!state.isLogin">
        登录/注册
      </div>
      <div class="login-title" v-else>
        {{ state.user_name }}<a @click="personal" class="my">个人主页></a>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-item">
      <div class="card-item-count">{{ state.toutiao }}</div>
      <div class="card-item-name">头条</div>
    </div>
    <div class="card-item">
      <div class="card-item-count">{{ state.zan }}</div>
      <div class="card-item-name">获赞</div>
    </div>
    <div class="card-item">
      <div class="card-item-count">{{ state.fans }}</div>
      <div class="card-item-name">粉丝</div>
    </div>
    <div class="card-item">
      <div class="card-item-count">{{ state.follow }}</div>
      <div class="card-item-name">关注</div>
    </div>
  </div>
  <div class="second">
    <van-grid>
      <van-grid-item icon="bullhorn-o" icon-color="#ef3a41" text="消息通知" />
      <van-grid-item icon="star-o" icon-color="#ef3a41" text="收藏" />
      <van-grid-item icon="clock-o" icon-color="#ef3a41" text="浏览历史" />
      <van-grid-item icon="down" icon-color="#ef3a41" text="下载管理" />
    </van-grid>
  </div>

  <div class="third">
    <a>更多服务</a>
    <van-grid>
      <van-grid-item icon="flag-o" text="任务" />
      <van-grid-item icon="bill-o" text="钱包" />
      <van-grid-item icon="bag-o" text="订单" />
      <van-grid-item icon="service-o" text="客服中心" />
      <van-grid-item icon="good-job-o" text="点赞" />
      <van-grid-item icon="comment-o" text="评论" />
      <van-grid-item icon="closed-eye" text="隐私设置" />
      <van-grid-item icon="shield-o" text="安全中心" />
    </van-grid>
  </div>
  <Login ref="isShow" @on-Login="getIsLogin"></Login>
  <Personal ref="isShow2"></Personal>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item><img class="img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01cfed56c31feb32f875520f81e13e.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655465339&t=f6345403e01757e444c60f46bcd08133"></van-swipe-item>
    <van-swipe-item><img class="img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0131355642eeb16ac7259e0f500fbc.jpg%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655465339&t=4c66528e1e08f8d38b11b2e25a246a32"></van-swipe-item>
    <van-swipe-item><img class="img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F014a275542037d0000019ae94fe9e8.jpg%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655465469&t=8c8ced02cafb35e8b6a1db8134c9661c"></van-swipe-item>
    <van-swipe-item><img class="img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019968568f4e0432f87574be5814e0.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655465469&t=cce8866dbd913ac31b979f3c0c95b273"></van-swipe-item>
  </van-swipe>
</template>

<script setup lang="ts">
import NavBar from "../navbar/NavBar.vue";
import { reactive, ref } from "vue";
import Login from "../mine/mine-children/Login.vue";
import Personal from "../mine/mine-children/Personal.vue";
const state = reactive({
  follow: 0,
  fans: 0,
  toutiao: 0,
  zan: 0,
  isLogin: false,
  user_name: "",
});

const isShow = ref();
const login = () => {
  isShow.value.show = true;
};

const isShow2 = ref();
const personal = () => {
  isShow2.value.show = true;
};
//获取子组件传值
const getIsLogin = (
  isLogin: boolean,
  user_name: string,
  user_toutiao: number,
  user_zan: number,
  user_fans: number,
  user_follow: number
) => {
  state.isLogin = isLogin;
  state.user_name = user_name;
  state.follow = user_follow;
  state.fans = user_fans;
  state.zan = user_zan;
  state.toutiao = user_toutiao;
};
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  margin-top: 50px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
.img{
	width: 100%;
	height: 100%;
}
.my {
  margin-left: 100px;
  font-size: 20px;
}
.second {
  margin-top: 15px;
}
.third {
  margin-top: 25px;
}
.third a {
  margin-left: 10px;
  font-size: 17px;
}
.home-navbar {
  color: black;
}
.scan {
  margin-top: 8px;
  margin-left: 15px;
}
.message {
  margin-top: 8px;
  margin-right: 15px;
}
.setting {
  margin-top: 8px;
  margin-right: 8px;
}
.card {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;

  &-item {
    text-align: center;

    &-count {
      font-size: 18px;
      margin-bottom: 10px;
    }

    &-name {
      font-size: 14px;
      color: rgba(100, 100, 100, 0.8);
    }
  }
}

.login {
  display: flex;
  margin-top: 20px;
  font-family: "Times New Roman", Times, serif;

  // font-family: 'konshin';
  &-img {
    width: 40px;
    height: 40px;
    margin-left: 20px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 100px;
    }
  }

  &-title {
    font-size: 22px;
    margin-left: 60px;
    line-height: 60px;
    margin-top: 10px;
  }
}
</style>