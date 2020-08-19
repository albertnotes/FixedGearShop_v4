import Vue from 'vue';
import Vuex from 'vuex';

import productsModules from './products';
import cartsModules from './cart';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    headerStatus: '',
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    HEADERSTATUS(state, status) {
      state.headerStatus = status;
    },
  },
  actions: {},
  modules: {
    products: productsModules,
    carts: cartsModules,
  },
});
