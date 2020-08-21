import axios from 'axios';

export default {
  namespaced: true,
  state: {
    allProducts: [],
    products: [],
    searchProduct: '',
    categoryProduct: '',
    pagination: {
      eachPageItem: 8,
      currentPage: 1,
    },
  },
  mutations: {
    ALL_PRODUCTS(state, payload) {
      state.allProducts = payload;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    SEARCH_PRODUCT(state, searched) {
      state.searchProduct = searched;
    },
    CATEGORY_PRODUCT(state, categories) {
      state.categoryProduct = categories;
    },
    EACH_PAGE_ITEM(state, item) {
      state.pagination.eachPageItem = Number(item);
    },
    CURRENT_PAGE(state, page) {
      state.pagination.currentPage = Number(page);
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
            commit('ALL_PRODUCTS', response.data.products);
          }
        })
        .then(() => {
          commit('CURRENT_PAGE', page);
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
    pagination(state, getters) {
      const allPageItem = getters.filteredProducts.length;
      const { eachPageItem, currentPage } = state.pagination;
      const setting = {
        eachPageItem,
        currentPage,
      };
      setting.totalPages = Math.ceil(allPageItem / setting.eachPageItem);
      setting.hasPre = setting.currentPage > 1;
      setting.hasNext = setting.currentPage < setting.totalPages;
      return setting;
    },
    paginationProducts(state, getters) {
      const { currentPage, eachPageItem } = getters.pagination;
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
