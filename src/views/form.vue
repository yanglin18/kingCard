<template>
  <div class="mainPage">
    <loading v-if="Loading"></loading>
    <!-- 遮罩 -->
    <div class="shade" v-if="$store.state.showChooseNumber || requestFail || applySuccess"></div>
    <!-- 请求失败的弹窗 -->
    <div v-if="requestFail" class="shadowTextWrap">{{ message }}</div>
    <div class="content">
      <placeSelect @getName="reSelectPlace"></placeSelect>
      <numberWrap @getNumberPlace="reSelectNumberPlace"></numberWrap>
      <chooseNumber @number="getSelectNumber"></chooseNumber>
      <div v-if="$store.state.showSelectPlace || $store.state.showSelectNumPlace" class="place_shade"></div>
      <!-- 申请成功弹窗 -->
      <div v-if="applySuccess" class="applySuccess">
        <div class="apply_content">
          <div class="apply_title"><span>下单成功！</span></div>
          <div class="apply_text">
            我们将尽快为你配送，请收到卡后的10天内激活使用，过期将会被回收哦！
            <span>请您注意接收陌生号码的短信或来电哦～</span>
          </div>
        </div>
        <div class="close" @click="closeToast()">
          <img src="../assets/close.png" />
        </div>
      </div>
      <!-- 身份验证失败弹窗 -->
      <div v-if="comformFail" class="comformFail">
        <span>您的身份证信息未在公安系统登记，请您核对或更换证件信息。</span>
        <div class="close" onclick="closecomform()">
          <img src="../assets/close.png" />
        </div>
      </div>
      <div class="top_title">
        已选择<span class="selectIndex">腾讯大王卡</span>
      </div>
      <div class="top_title" :class="showRed > 0 ? 'turnRed' : ''">
        {{ Toast }}
      </div>
      <div class="form">
        <div :class="showRed === 1 ? 'redBorder' : ''" ref="name">
          <span>姓名</span>
          <input v-model="form.name" placeholder="请输入身份证件姓名" /><br />
        </div>
        <div :class="showRed === 2 ? 'redBorder' : ''" ref="idCard">
          <span>身份证</span>
          <input v-model="form.certNo" placeholder="请输入身份证号" /><br />
        </div>
        <div :class="showRed === 3 ? 'redBorder' : ''">
          <span>联系电话</span>
          <input v-model="form.mobile" placeholder="请输入联系电话" />
        </div>
        <div :class="showRed === 4 ? 'redBorder' : ''">
          <span>验证码</span>
          <input v-model="form.code" placeholder="请输入验证码" />
          <button v-if="haveSend" class="havesend">
            {{ secend }}s后重新获取
          </button>
          <button v-else class="getcode" @click="getCode()">
            获取验证码
          </button>
        </div>
      </div>
      <div class="top_title title_bold">
        请填写配送地址<span class="red_text">（支持全国配送，新疆、西藏仅限省内配送）</span>
      </div>
      <div class="form">
        <div class="Box" :class="showRed === 5 ? 'redBorder' : ''" @click="selectPlace">
          <span>所在地区</span>
          <div class="inputDiv">
            <span :class="select_place == '所在区/县' ? '' : 'selected'">{{
              select_place
            }}</span>
          </div>
          <img src="../assets/toRight.png" />
        </div>
        <div :class="showRed === 6 ? 'redBorder' : ''">
          <input v-model="form.address" placeholder="街道/镇+村/小区/写字楼+门牌号" />
        </div>
      </div>
      <div class="top_title title_bold">请选择号码</div>
      <div class="form">
        <div class="Box" @click="selectNumberPlace">
          <span>号码归属</span>
          <div class="inputDiv">
            <span :class="select_place == '所在区/县' ? '' : 'selected'">{{
              number_place
            }}</span>
          </div>
          <img src="../assets/toRight.png" />
        </div>
        <div class="Box" @click="selectNumber" :class="showRed === 7 ? 'redBorder' : ''">
          <span>选择号码</span>
          <div class="inputDiv">
            <span class="selected">{{ form.phoneNum }}</span>
          </div>
          <img src="../assets/toRight.png" />
        </div>
      </div>
      <div class="agree" :class="showRed === 9 ? 'redBorder' : ''">
        <div class="agreement">
          <img v-if="!userAgree" @click="agree" src="../assets/no_check.png" alt="" />
          <img v-else @click="agree" src="../assets/check.png" alt="" />
          <div class="agree_text">
            我已阅读并同意<a @click="toagree('/agree1')">《客户入网服务协议及业务协议》</a>、<a
              @click="toUserAgreement">《关于客户个人信息收集、使用规则的公告》</a>、<a @click="toagree('/agree3')">《隐私政策》</a>、<a
              @click="toagree('/agree4')">《用户使用协议》</a>
          </div>
        </div>
        <div class="explain">
          国际/港澳台漫游和国际/港澳台长途功能将于号码激活时同步生效
        </div>
      </div>
      <div class="reference">
        <img v-if="!referFlag" @click="addRefer" src="../assets/no_check.png" alt="" />
        <img v-else @click="addRefer" src="../assets/check.png" alt="" />
        <span>推荐人信息</span>
        <input v-model="form.recommend" v-show="referFlag" placeholder="请填写推荐人号码" />
      </div>
      <div class="commit">
        <button class="commit_button" @click="commit">
          立即提交，免费送货上门
        </button>
      </div>
      <div class="bottom_text">
        <span>请保持联系号码畅通，我们可能随时与您联系。本次为阶段性优惠活动，数量有限，联系电话无人接听或恶意下单情况，将不予发货。
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import placeSelect from "@/views/components/placeSelect";
  import numberWrap from "@/views/components/numberWrap";
  import chooseNumber from "@/views/components/chooseNumber";
  import loading from "@/views/components/load";
  export default {
    components: {
      placeSelect,
      numberWrap,
      chooseNumber,
      loading
    },
    data()
    {
      return {
        comformFail: false,
        applySuccess: false,
        showSelectFlag: false,
        select_place: "所在区/县",
        number_place: "请选择号码归属",
        Toast: "根据国家实名制要求，请准确提供身份证信息",
        // 请求失败的弹窗
        requestFail: false,
        Loading: false,
        message: "",
        userAgree: false,
        showRed: 0,
        haveSend: false,
        referFlag: false,
        secend: 60,
        form: {
          itemcode: "",
          goodsId: "981610241535",
          p_code: "",
          c_code: "",
          phoneNum: "",
          name: "",
          certNo: "",
          mobile: "",
          p_p_code: "",
          p_c_code: "",
          p_d_code: "",
          code: "",
          address: "",
          recommend: ""
        },
        // 数据埋点数据
        adid: '',
        creativeid: '',
        creativetype: '',
        clickid: ''
      };
    },
    computed: {
      selectPhoneNum()
      {
        return this.form.phoneNum;
      }
    },
    watch: {
      select_place(old)
      {
        if (this.select_place !== "所在区/县") {
          this.showRed = 0;
          this.Toast = "根据国家实名制要求，请准确提供身份证信息";
        }
      },
      selectPhoneNum(old)
      {
        console.log(this.selectPhoneNum);
        if (this.phoneNum !== "") {
          this.showRed = 0;
          this.Toast = "根据国家实名制要求，请准确提供身份证信息";
        }
      }
    },
    mounted()
    {
      let inputs = document.querySelectorAll("input");
      for (let i of inputs) {
        i.addEventListener("focus", () =>
        {
          this.showRed = 0;
          this.Toast = "根据国家实名制要求，请准确提供身份证信息";
        });
      }
      this.form.itemcode = this.$route.query.itemcode;
      this.adid = this.getUrlParam('adid');
      this.creativeid = this.getUrlParam('creativeid');
      this.creativetype = this.getUrlParam('creativetype');
      this.clickid = this.getUrlParam('clickid');

      console.log("form", this.form.itemcode, this.adid, this.creativeid, this.creativetype, this.clickid);
    },
    methods: {
      getUrlParam(name)
      {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
      },
      toUserAgreement()
      {
        console.log("1111111111111111", this.form.name);
        this.$router.push({
          path: "/agree2",
          query: {
            name: this.form.name,
            phone: this.form.mobile
          }
        });
      },
      toagree(e)
      {
        this.$router.push({
          path: e
        });
      },
      selectPlace()
      {
        this.$store.commit("set_showSelectPlace", 1);
      },
      selectNumberPlace()
      {
        if (this.select_place === "所在区/县") {
          (this.Toast = "请先选择所在地区"), (this.showRed = 5);
          return;
        }
        this.$store.commit("set_showSelectNumPlace", 1);
      },
      selectNumber()
      {
        if (this.select_place === "所在区/县") {
          (this.Toast = "请先选择所在地区"), (this.showRed = 5);
          return;
        }
        this.$store.commit("set_showChooseNumber", 1);
      },
      // 接收组件返回信息
      reSelectPlace(e)
      {
        this.select_place = e.select_name;
        this.form.p_p_code = e.p_id;
        this.form.p_c_code = e.c_id;
        this.form.p_d_code = e.d_id;
        this.form.p_code = e.p_id;
        this.form.c_code = e.c_id;
        this.number_place = e.number_place;
      },
      reSelectNumberPlace(e)
      {
        console.log("返回", e);
        this.number_place = e.select_name;
        this.form.p_code = e.p_id;
        this.form.c_code = e.c_id;
      },
      getSelectNumber(e)
      {
        this.form.phoneNum = e;
      },
      agree()
      {
        this.userAgree = !this.userAgree;
        if (this.userAgree) {
          this.showRed = 0;
          this.Toast = "根据国家实名制要求，请准确提供身份证信息";
        }
      },
      addRefer()
      {
        this.referFlag = !this.referFlag;
      },
      // 获取验证码
      getCode()
      {
        // this.conform();
        let phoneRex = /^1[3456789]\d{9}$/;
        let IDcardRex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (this.form.mobile === "") {
          this.Toast = "请输入您的联系电话";
          this.showRed = 3;
          return;
        }
        if (!phoneRex.test(this.form.mobile)) {
          this.Toast = "请输入正确的手机号";
          this.showRed = 3;
          return;
        }
        if (!IDcardRex.test(this.form.certNo)) {
          this.Toast = "请输入正确的身份证";
          this.showRed = 2;
          return;
        }
        this.$axios({
          url:
            "https://simcard.houselai.com/public/index.php/member/Index/getCode",
          method: "post",
          data: this.$qs.stringify({
            mobile: this.form.mobile,
            certNo: this.form.certNo
          })
        })
          .then(res =>
          {
            if (res.data.code == 0) {
              this.haveSend = true;
              let ss = 60;
              let timer = setInterval(e =>
              {
                ss--;
                this.secend = ss;
                if (ss === 0) {
                  clearInterval(timer);
                  this.haveSend = false;
                }
              }, 1000);
            }
            if(res.data.code == 90){
              this.requestFail = true;
              this.message = res.data.msg;
              setTimeout(() =>
              {
                this.requestFail = false;
              }, 3000);
            }
          })
          .catch({});
      },
      nameInvalid()
      {
        console.log("22222222222");
      },
      closeToast()
      {
        this.applySuccess = false;
      },
      commit()
      {
        let nameRex = /^[\u4E00-\u9FA5]{2,4}$/;
        let phoneRex = /^1[3456789]\d{9}$/;
        let IDcardRex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (!nameRex.test(this.form.name)) {
          this.Toast = "请输入您的真实姓名";
          this.showRed = 1;
          this.scrollTop =
            this.$refs.name.offsetTop - this.$refs.name.offsetHeight;
          window.scrollTo({
            top: this.scrollTop
          });
          return;
        }
        if (this.form.certNo === "") {
          this.Toast = "请输入您的身份证";
          this.showRed = 2;
          let scrollTop =
            this.$refs.idCard.offsetTop - this.$refs.idCard.offsetHeight;
          window.scrollTo({
            top: scrollTop
          });
          return;
        }
        if (!IDcardRex.test(this.form.certNo)) {
          this.Toast = "请输入正确的身份证";
          this.showRed = 2;
          return;
        }
        if (this.form.mobile === "") {
          this.Toast = "请输入您的联系电话";
          this.showRed = 3;
          return;
        }
        if (!phoneRex.test(this.form.mobile)) {
          this.Toast = "请输入正确的手机号";
          this.showRed = 3;
          return;
        }
        if (this.form.code === "") {
          this.Toast = "请输入验证码";
          this.showRed = 4;
          return;
        }
        if (this.select_place === "所在区/县") {
          this.Toast = "请选择配送地址的所在地区";
          this.showRed = 5;
          return;
        }

        if (this.form.address === "") {
          this.Toast = "请输入详细地址";
          this.showRed = 6;
          return;
        }
        if (this.form.address.length < 4) {
          this.Toast = "详细地址不得少于四个字";
          this.showRed = 6;
          return;
        }
        if (this.form.phoneNum === "") {
          this.Toast = "请选择手机号";
          this.showRed = 7;
          return;
        }
        if (!this.userAgree) {
          this.Toast = "请阅读并同意接受用户协议";
          this.showRed = 9;
          return;
        }
        if (this.referFlag && this.form.recommend === "") {
          this.Toast = "请输入推荐人号码";
          this.showRed = 8;
          return;
        }
        this.Loading = true;
        this.$axios({
          method: "post",
          url:
            "https://simcard.houselai.com/public/index.php/member/index/create_order",
          data: this.$qs.stringify(this.form)
        })
          .then(response =>
          {
            this.Loading = false;
            if (response.data.code == 0) {
              _ks_trace.push({
                event: 'form', convertId: 22562, cb: function ()
                {
                  console.log('Your callback function here!')
                }
              })
              
              // this.conform()
              this.applySuccess = true;
              this.Toast = "根据国家实名制要求，请准确提供身份证信息";
              this.showRed = 0;
            } else {
              this.requestFail = true;
              this.message = response.data.msg;
              setTimeout(() =>
              {
                this.requestFail = false;
              }, 3000);
            }
          })
          .catch(err =>
          {
            this.Loading = false;
          });
      },
      conform()
      {
        let Url = "https://dysimcard.houselai.com?itemcode=" + this.form.itemcode + "&adid=" + this.adid + "&clickid=" + this.clickid + "&creativeid=" + this.creativeid + "&creativetype=" + this.creativetype + ""
        this.$axios({
          method: "get",
          url: "https://ad.toutiao.com/track/activate/?link=" + encodeURIComponent(Url) + "&event_type=3"
        })
          .then((res) =>
          {
            console.log("数据埋点成功")
          })
          .catch((error) =>
          {
            console.log(error)
          })
      }
    }
  };
