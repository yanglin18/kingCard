<template>
  <div v-if="$store.state.showSelectNumPlace" class="comWrap" id="numberWrap">
    <div class="place_shade" @click="hide"></div>
    <div class="placeWrap">
      <ul class="placeBox" id="provinceNum">
        <li
          v-for="(province, indexP) in placeArr"
          @click="getCity(province, indexP)"
          :key="indexP"
          :class="{ active: clickedP == indexP }"
        >
          {{ province.name }}
        </li>
      </ul>
      <ul class="placeBox" id="cityNum">
        <li
          v-for="(city, indexC) in province"
          :key="indexC"
          @click="select(city, indexC)"
        >
          {{ city.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import placeArr from "@/views/data/data(1).js";
export default {
  data() {
    return {
      placeArr: [],
      province: [],
      clickedP: 0,
      p_name: "",
      numberPlaceData: {
        p_id: "",
        c_id: "",
        select_name: ""
      }
    };
  },
  created() {
    this.placeArr = placeArr;
    this.province = placeArr[0].city;
    // 初始化选择北京
    this.numberPlaceData.p_id = this.placeArr[0].id;
  },
  methods: {
    getCity(e, index) {
      this.province = e.city;
      this.clickedP = index;
      this.numberPlaceData.p_id = e.id;
      this.p_name = e.name;
    },
    select(e, index) {
      this.$store.commit("set_showSelectNumPlace", 0);
      this.numberPlaceData.c_id = e.id;
      this.numberPlaceData.select_name = this.p_name + e.name;
      this.$store.commit("set_p_code", this.numberPlaceData.p_id);
      this.$store.commit("set_c_code", this.numberPlaceData.c_id);
      this.$emit("getNumberPlace", this.numberPlaceData);
    },
    hide() {
      this.$store.commit("set_showSelectNumPlace", 0);
    }
  }
};
</script>
<style lang="scss" scoped>
.comWrap {
  position: fixed;
  right: 0;
  top: 0;
  width: 72vw;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  z-index: 1600;
  .empty {
    width: 28vw;
    background: rgba(0, 0, 0, 0.7);
  }
  .place_shade {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1500;
  }
  .placeWrap {
    position: absolute;
    right: 0;
    display: flex;
    height: 100vh;
    width: 72vw;
    background: #fff;
    z-index: 2000;
    .placeBox {
      flex: 1;
      padding-left: 10px;
      overflow-y: auto;
      padding-bottom: 60px;
      box-shadow: -6px 0 6px 0 rgba(153, 153, 153, 0.18);
      .active {
        color: #1694fb;
      }
      li {
        display: block;
        height: 41px;
        line-height: 41px;
        padding-left: 5px;
        border-bottom: 1px solid #f2f2f2;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 12px;
        color: #666666;
        letter-spacing: 0;
        &:last-child {
          margin-bottom: 60px;
        }
      }
    }
  }
}
</style>
