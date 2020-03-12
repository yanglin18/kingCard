<template>
  <div class="mainPage">
    <!-- 遮罩 -->
    <div class="shade"></div>
    <div class="shadowTextWrap"></div>
    <div class="content">
      <div class="place_shade"></div>
      <!-- 申请成功弹窗 -->
      <div v-if="applySuccess" class="applySuccess">
        <div class="apply_content">
          <div class="apply_title"><span>下单成功！</span></div>
          <div class="apply_text">
            我们将尽快为你配送，请收到卡后的10天内激活使用，过期将会被回收哦！
            <span>请您注意接收陌生号码的短信或来电哦～</span>
          </div>
        </div>
        <div class="close" onclick="closeToast()">
          <img src="images/assets/close.png" />
        </div>
      </div>
      <!-- 身份验证失败弹窗 -->
      <div v-if="comformFail" class="comformFail">
        <!-- <span>您的身份证信息未在公安系统登记，请您核对或更换证件信息。</span> -->
        <div id="errorMsg"></div>
        <div class="close" onclick="closecomform()">
          <img src="images/assets/close.png" />
        </div>
      </div>
      <div class="top_title">
        已选择<span class="selectIndex">腾讯大王卡</span>
      </div>
      <div class="top_title">根据国家实名制要求，请准确提供身份证信息</div>
      <div class="form">
        <div id="nameBox">
          <span>姓名</span>
          <input id="name" placeholder="请输入身份证件姓名" /><br />
        </div>
        <div id="IDcardBox">
          <span>身份证</span>
          <input id="IDcard" placeholder="请输入身份证号" /><br />
        </div>
        <div id="phoneNumBox">
          <span>联系电话</span>
          <input id="phone" placeholder="请输入联系电话" />
        </div>
        <div id="codeDiv">
          <span>验证码</span>
          <input id="code" placeholder="请输入验证码" />
          <button class="getcode" id="code_button" onclick="getCode()">
            获取验证码
          </button>
        </div>
      </div>
      <div class="top_title title_bold">
        请填写配送地址<span class="red_text"
          >（支持全国配送，新疆、西藏仅限省内配送）</span
        >
      </div>
      <div class="form">
        <div id="addressBox" class="Box">
          <span>所在地区</span>
          <div
            class="inputDiv"
            onclick="showCom()"
            style="height: 100%;flex: 1;border: none;padding: 0;margin-bottom: 0;"
          >
            <text id="address">所在区/县</text>
          </div>
          <img src="images/assets/to_right.png" />
        </div>
        <div id="addressDetailWrap">
          <input
            id="addressDetail"
            placeholder="街道/镇+村/小区/写字楼+门牌号"
          />
        </div>
      </div>
      <div class="top_title title_bold">请选择号码</div>
      <div class="form">
        <div id="numberBelong" class="Box">
          <span>号码归属</span>
          <div
            class="inputDiv"
            onclick="showNumberPlace()"
            style="height: 100%;flex: 1;border: none;padding: 0;"
          >
            <text id="phone_address">请选择号码归属地</text>
          </div>
          <img src="images/assets/to_right.png" />
        </div>
        <div class="Box" id="chooseNumBox">
          <span>选择号码</span>
          <div
            class="inputDiv"
            onclick="showChooseNumber()"
            style="height: 100%;flex: 1;border: none;padding: 0;"
          >
            <text id="phone_number_address"></text>
          </div>
          <img src="images/assets/to_right.png" />
        </div>
      </div>
      <div class="agree">
        <div class="agreement">
          <img
            id="agreeFlag"
            onclick="agree()"
            src="../assets/no_check.png"
            alt=""
          />
          <div class="agree_text">
            我已阅读并同意<a onclick="toUserAgreement()"
              >《客户入网服务协议及业务协议》</a
            >、<a href="agreement/announcement .html"
              >《关于客户个人信息收集、使用规则的公告》</a
            >
          </div>
        </div>
        <div class="explain">
          国际/港澳台漫游和国际/港澳台长途功能将于号码激活时同步生效
        </div>
      </div>
      <div class="reference">
        <img
          id="referMan"
          onclick="addRefer()"
          src="images/assets/no_check.png"
          alt=""
        />
        <span>推荐人信息</span>
        <input id="refer" placeholder="请填写推荐人号码" />
      </div>
      <div class="commit">
        <button class="commit_button" onclick="commit()">
          立即提交，免费送货上门
        </button>
      </div>
      <div class="bottom_text">
        <span
          >请保持联系号码畅通，我们可能随时与您联系。本次为阶段性优惠活动，数量有限，联系电话无人接听或恶意下单情况，将不予发货。
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comformFail: false,
      applySuccess: false
    };
  }
};
</script>
<style lang="scss" scoped>
.mainPage {
  background: #f8f8f8;
  .content {
    min-height: 100vh;
    width: 100%;
    padding: 15px 0;
    z-index: 0;
    .top_title {
      font-size: 13px;
      padding: 0 15px 10px;
      color: #666666;
      letter-spacing: 0;
      font-weight: 600;
      span {
        color: #d5af6d;
      }
      .red_text {
        color: #d04a43;
        font-size: 12px;
      }
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
        padding: 0 15px;
        box-sizing: border-box;
        border: 1px solid #fff;
        background: #fff;
      }
      .red_border {
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
        width: 82px;
      }
    }
    .agree {
      padding: 15px 13px;
      margin: 10px 0;
      background: #ffffff;
      font-size: 12px;
      color: #999999;
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
        color: #ad7e34;
        text-decoration: none;
      }
    }
    .reference {
      display: flex;
      color: #666666;
      font-size: 13px;
      background: #fff;
      padding: 0 15px;
      align-items: center;
      height: 45px;
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
        margin-left: 20px;
        border: none;
        flex: 1;
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
        background: #d1ad73;
        border-radius: 6px;
        width: 351px;
        height: 58px;
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
