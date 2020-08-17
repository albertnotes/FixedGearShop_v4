import axios from 'axios';

export default {
  namespaced: true,
  state: {
    carts: [],
  },
  mutations: {
    CARTS(state, payload) {
      state.carts = payload;
    },
  },
  actions: {
    getCart({ commit }) {
      commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      axios.get(api).then((response) => {
        if (response.data.success) {
          commit('CARTS', response.data.data);
          commit('LOADING', false, { root: true });
        }
      });
    },
    addToCart({ commit, dispatch }, { id, qty = 1 }) {
      commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(api, { data: cart }).then((response) => {
        if (response.data.success) {
          dispatch('getCart');
        }
      });
    },
    deleteCart({ commit, dispatch }, id) {
      commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`;
      axios.delete(api).then((response) => {
        if (response.data.success) {
          dispatch('getCart');
        }
      });
    },
    updateCartQty({ commit, dispatch }, { addId, qty, deleteId }) {
      commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const cart = {
        product_id: addId,
        qty,
      };
      axios.post(api, { data: cart }).then((responseA) => {
        if (responseA.data.success) {
          dispatch('deleteCart', deleteId);
        }
      });
    },
  },
  getters: {
    cartsTotal(state) {
      return state.carts.carts.length;
    },
  },
};
