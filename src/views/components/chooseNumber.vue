<template>
  <div v-if="$store.state.showChooseNumber" class="choose_phone_number">
    <div class="choose_content">
      <div class="choose_title">
        请您选择号码<span>（选号别纠结，以后可以免费换号）</span>
      </div>
      <div class="choose_query">
        <input
          v-model="inputIdx"
          id="chooseIdx"
          placeholder="生日、幸运数字等"
          @focus="inputFocus"
        />
        <img
          v-if="flag"
          @click="searchByInput()"
          class="searchNumber"
          src="../../assets/search.png"
        />
        <img
          v-else
          @click="clean()"
          class="clean"
          src="../../assets/clean.png"
        />
      </div>
      <div class="phone_number">
        <div v-if="!numbers.length" class="numberEmpty">{{ numberText }}</div>
        <div
          v-else
          class="showPhone"
          v-for="(item, index) in numbers"
          :key="index"
          @click="occupation_number(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="choose_change" @click="exchangeNumber">
      <span>换一批</span>
    </div>
    <div @click="closeChooseNumber()" class="close">
      <img src="../../assets/close.png" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      numbers: [],
      inputIdx: "",
      numberText: "",
      phoneNumbersArr: [],
      phoneNumberBackups: [], //备份100个电话号码，供查找
      number: "",
      flag: true
    };
  },
  computed: {
    ischangeed() {
      return this.$store.state.showChooseNumber;
    }
  },
  mounted() {
    console.log("form", this.$store.state.c_code);
    // this.getNumbers();
  },
  watch: {
    ischangeed() {
      if (this.$store.state.showChooseNumber) {
        this.getNumbers();
      }
    }
  },
  methods: {
    inputFocus(){
      if(this.inputIdx === ''){
        this.flag = true
      }else{
        this.flag = false
      }
    },
    getNumbers() {
      this.$axios({
        method: "post",
        url:
          "https://simcard.yingbei365.com/public/index.php/member/index/get_select_num",
        data: this.$qs.stringify({
          goodsId: "981610241535",
          p_code: this.$store.state.p_code,
          c_code: this.$store.state.c_code
        })
      })
        .then(response => {
          if (response.data.code == 0) {
            this.phoneNumbersArr = response.data.data;
            this.phoneNumberBackups = []; //深拷贝备份，搜索的时候展示
            response.data.data.forEach(item => {
              this.phoneNumberBackups.push(item);
            });
            this.numbers = this.phoneNumbersArr.splice(0, 10);
          } else {
            if (!response.data.data) {
              this.numberText = "无号码";
            }
          }
        })
        .catch(error => {});
    },
    // 关闭
    closeChooseNumber() {
      this.$store.commit("set_showChooseNumber", 0);
    },
    // 根据索引查找号码
    searchByInput() {
      this.numbers = [];
      this.phoneNumberBackups.forEach(item => {
        if (String(item).search(this.inputIdx) === -1) {
        } else {
          if (this.numbers.length <= 10) {
            this.numbers.push(item);
          }
        }
      });
      if (this.numbers.length === 0) {
        this.numberText = "抱歉没有匹配的号码";
      }
    },
    clean() {
      this.inputIdx = "";
    },
    // 换一批
    exchangeNumber() {
      if (this.phoneNumbersArr.length === 0) {
        this.getNumbers();
      } else {
        this.numbers = this.phoneNumbersArr.splice(0, 10);
      }
    },
    // 选取号码
    occupation_number(e) {
      console.log(e);
      this.$axios({
        url:
          "https://simcard.yingbei365.com/public/index.php/member/index/occupation_number",
        method: "post",
        data: this.$qs.stringify({
          p_code: this.$store.state.p_code,
          c_code: this.$store.state.c_code,
          phoneNum: e
        })
      }).then(res => {
        if (res.data.code == 0) {
          this.$emit("number", e);
          this.closeChooseNumber();
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.choose_phone_number {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 315px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  z-index: 5;
  .choose_content {
    background: #fff;
    padding: 10px 15px 13px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    .choose_title {
      font-size: 13px;
      color: #666666;
      letter-spacing: 0;
      margin-bottom: 8px;
      span {
        font-size: 10px;
        color: #d04a43;
      }
    }
    .choose_query {
      border: 1px solid #bbbbbb;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 44px;
      margin-bottom: 15px;
      input {
        border: none;
        outline: none;
        -webkit-appearance: none;
        margin-left: 8px;
        flex: 1;
      }
      img {
        height: 22px;
        width: 22px;
        margin-right: 8px;
      }
      .clean {
        height: 12px;
        width: 12px;
      }
    }
    .phone_number {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 25px;
      .numberEmpty {
        font-size: 15px;
        color: #1694fb;
        margin-left: -20px;
      }
      .showPhone {
        display: inline;
        width: 105px;
        padding: 8px 0;
        font-size: 17px;
        color: #666666;
        text-align: justify;
      }
    }
  }
  .choose_change {
    background: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    height: 45px;
    width: 100%;
    font-size: 15px;
    color: #1694fb;
    letter-spacing: 0;
    text-align: center;
    border-top: 0.5px solid #bbbbbb;
    span {
      line-height: 45px;
      font-weight: 600;
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
</style>
