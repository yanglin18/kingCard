import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    showSelectPlace: 0,
    showSelectNumPlace: 0,
    showChooseNumber: 0
  },
  mutations: {
    set_showSelectPlace(state,n) {
      state.showSelectPlace = n;
      console.log("改变后的状态为",state.showSelectPlace)
    },
    set_showSelectNumPlace(state,n) {
      state.showSelectNumPlace = n;
    },
    set_showChooseNumber(state,n) {
      state.showChooseNumber = n;
    }
  }
});

export default store;
