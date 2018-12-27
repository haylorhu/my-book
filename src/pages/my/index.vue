<template>
  <div class="container">
    <section class="info">
      <button open-type="getUserInfo" lang="zh_CN" @click="doLogin">
        <img class="loginAvatar" :src="userInfo.avatarUrl">
        <h1 class="nickName">{{userInfo.nickName}}</h1>
      </button>
    </section>
    <section class="card"></section>
    <section class="addBook">
      <p class="scan" @click="scan">扫码添加图书</p>
      <input
        placeholder="输入isbn"
        class="input"
        placeholder-class="place"
        v-model="inputIsbn"
        type="text"
      >
      <button class="addByInput" @click="addBook(inputIsbn)">提交</button>
    </section>
  </div>
</template>

<script>
import qcloud from "wafer2-client-sdk";
import config from "../../config.js";
import { get, post } from "../../utils/http.js";
import { log } from "util";

export default {
  data() {
    return {
      userInfo: {
        avatarUrl: "../../../static/img/unlogin.png",
        nickName: "点击登录"
      },
      inputIsbn: NaN
    };
  },
  components: {},
  methods: {
    doLogin() {
      console.log(config.logUrl);

      qcloud.setLoginUrl(config.logUrl);
      const session = qcloud.Session.get();
      if (session) {
        qcloud.loginWithCode({
          success: res => {
            this.userInfo = res;
            this.logged = true;
            console.log(res);
            console.log(this.inputIsbn);

            this.inputIsbn = NaN;
          },
          fail: err => {
            console.error(err);
          }
        });
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            this.userInfo = res;
            this.logged = true;
            console.log(res);
          },
          fail: err => {
            console.error(err);
          }
        });
      }
    },
    scan() {
      wx.scanCode({
        success: res => {
          if (res.result) {
            this.addBook(res.result);
          }
        }
      });
    },
    async addBook(isbn) {
      console.log(this.openId);

      const res = await post("/weapp/addbook", {
        isbn,
        openid: this.userInfo.openId
      });
    }
  },

  created() {
    this.login;
  },
  mounted() {
    wx.login({
      success: res => {
        console.log(res);
        wx.getUserInfo({
          withCredentials: true,
          success: res => {
            console.log(res.userInfo);
            this.userInfo.avatarUrl = res.userInfo.avatarUrl
            this.userInfo.nickName = res.userInfo.nickName

          },
          fail: () => {},
          complete: () => {}
        });
      },
      fail: () => {},
      complete: () => {}
    });
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
