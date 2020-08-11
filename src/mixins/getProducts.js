export default {
  methods: {
    /**
     * 操作 Vuex products.js
     * @param {*} page 傳入分頁數
     */
    getProducts(page) {
      this.$store.dispatch('products/getProducts', page);
    },
  },
};
