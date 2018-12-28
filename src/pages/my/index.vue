<template>
  <div class="container">
    <section class="info">
      <button open-type="getUserInfo" lang="zh_CN" @click="doLogin">
        <img class="loginAvatar" :src="userInfo.avatarUrl">
        <h1 class="nickName">{{userInfo.nickName}}</h1>
      </button>
    </section>
    <section class="card">登录后可添加图书</section>
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
      console.log(this.userInfo.openId);
      if (!this.userInfo.openId) {
        wx.showModal({
          title: '提示', //提示的标题,
          content: '请登录后操作', //提示的内容,
          showCancel: false, //是否显示取消按钮,
          cancelText: '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
          cancelColor: '#000000', //取消按钮的文字颜色,
          confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: '#3CC51F', //确定按钮的文字颜色,
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        });
     
      }

      const res = await post("/weapp/addbook", {
        isbn,
        openid: this.userInfo.openId
      });
      if (!res.code){
              wx.showModal({
          title: '提示', //提示的标题,
          content: '添加成功', //提示的内容,
          showCancel: false, //是否显示取消按钮,
          cancelText: '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
          cancelColor: '#000000', //取消按钮的文字颜色,
          confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: '#3CC51F', //确定按钮的文字颜色,
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        });
      }else{
                      wx.showModal({
          title: '提示', //提示的标题,
          content: '添加失败', //提示的内容,
          showCancel: false, //是否显示取消按钮,
          cancelText: '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
          cancelColor: '#000000', //取消按钮的文字颜色,
          confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: '#3CC51F', //确定按钮的文字颜色,
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        });
      }

    }
  },

  created() {
    this.login;
  },
  mounted() {

  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
.card {
  color: white;
  text-align: center;
  padding: 10rpx 0;
}
</style>
