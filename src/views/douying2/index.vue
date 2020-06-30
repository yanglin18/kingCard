<template>
  <div class="main_page">
    <div class="topButton" @click="navToForm()">
      <img
        v-if="flag"
        class="button1"
        src="../../assets/douyin2/button_l.png"
      />
      <img v-else class="button2" src="../../assets/douyin2/button_s.png" />
    </div>
    <div class="bottomButton" @click="navToForm()">
      <img src="../../assets/douyin2/button_f.png" />
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
    this.adid = this.getUrlParam("adid");
    this.creativeid = this.getUrlParam("creativeid");
    this.creativetype = this.getUrlParam("creativetype");
    this.clickid = this.getUrlParam("clickid");
  },
  methods: {
    getUrlParam(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    },
    navToForm() {
      console.log("fouce生效");
      this.$router.push({
        path: "./form",
        query: {
          itemcode: this.itemcode,
          adid: this.adid,
          creativeid: this.creativeid,
          creativetype: this.creativetype,
          clickid: this.clickid
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.main_page {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  background: url("../../../static/douying2.jpg") no-repeat center;
  background-size: 100% 100%;
  height: 1123px;
  width: 100%;

  .topButton {
    position: absolute;
    top: 491px;
    text-align: center;
    margin: 0 calc(50% - 157px);

    .button1 {
      width: 315px;
    }

    .button2 {
      width: 295px;
      margin-left: 10px;
    }
  }

  .bottomButton {
    position: fixed;
    max-width: 700px;
    bottom: 25px;
    width: 100vw;
    height: 65px;
    margin: 0 auto;
    text-align: center;

    img {
      width: 335px;
      height: 65px;
    }
  }
}
</style>
