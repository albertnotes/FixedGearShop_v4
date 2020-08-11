import Vue from 'vue';
import Vuex from 'vuex';

import productsModules from './products';
import cartsModules from './cart';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
  },
  actions: {},
  modules: {
    products: productsModules,
    carts: cartsModules,
  },
});
