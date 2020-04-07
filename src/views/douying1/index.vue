<template>
  <div class="main_page">
    <div class="topButton" @click="navToForm()">
      <img v-if="flag" class="button1" src="../../assets/douyin1/button_l.png" />
      <img v-else class="button2" src="../../assets/douyin1/button_s.png" />
    </div>
    <div class="bottomButton" @click="navToForm()">
      <img src="../../assets/douyin1/button_f.png" />
    </div>
  </div>
</template>
<script>
  export default {
    data()
    {
      return {
        flag: true,
        itemcode: "",
        adid: '',
        creativeid: '',
        creativetype: '',
        clickid: ''
      };
    },
    mounted()
    {
      let timer = setInterval(() =>
      {
        this.flag = !this.flag;
      }, 300);
      this.itemcode = this.$route.query.itemcode;
      this.adid = this.getUrlParam('adid');
      this.creativeid = this.getUrlParam('creativeid');
      this.creativetype = this.getUrlParam('creativetype');
      this.clickid = this.getUrlParam('clickid');

      console.log("首页输出数据", this.itemcode, this.adid, this.creativetype, this.clickid, this.creativeid);
    },
    methods: {
      getUrlParam(name)
      {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
      },
      navToForm()
      {
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
    background: url("../../../static/douying1.jpg") no-repeat center;
    background-size: 100% 100%;
    height: 1061px;
    width: 100%;

    .topButton {
      position: absolute;
      top: 425px;
      text-align: center;
      margin: 0 calc(50% - 153px);

      .button1 {
        width: 306px;
      }

      .button2 {
        width: 275px;
        margin-left: 20px;
      }
    }

    .bottomButton {
      position: fixed;
      max-width: 700px;
      bottom: 0px;
      width: 100vw;
      // height: 110px;
      margin: 0 auto;
      text-align: center;

      img {
        display: block;
        width: 100vw;
        height: 100%;
        max-width: 700px;
      }
    }
  }
</style>