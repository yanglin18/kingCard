<template>
  <div class="main_page">
    <div class="topButton" @click="navToForm()">
      <img v-if="flag" class="button1" src="../assets/button_l.png" />
      <img v-else class="button2" src="../assets/button_s.png" />
    </div>
    <div class="bottomButton" @click="navToForm()">
      <img src="../assets/button_f.png" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: true,
      itemcode:''
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
      this.$router.push({ path: "/form?itemcode="+this.itemcode });
    }
  }
};
</script>
<style lang="scss" scoped>
.main_page {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  background: url("../../static/bg.jpg") no-repeat center;
  background-size: 100% 100%;
  height: 1042px;
  width: 100%;
  .topButton {
    position: absolute;
    top: 396px;
    text-align: center;
    margin-left: calc(50% - 125px);
    .button1 {
      width: 250px;
    }
    .button2 {
      width: 218px;
      margin-left: 16px;
    }
  }
  .bottomButton {
    position: fixed;
    max-width: 700px;
    bottom: 0px;
    width: 100%;
    height: 120px;
    img {
      width: 100%;
    }
  }
}
</style>
