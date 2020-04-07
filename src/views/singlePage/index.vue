<template>
  <div class="main_page">
    <loading v-if="Loading"></loading>
    <div v-show="showToast" class="shadowTextWrap">{{Toast}}</div>
    <div class="form">
      <div class="form_content">
        <div class="content_row">
          <span>姓名</span>
          <input v-model="form.name" placeholder="请输入办理人姓名" />
        </div>
        <div class="content_row">
          <span>联系方式</span>
          <input v-model="form.mobile" placeholder="请输入手机号码" />
        </div>
        <div class="content_row">
          <span>身份证</span>
          <input v-model="form.certNo" placeholder="未满16周岁请勿下单" />
        </div>
        <div class="content_row">
          <span>收货地址</span>
          <span class="span_special" @click="showChoose">{{select_place}}</span>
        </div>
        <div class="content_row">
          <span>详细地址</span>
          <input v-model="form.address" placeholder="街道/镇+村/小区/写字楼+门牌号" />
        </div>
      </div>
      <div class="form_bottom">
        <div class="agree" :class="showRed === 9 ? 'redBorder' : ''">
          <div class="agreement">
            <img v-if="!userAgree" @click="agree" src="../../assets/no_check.png" alt="" />
            <img v-else @click="agree" src="../../assets/check.png" alt="" />
            <div class="agree_text">
              我已阅读并同意<a>《客户入网服务协议及业务协议》</a>、<a>《关于客户个人信息收集、使用规则的公告》</a>
            </div>
          </div>
          <div class="explain">
            国际/港澳台漫游和国际/港澳台长途功能将于号码激活时同步生效
          </div>
        </div>
      </div>
    </div>
    <div class="topButton">
      <img v-if="flag" @click="commit" class="button1" src="../../assets/single/button_l.png" />
      <img v-else class="button2" src="../../assets/single/button_s.png" />
    </div>
    <chooseAdress @getName="reSelectPlace"></chooseAdress>
  </div>
</template>
<script>
  import chooseAdress from './components/chooseAdress';
  import loading from "@/views/components/load";
  export default {
    components: {
      chooseAdress,
      loading
    },
    data()
    {
      return {
        flag: true,
        itemcode: "",
        showRed: 0,
        userAgree: false,
        choose_ad: false,
        Toast: '',
        showToast: false,
        select_place: '请选择省份/地市/县区',
        Loading: false,
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
        },
      };
    },
    mounted()
    {
      // let timer = setInterval(() =>
      // {
      //   this.flag = !this.flag;
      // }, 300);
      this.itemcode = this.$route.query.itemcode;
    },
    methods: {
      navToForm()
      {
        console.log("fouce生效");
        this.$router.push({ path: "./form", query: { itemcode: this.itemcode } });
      },
      agree()
      {
        this.userAgree = !this.userAgree;
      },
      showChoose()
      {
        this.$store.commit("set_showSelectPlace", 1);
      },
      reSelectPlace(e)
      {
        this.select_place = e.select_name;
        this.form.d_code = e.d_id;
        this.form.p_code = e.p_id;
        this.form.c_code = e.c_id;
      },
      showToastMethod()
      {
        this.showToast = true;
        setTimeout(() =>
        {
          this.showToast = false;
        }, 2000);
        return;
      },
      commit()
      {
        let nameRex = /^[\u4E00-\u9FA5]{2,4}$/;
        let phoneRex = /^1[3456789]\d{9}$/;
        let IDcardRex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

        if (this.form.name === '') {
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

        if (this.select_place === "请选择省份/地市/县区") {
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
            "https://simcard.yingbei365.com/public/index.php/member/index/create_orderss",
          data: this.$qs.stringify(this.form)
        })
          .then(response =>
          {
            this.Loading = false;
            if (response.data.code == 0) {
              // meteor.track("form", { convert_id: 1661374178349067 });
              this.conform()
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

    }
  };
</script>
<style lang="scss" scoped>
  input::-webkit-input-placeholder {
    color: #BBBBBB;
    font-size: 13px;
  }

  .main_page {
    max-width: 700px;
    margin: 0 auto;
    position: relative;
    background: url("../../../static/single.png") no-repeat center;
    background-size: 100% 100%;
    height: 1280px;
    width: 100%;

    .shadowTextWrap {
      position: fixed;
      left: 50%;
      top: 50%;
      min-width: 40%;
      max-width: 80%;
      white-space: nowrap;
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
          border: 1px solid #fff;

          span {
            color: #666666;
            font-size: 13px;
            min-width: 67px;
            display: inline-block;
          }

          input {
            outline: none;
            height: 46px;
            border: none;
          }

          .span_special {
            display: inline-block;
            height: 46px;
            line-height: 46px;
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
            display: flex;
            align-items: center;
          }

          img {
            height: 14px;
            width: 14px;
            padding-right: 8px;
            min-width: 14px;
          }

          .agree_text {
            color: #42A1EF;
            text-decoration: none;
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
      top: 754px;
      max-width: 700px;
      text-align: center;
      margin: 0 10vw;

      .button1 {
        width: 81vw;
        max-width: 700px;
      }

      .button2 {
        width: 73vw;
        margin-left: 4vw;
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