<template>
  <div class="container" >
    <div class="nav">
      <p class="cancle" @click="goback">取消</p>
      <p class="submit" @click="submit">提交</p>
    </div>
    <div class="wiper">
      <input class="content" v-model="comment" placeholder="内容">
    </div>
  </div>
</template>
  <script>
import { get, post } from "../../utils/http.js";
import qcloud from "wafer2-client-sdk";

export default {
  data() {
    return {
      bookid: "",
      content: "",
      openid: "",
      comment: ""
    };
  },
  methods: {
    async submit() {
      const session = qcloud.Session.get();
      this.openid = session.userinfo.openId;
      let res = await post(`/weapp/addcommint`, {
        bookid: this.bookid,
        openid: this.openid,
        comment: this.comment
      });
      wx.showModal({
        title: '提示', //提示的标题,
        content: '添加成功', //提示的内容,
        showCancel: false, //是否显示取消按钮,
        cancelText: '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
        cancelColor: '#000000', //取消按钮的文字颜色,
        confirmText: '确定', 
        confirmColor: '#3CC51F', //确定按钮的文字颜色,
        success: res => {
          if (res.confirm) {
            console.log('用户点击确定')
            this.goback()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });
    },
    goback(){
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    }
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id;
  }
};
</script>
  <style scoped lang='less'>
.nav {
  display: flex;
  justify-content: space-between;
  margin-top: 50rpx;
  padding-bottom: 20rpx;
  font-weight: 900;
  font-size: 0.85em;
  border-bottom: 1px solid rgb(175, 175, 175);
  .cancle {
    padding-left: 20rpx;
  }
  .submit {
    color: rgb(30, 211, 84);
    padding-right: 20rpx;
  }
}
.wiper {
  margin: 10rpx;
}
.title {
  border-bottom: 1px solid rgb(179, 179, 179);
}
.content {
  height: 5em;
}
</style>