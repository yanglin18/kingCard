<template>
  <div v-if="$store.state.showSelectPlace" class="comWrap">
    <div class="place_shade" @click="select"></div>
    <div class="placeWrap">
      <ul class="placeBox">
        <li
          v-for="(province, indexP) in placeArr"
          :key="indexP"
          @click="getCity(province, indexP)"
          :class="{ active: clickedP == indexP }"
        >
          {{ province.name }}
        </li>
      </ul>
      <ul class="placeBox">
        <li
          v-for="(city, indexC) in province"
          :key="indexC"
          @click="getDist(city, indexC)"
          :class="{ active: clickedC == indexC }"
        >
          {{ city.name }}
        </li>
      </ul>
      <ul class="placeBox" id="district">
        <li v-for="(dirt, indexD) in city" :key="indexD" @click="select(dirt)">
          {{ dirt.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import placeArr from "@/views/data/data(1).js";
export default {
  props: ["showPlaceSelect"],
  data() {
    return {
      placeArr: [],
      province: [],
      city: [],
      clickedP: 0,
      clickedC: 0,
      p_name: "",
      c_name: "",
      d_name:"",

      placeData: {
        p_id: "",
        c_id: "",
        d_id: "",
        select_name: ""
      }
    };
  },
  created() {
    this.placeArr = placeArr;
    // 初始化选择北京市
    this.province = placeArr[0].city;
    this.p_name = this.placeArr[0].name;
    this.placeData.p_id = this.placeArr[0].id;

    this.city = this.province[0].area;
    this.c_name = this.province[0].name;
    this.placeData.c_id = this.province[0].id;

    this.d_name = this.city[0].name;
    this.placeData.d_id = this.city[0].id
  },
  methods: {
    getCity(e, index) {
      console.log(e, index);
      this.province = e.city;
      this.p_name = e.name;
      this.placeData.p_id = e.id;
      this.clickedP = index;
    },
    getDist(e, index) {
      this.city = e.area;
      this.c_name = e.name;
      this.placeData.c_id = e.id;
      this.clickedC = index;
    },
    select(e) {
      this.$store.commit("set_showSelectPlace", 0);
      this.placeData.d_id = e.id;
      this.placeData.select_name = this.p_name + this.c_name + e.name;
      this.$emit("getName", this.placeData);
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
