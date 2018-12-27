<template>
  <div class="containerWiper">
    <div class="container" :style="style"></div>
    <img :src="bookInfo.image" class="detailImage" mode="scaleToFill" alt>
    <div class="info">
      <div class="wiper">
        <Star :value="bookInfo.rate"></Star>
        <h1 class="rate">{{bookInfo.rate}}</h1>
      </div>
      <p class="title">{{bookInfo.title}}</p>
      <p class="auth">{{bookInfo.author}}</p>
    </div>
    <div class="introduce">
      <p class="intro">书籍简介</p>
      <p class="introduceText">{{bookInfo.summary}}</p>
    </div>
  </div>
</template>
  <script>
import { get, post } from "../../utils/http.js";
import Star from "../../components/star";
export default {
  components: {
    Star
  },
  data() {
    return {
      bookInfo: {},
      color: ""
    };
  },
  methods: {
    async getDetail() {
      let bookid = this.$root.$mp.query.id;
      this.color = this.$root.$mp.query.color.slice(11);
      console.log(bookid);
      const info = await get("/weapp/bookId", { id: bookid });
      this.bookInfo = info.data.list[0];
      console.log(this.bookInfo);
      console.log(this.color);
    }
  },
  computed: {
    style() {
      return `background: linear-gradient(180deg,${this.color} 0, ${
        this.color
      } 50%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)`;
    }
  },
  mounted() {
    this.getDetail();
  },
  created() {}
};
</script>
  <style scoped lang='less'>
.containerWiper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  .container {
    width: 100%;
    height: 400rpx;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: -1;
    top: 0;
  }
  .detailImage {
    height: 550rpx;
    width:392rpx;

    z-index: 2;
    position: relative;
    margin: 50rpx auto;
    box-shadow: 20rpx 20rpx 69rpx 15rpx rgba(0, 0, 0, 0.2);
  }
  .info {
    display: flex;
    justify-content: center;
    justify-items: center;
    flex-direction: column;
    margin: 0 auto;
    .wiper {
      display: flex;
      justify-content: center;
      justify-items: center;

      text-align: center;

      .rate {
        display: inline;
        width: auto;
      }
    }

    .title {
      margin: 20rpx 0  0 0;
      display: inline;
    }
    .auth {
      display: inline-block;
      margin: 10rpx auto;
      color: rgb(138, 138, 138);
      font-size: 0.85em;
    }

  }   
  .introduce{
    margin: 0 20rpx;
  }
  .intro{
      margin:50rpx 0 20rpx 0 ;

    }
    .introduceText{
      color: rgb(85, 85, 85);
    }
}
</style>