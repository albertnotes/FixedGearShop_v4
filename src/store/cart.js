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
    addToCart({ dispatch }, { id, qty = 1 }) {
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
    deleteCart({ dispatch }, id) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`;
      axios.delete(api).then((response) => {
        if (response.data.success) {
          dispatch('getCart');
        }
      });
    },
    updateCartQty({ dispatch }, { addId, qty, deleteId }) {
      let api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const cart = {
        product_id: addId,
        qty,
      };
      axios.post(api, { data: cart }).then((responseA) => {
        if (responseA.data.success) {
          api = `${api}/${deleteId}`;
          axios.delete(api).then((responseB) => {
            if (responseB.data.success) {
              dispatch('getCart');
            }
          });
          return;
        }
        dispatch('getCart');
      });
    },
  },
  getters: {
    cartsTotal(state) {
      return state.carts.length;
    },
  },
};