</script>
<style lang="scss" scoped>
  /* // 申请成功 */
  .applySuccess,
  .comformFail {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    z-index: 5;

    .apply_content {
      background: #ffffff;
      border-radius: 4px;
      width: 315px;
      padding: 20px 15px 25px;

      .apply_title {
        font-size: 20px;
        color: #1694fb;
        letter-spacing: 0;
        text-align: center;
      }

      .apply_text {
        font-size: 15px;
        color: #666666;
        letter-spacing: 0;
        text-align: center;
        line-height: 23px;

        span {
          color: #1694fb;
        }
      }
    }

    .close {
      margin-top: 20px;
      text-align: center;

      img {
        width: 26px;
        height: 26px;
      }
    }
  }

  // 定位
  .place_shade {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1500;
  }

  /* 遮罩 */
  .shade {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.7);
  }

  /* // input 的placeholder */
  ::-webkit-input-placeholder {
    font-size: 13px;
    color: #bbbbbb;
    letter-spacing: 0;
    z-index: inherit;
  }

  // 异常吐司
  .shadowTextWrap {
    position: fixed;
    left: 50%;
    top: 50%;
    min-width: 60%;
    max-width: 100%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 10px;
    border-radius: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);
  }

  .mainPage {
    background: #f8f8f8;
    max-width: 700px;
    margin: 0 auto;

    .content {
      min-height: 100vh;
      width: 100%;
      padding: 15px 0;
      z-index: 0;

      .top_title {
        font-size: 13px;
        padding-bottom: 10px;
        color: #666666;
        letter-spacing: 0;
        font-weight: 600;
        padding-left: 15px;

        span {
          color: #1694fb;
        }

        .red_text {
          color: #d91b11;
          font-size: 12px;
          font-weight: normal;
        }
      }

      .title_bold {
        padding: 15px 0 10px 15px;
      }

      .turnRed {
        color: #d91b11;
      }

      .form {
        background: #f2f2f2;
        color: #666666;
        font-size: 13px;

        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1px;
          // border-bottom: #f8f8f8 1px solid;
          padding: 0 15px;
          box-sizing: border-box;
          border: 1px solid #fff;
          background: #fff;
        }

        .redBorder {
          border: 1px solid #d04a43;
        }

        input {
          flex: 1;
          height: 45px;
          border: 0px;
          color: #666666;
          font-size: 13px;
        }

        span {
          display: inline-block;
          min-width: 82px;
        }

        /* 验证码 */
        .getcode {
          padding: 7px 10px;
          background: #1694fb;
          border-radius: 3px;
          height: 36px;
          font-size: 13px;
          color: #ffffff;
          letter-spacing: 0;
          border: none;
        }

        .havesend {
          padding: 7px 10px;
          background: #bababa;
          border-radius: 3px;
          height: 36px;
          font-size: 13px;
          color: #ffffff;
          letter-spacing: 0;
          border: none;
          white-space: nowrap;
        }

        .Box {
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          div {}

          img {
            height: 17px;
            width: 9px;
          }

          .inputDiv {
            height: 99%;
            flex: 1;
            border: none;
            padding: 0;
            color: #666666;

            span {
              font-size: 13px;
              color: #bbbbbb;
              letter-spacing: 0;
              width: 65.5vw;
              display: inline-block;
            }

            .selected {
              color: #666666;
            }
          }
        }
      }

      .agree {
        padding: 15px 13px;
        margin: 10px 0;
        background: #ffffff;
        font-size: 12px;
        color: #999999;
        border: 1px #ffffff solid;

        .agreement {
          margin-bottom: 8px;
          display: flex;
          align-items: center;
        }

        img {
          height: 14px;
          width: 14px;
          padding-right: 6px;
          min-width: 14px;
        }

        .agree_text a {
          color: #1694fb;
          text-decoration: none;
        }
      }

      .redBorder {
        border: 1px solid #d04a43;
      }

      .reference {
        display: flex;
        color: #666666;
        font-size: 13px;
        background: #fff;
        padding: 0 15px;
        align-items: center;
        height: 45px;
        overflow: hidden;

        span {
          display: flex;
          align-items: center;
          height: 100%;
        }

        img {
          height: 14px;
          width: 14px;
          padding-right: 6px;
        }

        input {
          box-sizing: border-box;
          margin-left: 20px;
          border: none;
          flex: 1;
          height: 100%;
          line-height: 45px;
        }

        input:disabled {
          background-color: transparent;
        }
      }

      .commit {
        display: flex;
        align-items: center;
        justify-content: center;

        .commit_button {
          background: #1694fb;
          border-radius: 6px;
          width: 351px;
          height: 38px;
          color: #fff;
          font-size: 16px;
          margin: 15px 0 6px 0;
          border: none;
        }
      }

      .bottom_text {
        font-size: 9px;
        color: #bbbbbb;
        text-align: center;
        padding: 0 43px;
        margin-top: 6px;

        span {
          display: block;
          letter-spacing: 0;
          line-height: 11px;
        }
      }
    }
  }
</style>