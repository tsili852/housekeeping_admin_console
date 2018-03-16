//@ts-check

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    hotelSN: ''
  },
  getters: {
    isHotelSNCorrect: state => {
      if (this.hotelSN && this.hotelSN.length > 0) {
        return true;
      }
      else {
        return false;
      }
    }
  },
  mutations: {
    updateHotelSN: state => {
      state.hotelSN = '2101840'
    }
  },
  actions: {
    updateHotelSNAsync: context => {
      context.commit('updateHotelSN');
    }
  }
});
