/**
 * 使用請注意 data 衝突
*/

export default {
  data(
  ) {
    return {
      product: {},
    };
  },
  methods: {
    getProduct(
      id,
    ) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      vm.status.isLoading = true;
      vm.$http.get(
        api,
      ).then(
        (response) => {
          if (response.data.success) {
            vm.product = response.data.product;
            setTimeout(
              (
              ) => {
                vm.status.isLoading = false;
              }, 500,
            );
          } else {
            vm.$bus.$emit(
              'message:push', response.data.message, 'danger',
            );
            setTimeout(
              (
              ) => {
                vm.status.isLoading = false;
              }, 500,
            );
          }
        },
      );
    },
  },
};
