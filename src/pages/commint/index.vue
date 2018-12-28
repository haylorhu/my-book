<template>
  <div class="container">
    <div  class="books" v-for="(book, index) in books" :key="index" :num="index">

        <div class="bookWiper">
          <img class="img" :src="book.image" alt>
          <div class="info">
            <p class="title">{{book.title}}</p>
            <div>
              <Star :value="book.rate" :key="index"></Star>
            </div>
            <p class="auther">{{book.author}}</p>
          </div>
        </div>
        <div class="hr"></div>
        <Commit :id="book.id"></Commit>

    </div>
  </div>
</template>

<script>
import { get, post } from "../../utils/http.js";
import { log } from "util";
import showBook from "../../components/showBook";
import Star from "../../components/star";
import Commit from "../../components/Commit";
export default {
  data() {
    return {
      books: [],
      page: 0,
      more: true,
      tops: []
    };
  },
  components: {
    showBook,
    Star,
    Commit
  },
  methods: {
    async getList() {
      const books = await get("/weapp/booklist");
      this.books = books.data.list;
      console.log(this.books);
    },
    toDetail(id){
      console.log(id);
      wx.navigateTo({ url: "/pages/bookdetail/main?id="+id});
    }
    ,
  },

  created() {},
  mounted() {
    this.getList();
  }
};
</script>

<style lang ='less' scoped>
@import "../../style/color.less";
.hr {
  margin-top: 20rpx;
  border-top: 1px solid rgb(219, 219, 219);
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  .books {
    .bookWiper {
      display: flex;
      margin: 0 auto;
    }
    margin: 20rpx;
    flex-direction: column;
    display: flex;
    justify-content: center;
    justify-items: center;
    .img {
      width: 80rpx;
      height: 120rpx;
    }
    .info {
      display: flex;
      flex-direction: column;
      margin-left: 50rpx;
      justify-content: left;
      .title {
        display: inline-block;
        width: auto;
        font-size: 0.7em;
        max-width: 300rpx;
      }
      .auther {
        display: inline-block;

        width: auto;
        font-size: 0.7em;
        max-width: 300rpx;
      }
    }
  }
}
</style>
