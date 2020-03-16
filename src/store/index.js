import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    showSelectPlace: 0,
    showSelectNumPlace: 0,
    showChooseNumber: 0,
    c_code: "",
    p_code: ""
  },
  mutations: {
    set_showSelectPlace(state, n) {
      state.showSelectPlace = n;
      console.log("改变后的状态为", state.showSelectPlace);
    },
    set_showSelectNumPlace(state, n) {
      state.showSelectNumPlace = n;
    },
    set_showChooseNumber(state, n) {
      state.showChooseNumber = n;
    },
    set_p_code(state, val) {
      state.p_code = val;
    },
    set_c_code(state, val){
      state.c_code = val
    }
  }
});

export default store;
