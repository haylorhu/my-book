<template>
  <div class="rate">
    <span>☆☆☆☆☆</span>
    <div class="hollow" :style="style">★★★★★</div>

  </div>
</template>
<script>
// vue-tiny-rate
export default {
  props: {
    value: { type: [Number, String], default: "0" }
  },
  computed: {
    style() {
      return `width:${this.value*10}%`;
    }
  },
  mounted() {
       
  }
};
</script>
<style lang='less'>
.rate {
  position: relative;
  display: inline-block;
  color: rgb(254, 146, 146);
  left: 0;
  padding: 0;
  margin-block-end: 0;
  .hollow {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
    color: rgb(254, 146, 146);
    padding: 0;
    margin: 0;
  }
}
</style>


