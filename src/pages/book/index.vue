<template>
  <div class="container">
    <div class="bookWiper">
      <showBook v-for="(book, index) in books" :key="index" :num="index" :book="book"></showBook>
    </div>
  </div>
</template>

<script>
import { get, post } from "../../utils/http.js";
import { log } from "util";
import showBook from "../../components/showBook";
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
    showBook
  },
  methods: {
    async getList() {
      const books = await get("/weapp/booklist");
      this.books = books.data.list;
    }
  },

  created() {},
  mounted() {
    this.getList();
  }
};
</script>

<style lang ='less' scoped>
.container {
  .bookWiper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
