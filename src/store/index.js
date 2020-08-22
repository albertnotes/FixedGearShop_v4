import Vue from 'vue';
import Vuex from 'vuex';

import productsModules from './products';
// import cartsModules from './cart';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    headerStatus: '',
    alertMessage: [],
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    HEADER_STATUS(state, status) {
      state.headerStatus = status;
    },
    ALERT_MESSAGE(state, payload) {
      state.alertMessage.push(payload);
    },
    DELETE_MESSAGE(state, num) {
      state.alertMessage.splice(num, 1);
    },
  },
  actions: {
    updateMessage({ commit, dispatch }, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      commit('ALERT_MESSAGE', {
        message,
        status,
        timestamp,
      });
      dispatch('removeMessageWithTiming', timestamp);
    },
    removeMessageWithTiming({ commit, state }, timestamp) {
      setTimeout(() => {
        state.alertMessage.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            commit('DELETE_MESSAGE', i);
          }
        });
      }, 3000);
    },
  },
  modules: {
    products: productsModules,
    // carts: [cartsModules, { preserveState: true }],
  },
});
