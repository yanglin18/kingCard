<template>
  <div class="mainPage">
    <div class="p1">
      <img
        class="bg"
        src="https://yanglin-kingcard.oss-cn-shenzhen.aliyuncs.com/bg-1.jpg"
      />
      <swiper class="swiper" ref="Myswper" :options="swiperOption">
        <SwiperSlide
          ><div>
            <img
              src="https://yanglin-kingcard.oss-cn-shenzhen.aliyuncs.com/card3.png"
            /></div
        ></SwiperSlide>
        <SwiperSlide
          ><div>
            <img
              src="https://yanglin-kingcard.oss-cn-shenzhen.aliyuncs.com/card2.png"
            /></div
        ></SwiperSlide>
        <SwiperSlide
          ><div>
            <img
              src="https://yanglin-kingcard.oss-cn-shenzhen.aliyuncs.com/card1.png"
            /></div
        ></SwiperSlide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="button">
        <img src="../../../static/3card/button.png" @click="navToForm" />
        <span @click="jumpTo" class="text1">资费详情</span>
      </div>
    </div>
    <div class="p1">
      <img
        class="bg"
        src="https://yanglin-kingcard.oss-cn-shenzhen.aliyuncs.com/bg-2.jpg"
      />
    </div>
    <div class="p1">
      <img
        ref="bg3"
        class="bg"
        src="https://yanglin-kingcard.oss-cn-shenzhen.aliyuncs.com/bg-3.jpg"
      />
      <div class="p3_limit use_Limit">
        *点击查看<a @click="toMoreExpenses">更多资费详情</a>
      </div>
    </div>
    <div class="p1">
      <img
        class="bg"
        src="https://yanglin-kingcard.oss-cn-shenzhen.aliyuncs.com/bg-4.jpg"
      />
    </div>
    <div class="p1">
      <img
        class="bg"
        src="https://yanglin-kingcard.oss-cn-shenzhen.aliyuncs.com/bg-5.jpg"
      />
      <div class="use_Limit bottom_li">
        *点击查看<a @click="toMoreFlux">更多专属流量范围</a>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    let that = this;
    return {
      flag: true,
      itemcode: "",
      buttonFlag: false,
      activeIndex: null,
      swiperOption: {
        effect: "coverflow",
        slideToClickedSlide: true,
        grabCursor: true,
        initialSlide: 1, //初始化时索引
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: ".swiper-pagination"
        },
        on: {
          slideChangeTransitionEnd: function() {
            that.activeIndex = this.activeIndex;
            console.log(this.activeIndex);
          }
        }
      }
    };
  },
  created() {},
  mounted() {
    // let timer = setInterval(() => {
    //   this.flag = !this.flag;
    // }, 300);
    this.itemcode = this.$route.query.itemcode;
  },
  beforeDestroy() {},
  methods: {
    navToForm() {
      console.log(this.activeIndex, this.$refs.Myswper.$swiper.activeIndex);
      this.$router.push({
        name: "shortform",
        query: { itemcode: this.itemcode, activeIndex: this.activeIndex }
      });
    },
    jumpTo() {
      this.scrollTop = this.$refs.bg3.offsetHeight + 550;
      console.log(
        this.scrollTop,
        this.$refs.bg3.offsetTop,
        this.$refs.bg3.offsetHeight
      );
      window.scrollTo({
        top: this.scrollTop
      });
    },
    toMoreExpenses() {
      this.$router.push({ name: "moreDetail" });
    },
    toMoreFlux() {
      this.$router.push({ name: "moreUse" });
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "./views/components/css/rem.css";

.mainPage {
  background: #131736;
  min-height: 100vh;
  width: 100%;
  .p1 {
    position: relative;
    .swiper {
      position: absolute;
      height: 134px;
      // bottom: 5.7rem;
      width: 100%;
      left: 0;
      top: 65%;
      .swiper-slide {
        background-position: center;
        background-size: cover;
        height: 6.2rem;
        width: 9.9rem;
        img {
          height: 6.2rem;
          width: 9.9rem;
        }
      }
    }
    .bg {
      img[lazy="loading"] {
        width: 29px !important;
        height: 34px !important;
      }
      img[lazy="loaded"] {
        height: 100%;
        width: 100%;
      }
      height: 100%;
      width: 100%;
      vertical-align: middle;
      margin: 0;
      padding: 0;
    }
  }
}
.use_Limit {
  color: #fff;
  font-size: 13px;
  position: absolute;
  bottom: 0.1rem;
  left: 1rem;
  letter-spacing: 0;
  line-height: 19px;
}
.bottom_li {
  bottom: 4.1rem;
}

.use_Limit a {
  font-size: 13px;
  color: #f9e5aa;
  text-decoration: none;
}

.button {
  position: absolute;
  position: absolute;
  bottom: 1rem;
  text-align: center;

  img {
    height: 100%;
    width: 70%;
  }
}
.bottom {
  position: fixed;
  bottom: 30px;
  left: 0;
  width: 100%;
  z-index: 100;
  text-align: center;
  img {
    height: 2.4rem;
    width: 9rem;
  }
}

.text1 {
  display: block;
  font-size: 13px;
  color: #f8f8f8;
  text-align: center;
  text-decoration: underline;
}

.swiper-container {
  position: absolute;
  // top: 0;
  height: 134px;
  bottom: 114px;
  width: 100%;
}

.swiper-slide-prev {
  transform: translate3d(12px, 10px, -100px) rotateX(0deg) rotateY(50deg)
    scale(0.95) !important;
}

.swiper-slide-next {
  transform: translate3d(-12px, 10px, -100px) rotateX(0deg) rotateY(-50deg)
    scale(0.95) !important;
}
</style>
