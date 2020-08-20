export default {
  methods: {
    /**
     * 操作 store products.js
     * @param {*} page 傳入分頁數
     */
    getProducts(page = 1) {
      this.$store.dispatch('products/getProducts', page);
    },
  },
};
