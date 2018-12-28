<template>
  <div class="commit">
    <div
      class="commitItem"
      v-for="(comment, index) in comments"
      v-if="index == (comments.length-1)"
      :key="index"
    >{{comment.comment}}</div>
  </div>
</template>
  <script>
import { get, post } from "../utils/http.js";

export default {
  props: {
    id: ""
  },
  data() {
    return {
      comments: []
    };
  },

  methods: {
    async getCommit() {
      const info = await get("/weapp/getCommitbyBookId", { bookid: this.id });
      this.comments = info.data.comment;
      console.log(this.comments[this.comments.length]);
    }
  },
  mounted() {
    this.getCommit();
  }
};
</script>
  <style scoped lang='less'>
.commit {
  display: inline-block;
  margin: 20rpx auto 0 auto;
  min-height: 200rpx;

}
</style>
