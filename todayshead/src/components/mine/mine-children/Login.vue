<template>
  <div>
    <van-popup
      v-model:show="show"
      position="bottom"
      round
      closeable
      :style="{ height: '60%' }"
    >
      <div class="login">
        <div class="login-title">
          <img class="login-img" src="../../../assets/login/toutiao.svg" />
          <div class="login-tips">密码登录</div>
        </div>
        <div class="login-userid">
          <input
            type="text"
            name=""
            id=""
            placeholder="请输入账号"
            v-model="state.user_id"
          />
        </div>
        <div class="login-userpwd">
          <input
            type="password"
            name=""
            id=""
            placeholder="请输入密码"
            v-model="state.user_pwd"
          />
        </div>
        <div class="login-btn">
          <van-button
            @click="Login"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
          >
            登录
          </van-button>
        </div>
        <div class="types">
          <div class="types-img">
            <img src="../../../assets/login/toutiao.svg" />
          </div>
          <div class="types-img">
            <img src="../../../assets/login/douyin.svg" />
          </div>
          <div class="types-img">
            <img src="../../../assets/login/qq.svg" />
          </div>
          <div class="types-img">
            <img src="../../../assets/login/weixin.svg" />
          </div>
        </div>
        <div class="login-pass">
          <input
            type="radio"
            :checked="state.ischecked"
            @click="checkStatus"
            class="checkRadio"
          />
          已阅读并同意<span class="login-pass-span">《今日头条用户手册》</span
          >和<span class="login-pass-span">《隐私协议》</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>
  
<script setup lang='ts'>
import { Toast } from "vant";
import { reactive, ref } from "vue";

const state = reactive({
  ischecked: false,
  user_id: "",
  user_pwd: "",
  isLogin: false,
});

// 是否选中规则
const checkStatus = () => {
  state.ischecked = !state.ischecked;
};

const emit = defineEmits(["on-Login"]);

// 登录
const Login = () => {
  if (state.ischecked) {
    emit("on-Login", true, "jjking", 1, 12, 10, 21);
    show.value = false;
  } else {
    Toast("请先阅读并同意协议");
  }
};

// 给父组件暴露
const show = ref<boolean>(false);
defineExpose({
  show,
});
</script>
  
<style lang="less" scoped>
.login {
  &-title {
    display: flex;
  }
  &-tips {
    margin-top: 0.8rem;
    margin-left: 20px;
    font-size: 25px;
    font-weight: 700;
  }
  &-img {
    margin-top: 20px;
    margin-left: 2rem;
    margin-bottom: 20px;
    width: 70px;
    height: 70px;
  }

  &-userid {
    text-align: center;
    // margin-top: 50px;
    input {
      width: 290px;
      height: 50px;
      border-radius: 30px;
      border: 1px solid rgba(100, 100, 100, 0.5);
      padding-left: 20px;
    }
  }

  &-userpwd {
    text-align: center;
    margin-top: 20px;

    input {
      width: 290px;
      height: 50px;
      border-radius: 30px;
      border: 1px solid rgba(100, 100, 100, 0.5);
      padding-left: 20px;
    }
  }

  &-btn {
    text-align: center;
    margin-top: 20px;

    button {
      width: 310px;
      height: 50px;
      border-radius: 30px;
      border: 1px solid rgba(100, 100, 100, 0.5);
      color: white;
      background-color: #ef3a41;
    }
  }

  &-pass {
    font-size: 14px;
    color: rgba(100, 100, 100, 0.6);
    text-align: center;
    line-height: 20px;
    margin-top: 45px;

    &-span {
      color: black;
    }
  }
}

.checkRadio {
  width: 20px;
}

.types {
  display: flex;
  justify-content: space-around;
  margin-top: 70px;

  &-img {
    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>