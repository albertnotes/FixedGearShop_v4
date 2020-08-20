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
          dispatch('getCart').then(() => {
            dispatch('updateMessage', {
              message: response.data.message,
              status: 'success',
            }, { root: true });
          });
        }
      });
    },
    deleteCart({ commit, dispatch }, id) {
      commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`;
      axios.delete(api).then((response) => {
        if (response.data.success) {
          dispatch('getCart').then(() => {
            dispatch('updateMessage', {
              message: response.data.message,
              status: 'danger',
            }, { root: true });
          });
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
      axios.post(api, { data: cart }).then((response) => {
        if (response.data.success) {
          dispatch('deleteCart', deleteId).then(() => {
            dispatch('updateMessage', {
              message: '數量已更新',
              status: 'success',
            }, { root: true });
          });
        } else {
          dispatch('updateMessage', {
            message: '數量更新失敗',
            status: 'danger',
          }, { root: true });
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
