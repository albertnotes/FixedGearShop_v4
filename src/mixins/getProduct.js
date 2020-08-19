/**
 * 使用請注意 data 衝突
 */

export default {
  data() {
    return {
      product: {},
    };
  },
  methods: {
    getProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      vm.$store.commit('LOADING', true);
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.product = response.data.product;
          vm.$store.commit('LOADING', false);
        } else {
          vm.$bus.$emit(
            'message:push',
            response.data.message,
            'danger',
          );
          vm.$store.commit('LOADING', false);
        }
      });
    },
  },
};
