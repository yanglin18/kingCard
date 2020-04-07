<template>
  <div class="main_page">
    <div class="topButton" @click="navToForm()">
      <img
        v-if="flag"
        class="button1"
        src="../../assets/kuaishou/button_l.png"
      />
      <img v-else class="button2" src="../../assets/kuaishou/button_s.png" />
    </div>
    <div class="bottomButton" @click="navToForm()">
      <img src="../../assets/kuaishou/button_f.png" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: true,
      itemcode: ""
    };
  },
  mounted() {
    let timer = setInterval(() => {
      this.flag = !this.flag;
    }, 300);
    this.itemcode = this.$route.query.itemcode;
  },
  methods: {
    navToForm() {
      console.log("fouce生效");
      this.$router.push({ path: "./form", query: { itemcode: this.itemcode } });
    }
  }
};
</script>
<style lang="scss" scoped>
.main_page {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  background: url("../../../static/bgKS.jpg") no-repeat center;
  background-size: 100% 100%;
  height: 1127px;
  width: 100%;
  .topButton {
    position: absolute;
    top: 492px;
    text-align: center;
    margin-left: calc(50% - 157px);
    .button1 {
      width: 314px;
    }
    .button2 {
      width: 295px;
      margin-left: 10px;
    }
  }
  .bottomButton {
    position: fixed;
    max-width: 700px;
    bottom: 0px;
    width: 100%;
    height: 95px;
    margin: 0 auto;
    text-align: center;
    img {
      width: 335px;
      height: 65px;
    }
  }
}
</style>
