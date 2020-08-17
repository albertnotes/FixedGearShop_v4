export default {
  data() {
    return {
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    addCouponCode() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.$http.post(api, { data: coupon }).then((response) => {
        if (response.data.success) {
          vm.getCart();
        } else {
          vm.getCart();
          vm.$bus.$emit(
            'message:push',
            response.data.message,
            'danger',
          );
        }
      });
    },
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order`;
      const form = { ...vm.form };
      vm.$http.post(api, { data: form }).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/cartorder/${response.data.orderId}`);
        }
      });
    },
  },
};
