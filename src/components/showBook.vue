<template>
  <a :href="detileUrl">
    <div class="wiper" @click="toDetail">
      <div class="bg" :style="color">
        <img :src="book.image" mode="aspectFit" class="img">
      </div>
      <div class="bookInfo">
        <div class="star">★ {{book.rate}}</div>
 
        <p class="title">{{book.title}}</p>
        <p class="auth">{{book.author}}</p>
      </div>
    </div>
  </a>
</template>
  <script>
export default {
  props: {
    num: "",
    book: {}
  },

  computed: {
    color() {
      let color = this.num % 4;
      console.log(color);

      if (color === 0) {
        return "background: rgb(235,157,191)";
      }
      if (color === 1) {
        return "background:rgb(232,206,149)";
      }
      if (color === 2) {
        return "background:rgb(108,206,233)";
      }
      if (color === 3) {
        return "background:rgb(109,218,181)";
      }
    },
    detileUrl() {
      return "/pages/bookdetail/main?id=" + this.book.id+"&&color="+this.color;
    }
  },
  methods: {
    async detail() {
      const books = await get("/weapp/bookId");
    }
  },
  mounted() {
    console.log(this.book);
  }
};
</script>
<style scoped lang='less'>
.bg {
  position: relative;
  width: 240rpx;
  height: 300rpx;
  margin: 50rpx;
  box-shadow: 20rpx 20rpx 69rpx 15rpx rgba(0, 0, 0, 0.2);
  .img {
    width: 240rpx;
    height: 318rpx;
    position: absolute;
    left: 20rpx;
    top: 24rpx;
    margin-button: 50rpx;
  }
}
.bookInfo {
  font-size: 25rpx;
  margin-left: 70rpx;
  margin-top: 106rpx;
  width: 245rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  z-index: 2;
  .star {
    color: white;
    background-color: rgb(254, 146, 146);
    margin-bottom: 10rpx;
    display: inline-block;

    padding: 0 9rpx;
    border-radius: 5rpx;
    z-index: 10;
    position: relative;
    min-width: 70rpx;
  }
  .title {
    margin: 20rpx 0 10rpx 0;
    width: 245rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    z-index: 2;
  }
  .auth {
    color: rgb(146, 145, 145);
    width: 245rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    z-index: 2;
  }
}
</style>