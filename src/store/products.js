import axios from 'axios';

export default {
  namespaced: true,
  state: {
    allProducts: [],
    products: [],
    searchProduct: '',
    categoryProduct: '',
    pagination: {},
  },
  mutations: {
    ALLPRODUCTS(state, payload) {
      state.allProducts = payload;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    SEARCHPRODUCT(state, searched) {
      state.searchProduct = searched;
    },
    CATEGORYPRODUCT(state, categories) {
      state.categoryProduct = categories;
    },
    PAGINATION(state, page) {
      const pageSetting = {
        currentPage: page,
        hasPre: false,
        hasNext: false,
        eachPageItem: 8,
        total_pages: '',
      };
      const allPageItem = state.allProducts.length;
      pageSetting.total_pages = Math.ceil(allPageItem / pageSetting.eachPageItem);
      pageSetting.hasPre = pageSetting.currentPage > 1;
      pageSetting.hasNext = pageSetting.currentPage < pageSetting.total_pages;
      state.pagination = pageSetting;
    },
  },
  actions: {
    getProducts({ commit }, page = 1) {
      commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
      axios
        .get(api)
        .then((response) => {
          if (response.data.success) {
            commit('ALLPRODUCTS', response.data.products);
          }
        })
        .then(() => {
          commit('PAGINATION', page);
          commit('LOADING', false, { root: true });
        });
    },
  },
  getters: {
    filteredProducts(state) {
      const { searchProduct, categoryProduct } = state;
      const resultProducts = (val, range) => state.allProducts.filter(
        (element) => element[val].match(state[range]),
      );
      if (searchProduct !== '') {
        return resultProducts('title', 'searchProduct');
      }
      if (categoryProduct !== '') {
        return resultProducts('category', 'categoryProduct');
      }
      return state.allProducts;
    },
    paginationProducts(state, getters) {
      const { currentPage, eachPageItem } = state.pagination;
      const minPageItem = currentPage * eachPageItem - eachPageItem + 1;
      const maxPageItem = currentPage * eachPageItem;
      return getters.filteredProducts.filter((element, index) => {
        const number = index + 1;
        return number >= minPageItem && number <= maxPageItem;
      });
    },
    categories(state) {
      const temp = [];
      state.allProducts.forEach((element) => {
        if (!temp.includes(element.category)) {
          temp.push(element.category);
        }
      });
      return temp.sort(() => 0 - 1);
    },
  },
};
