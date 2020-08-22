export default {
  methods: {
    addToCart(id, qty = 1) {
      this.$store.dispatch('carts/addToCart', { id, qty });
    },
    deleteCart(id) {
      this.$store.dispatch('carts/deleteCart', id);
    },
    updateCartQty(addId, qty, deleteId) {
      this.$store.dispatch('carts/updateCartQty', { addId, qty, deleteId });
    },
  },
};
