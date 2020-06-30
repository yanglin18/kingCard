<template>
  <div class="main_page">
      <img
      class="bg1 bg"
      src="https://kingcard-h5.oss-cn-beijing.aliyuncs.com/bg1.jpg"
    ></img>
    <img
      class="bg2 bg"
      src="https://kingcard-h5.oss-cn-beijing.aliyuncs.com/bg2.jpg"
    ></img>
    <img
      class="bg3 bg"
      src="https://kingcard-h5.oss-cn-beijing.aliyuncs.com/bg3.jpg"
    ></img>
    <loading v-if="Loading"></loading>
    <div class="shade" v-if="requestFail || applySuccess"></div>
    <div v-show="showToast" class="shadowTextWrap">{{ Toast }}</div>
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
        <img src="../../assets/close.png" />
      </div>
    </div>
    <div class="form">
      <div class="form_content">
        <div class="content_row">
          <div class="left_span">姓名</div>
          <div class="right_span">
            <input v-model="form.name" placeholder="请输入办理人姓名" />
          </div>
        </div>
        <div class="content_row">
          <div class="left_span">联系方式</div>
          <div class="right_span">
            <input v-model="form.mobile" placeholder="请输入手机号码" />
          </div>
        </div>
        <div class="content_row">
          <div class="left_span">身份证</div>
          <div class="right_span">
            <input v-model="form.certNo" placeholder="未满16周岁请勿下单" />
          </div>
        </div>
        <div class="content_row">
          <div class="left_span">验证码</div>
          <div class="right_span">
            <input v-model="form.code" placeholder="请输入验证码" />
            <button v-if="haveSend" class="havesend">
              {{ secend }}s后重新获取
            </button>
            <button v-else class="getcode" @click="getCode()">
              获取验证码
            </button>
          </div>
        </div>

        <div class="content_row">
          <div class="left_span">收货地址</div>
          <div class="right_span">
            <input
              disabled
              class="spInput"
              v-model="inputFlag"
              placeholder="请选择省份/地市/县区"
            />
            <span
              @click="showChoose"
              :class="select_place == '' ? '' : 'selected'"
              >{{ select_place }}</span
            >
          </div>
        </div>
        <div class="content_row">
          <div class="left_span">详细地址</div>
          <div class="right_span">
            <input
              v-model="form.address"
              placeholder="街道/镇+村/小区/写字楼+门牌号"
            />
          </div>
        </div>
      </div>
      <div class="form_bottom">
        <div class="agree" :class="showRed === 9 ? 'redBorder' : ''">
          <div class="agreement">
            <img
              v-if="!userAgree"
              @click="agree"
              src="../../assets/no_check.png"
              alt=""
            />
            <img v-else @click="agree" src="../../assets/check.png" alt="" />
            <div class="agree_text">
              我已阅读并同意<a @click="toagree('/agree1')"
                >《客户入网服务协议及业务协议》</a
              >、<a @click="toUserAgreement"
                >《关于客户个人信息收集、使用规则的公告》</a
              >、<a @click="toagree('/agree3')">《隐私政策》</a>、<a
                @click="toagree('/agree4')"
                >《用户使用协议》</a
              >
            </div>
          </div>
          <div class="explain">
            国际/港澳台漫游和国际/港澳台长途功能将于号码激活时同步生效
          </div>
        </div>
      </div>
    </div>
    <div class="topButton" @click="commit">
      <img v-if="flag" class="button1" src="../../assets/single/button_l.png" />
      <img v-else class="button2" src="../../assets/single/button_s.png" />
    </div>
    <chooseAdress class="chooseAdress" @getName="reSelectPlace"></chooseAdress>
  </div>
