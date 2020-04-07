<template>
  <div class="content" v-if="$store.state.showSelectPlace">
    <div class="title">
      <span @click="hide">取消</span>
      <span class="select">完成</span>
    </div>
    <div class="placeWrap">
      <ul class="placeBox">
        <li v-for="(province, indexP) in placeArr" :key="indexP" @click="getCity(province, indexP)"
          :class="{ active: clickedP == indexP }">
          {{ province.name }}
        </li>
      </ul>
      <ul class="placeBox">
        <li v-for="(city, indexC) in province" :key="indexC" @click="getDist(city, indexC)"
          :class="{ active: clickedC == indexC }">
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
    data()
    {
      return {
        placeArr: [],
        province: [],
        city: [],
        clickedP: 0,
        clickedC: 0,
        p_name: "",
        c_name: "",
        d_name: "",
        placeData: {
          p_id: "",
          c_id: "",
          d_id: "",
          select_name: "",
          number_place: ""
        }
      };
    },
    created()
    {
      this.placeArr = placeArr;
      // 初始化选择北京市
      this.province = placeArr[0].city;
      this.p_name = this.placeArr[0].name;
      this.placeData.p_id = this.placeArr[0].id;

      this.city = this.province[0].area;
      this.c_name = this.province[0].name;
      this.placeData.c_id = this.province[0].id;

      this.d_name = this.city[0].name;
      this.placeData.d_id = this.city[0].id;
    },
    methods: {
      getCity(e, index)
      {
        console.log(e, index);
        this.province = e.city;
        this.p_name = e.name;
        this.placeData.p_id = e.id;
        this.clickedP = index;

        // 市区默认选择第一个
        this.city = e.city[0].area;
        this.c_name = e.city[0].name;
        this.placeData.c_id = e.city[0].id;
      },
      getDist(e, index)
      {
        this.city = e.area;
        this.c_name = e.name;
        this.placeData.c_id = e.id;
        this.clickedC = index;
      },
      select(e)
      {
        this.$store.commit("set_showSelectPlace", 0);
        this.placeData.d_id = e.id;
        this.placeData.select_name = this.p_name + this.c_name + e.name;
        this.placeData.number_place = this.p_name + this.c_name;
        this.$store.commit("set_p_code", this.placeData.p_id);
        this.$store.commit("set_c_code", this.placeData.c_id)
        this.$emit("getName", this.placeData);
      },
      hide()
      {
        this.$store.commit("set_showSelectPlace", 0);
      }
    }
  };
</script>
<style lang="scss">
  .content {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: #fff;
    font-size: 16px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;

    .title {
      padding: 15px 20px 10px;
      display: flex;
      justify-content: space-between;
      border: 0.5px solid #f8f8f8;

      .select {
        color: #007AFF;
      }
    }

    .placeWrap {
      position: absolute;
      right: 0;
      display: flex;
      height: 200px;
      width: 100vw;

      .placeBox {
        flex: 1;
        padding-left: 10px;
        overflow-y: auto;

        .active {
          color: #333333;
        }

        li {
          display: block;
          height: 41px;
          line-height: 41px;
          padding-left: 5px;
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #333333 + 99;
          letter-spacing: 0;
        }
      }
    }
  }
</style>