</template>
<script>
import chooseAdress from "./components/chooseAdress";
import loading from "@/views/components/load";
export default {
  components: {
    chooseAdress,
    loading
  },
  data() {
    return {
      flag: true,
      showRed: 0,
      userAgree: false,
      choose_ad: false,
      Toast: "",
      showToast: false,
      haveSend: false,
      select_place: "",
      Loading: false,
      inputFlag: "",
      applySuccess: false,
      requestFail: false,
      isSelectPlace: false,
      // 数据埋点数据
      adid: "",
      creativeid: "",
      creativetype: "",
      clickid: "",
      form: {
        itemcode: "",
        goodsId: "981610241535",
        p_code: "",
        c_code: "",
        d_code: "",
        name: "",
        certNo: "",
        mobile: "",
        address: "",
        recommend: ""
      }
    };
  },
  mounted() {
    let timer = setInterval(() => {
      this.flag = !this.flag;
    }, 350);
    this.form.itemcode = this.$route.query.itemcode;
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
    toUserAgreement() {
      console.log("1111111111111111", this.form.name);
      this.$router.push({
        path: "/agree2",
        query: {
          name: this.form.name,
          phone: this.form.mobile
        }
      });
    },
    toagree(e) {
      this.$router.push({
        path: e
      });
    },
    agree() {
      this.userAgree = !this.userAgree;
    },
    closeToast() {
      this.applySuccess = false;
    },
    showChoose() {
      this.$store.commit("set_showSelectPlace", 1);
      this.isSelectPlace = true;
    },
    reSelectPlace(e) {
      this.select_place = e.select_name;
      this.inputFlag = "`";
      this.form.d_code = e.d_id;
      this.form.p_code = e.p_id;
      this.form.c_code = e.c_id;
    },
    showToastMethod() {
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2000);
      return;
    },
    // 获取验证码
    getCode() {
      // this.conform();
      console.log("zzzzz");
      let phoneRex = /^1[3456789]\d{9}$/;
      let IDcardRex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (this.form.mobile === "") {
        this.Toast = "请输入您的联系电话";
        this.showToastMethod();
        return;
      }
      if (!phoneRex.test(this.form.mobile)) {
        this.Toast = "请输入正确的手机号";
        this.showToastMethod();
        return;
      }
      if (this.form.certNo === "") {
        this.Toast = "请输入您的身份证";
        this.showToastMethod();
        return;
      }
      if (!IDcardRex.test(this.form.certNo)) {
        this.Toast = "请输入正确的身份证";
        this.showToastMethod();
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
        .then(res => {
          if (res.data.code == 0) {
            this.haveSend = true;
            let ss = 60;
            let timer = setInterval(e => {
              ss--;
              this.secend = ss;
              if (ss === 0) {
                clearInterval(timer);
                this.haveSend = false;
              }
            }, 1000);
          }
          if (res.data.code == 90) {
            this.showToastMethod();
            this.Toast = res.data.msg;
          }
        })
        .catch({});
    },
    commit() {
      let nameRex = /^[\u4E00-\u9FA5]{2,4}$/;
      let phoneRex = /^1[3456789]\d{9}$/;
      let IDcardRex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

      if (this.form.name === "") {
        this.Toast = "请输入姓名";
        this.showToastMethod();
        return;
      }
      if (!nameRex.test(this.form.name)) {
        this.Toast = "姓名中不得包含非法字符";
        this.showToastMethod();
        return;
      }
      if (this.form.mobile === "") {
        this.Toast = "请输入手机号码";
        this.showToastMethod();
        return;
      }
      if (!phoneRex.test(this.form.mobile)) {
        this.Toast = "手机号码输入错误，请重新输入";
        this.showToastMethod();
        return;
      }
      if (this.form.certNo === "") {
        this.Toast = "请输入身份证";
        this.showToastMethod();
        return;
      }
      if (!IDcardRex.test(this.form.certNo)) {
        this.Toast = "身份证输入错误，请重新输入";
        this.showToastMethod();
        return;
      }

      if (this.select_place === " ") {
        this.Toast = "请选择配送地址的所在地区";
        this.showToastMethod();
        return;
      }

      if (this.form.address === "") {
        this.Toast = "请输入详细地址";
        this.showToastMethod();
        return;
      }
      if (this.form.address.length < 4) {
        this.Toast = "详细地址不得少于四个字";
        this.showToastMethod();
        return;
      }
      if (!this.userAgree) {
        this.Toast = "请阅读并同意接受用户协议";
        this.showToastMethod();
        return;
      }
      this.Loading = true;
      this.$axios({
        method: "post",
        url:
          "https://simcard.houselai.com/public/index.php/member/index/create_orderss",
        data: this.$qs.stringify(this.form)
      })
        .then(response => {
          this.Loading = false;
          if (response.data.code == 0) {
            // meteor.track("form", { convert_id: 1661374178349067 });
            this.conform();
            this.applySuccess = true;
            this.showRed = 0;
          } else {
            this.requestFail = true;
            this.showToast = true;
            this.Toast = response.data.msg;
            console.log(response.data.msg);
            setTimeout(() => {
              this.requestFail = false;
              this.showToast = false;
            }, 3000);
          }
        })
        .catch(err => {
          this.Loading = false;
        });
    },
    conform() {
      let Url =
        "https://bdsimcard.houselai.com/1/?itemcode=" +
        this.form.itemcode +
        "&adid=" +
        this.adid +
        "&clickid=" +
        this.clickid +
        "&creativeid=" +
        this.creativeid +
        "&creativetype=" +
        this.creativetype +
        "";
      this.$axios({
        method: "get",
        url:
          "https://ad.toutiao.com/track/activate/?link=" +
          encodeURIComponent(Url) +
          "&event_type=3"
      })
        .then(res => {
          console.log("数据埋点成功");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
/* img 搭车：让链接里的 img 无边框 */
button,
input,
select,
textarea {
  font-size: 100%;
}

input {
  outline: none;
}

input:focus {
  outline: none;
}

input::-webkit-input-placeholder {
  font-size: 13px;
  color: #bbbbbb;
  letter-spacing: 0;
  padding: 0;
}

input::-moz-placeholder {
  font-size: 13px;
  color: #bbbbbb;
  letter-spacing: 0;
}

input::-moz-placeholder {
  font-size: 13px;
  color: #bbbbbb;
  letter-spacing: 0;
}

input::-ms-input-placeholder {
  font-size: 13px;
  color: #bbbbbb;
  letter-spacing: 0;
}

input {
  -webkit-appearance: none；;
}

input:disabled {
  background-color: #fff;
  opacity: 1;
}

.chooseAdress {
}

/* 遮罩 */
.shade {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.7);
  z-index: 3;
}

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

.main_page {
  max-width: 700px;
  position: relative;
  background: url("../../../static/single.png") no-repeat center;
  background-size: 100% 100%;
  height: 1320px;
  width: 100%;
    .bg {
    background-size: 100% 100%;
    width: 100%;
    display: block;
  }

  .shadowTextWrap {
    position: fixed;
    left: 50%;
    top: 50%;
    min-width: 60%;
    max-width: 80%;
    /* white-space: nowrap; */
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 10px;
    border-radius: 4px;
    color: #fff;
    background: rgba(0, 0, 0, 0.7);
    font-size: 15px;
    z-index: 500;
  }

  .form {
    position: absolute;
    top: 416px;
    background: #ffffff;
    padding: 0 20px 15px;
    margin: 0 17px;
    border-radius: 8px;

    .form_content {
      .content_row {
        height: 46px;
        display: flex;
        align-items: center;
        font-size: 13px;

        .left_span {
          display: inline;
          color: #666666;
          font-size: 13px;
          min-width: 82px;
          display: inline-block;
        }

        .right_span {
          display: inline;
          flex: 1;
          position: relative;
          height: 46px;

          input {
            /* outline: none; */
            width: 100%;
            height: 44px;
            /* line-height: 44px; */
            border: none;
            color: #666666;
            display: inline-block;
            padding: 0;
          }
          /* 验证码 */
          .getcode {
            padding: 7px 12px;
            position: absolute;
            right: 0;
            top: 7px;
            background: #1694fb;
            border-radius: 3px;
            height: 36px;
            font-size: 13px;
            color: #ffffff;
            letter-spacing: 0;
            border: none;
          }

          .havesend {
            position: absolute;
            right: 0;
            top: 7px;
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

          .spInput {
            color: #ffffff;
            /* opacity: 1; */
          }

          span {
            position: absolute;
            left: 0;
            top: 0;
            width: 200px;
            display: inline-block;
            height: 46px;
            line-height: 46px;
            color: #bbbbbb;
            font-weight: normal;
            font-size: 13px;
            padding: 0;
          }

          .selected {
            color: #666666;
          }
        }
      }
    }

    .form_bottom {
      .agree {
        background: #ffffff;
        font-size: 12px;
        color: #999999;
        border: 1px #ffffff solid;

        .agreement {
          margin-bottom: 8px;
          /* display: flex; */
          /* align-items: center; */
        }

        img {
          height: 16px;
          width: 16px;
          min-width: 16px;
          display: inline;
          vertical-align: middle;
        }

        .agree_text {
          color: #42a1ef;
          text-decoration: none;
          display: inline;
          line-height: 18px;

          a {
            line-height: 18px;
          }
        }

        .explain {
          font-size: 10px;
          color: #848484;
        }
      }
    }
  }

  .topButton {
    position: absolute;
    top: 812px;
    max-width: 375px;
    text-align: center;
    margin: 0 13.5vw;

    .button1 {
      width: 73vw;
      height: 57px;
      max-width: 375px;
    }

    .button2 {
      width: 73vw;
      height: 53px;
      max-width: 375px;
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

.noScroll {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1001;
}
</style>
