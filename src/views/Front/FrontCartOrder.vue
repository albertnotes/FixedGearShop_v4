<template>
  <div>
    <main class="container">
      <section class="l-section">
        <h2 class="l-section__title" v-if="order.is_paid === false">
          付款確認
        </h2>
        <h2 class="l-section__title" v-else>付款完成</h2>
        <div
          class="row justify-content-center"
          v-if="order.is_paid === false"
        >
          <form class="col-md-10" @submit.prevent="payOrder">
            <table class="table d-none d-md-table table-hover">
              <thead class="thead-dark text-center">
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="align-middle text-center">
                    {{ item.product.title }}
                  </td>
                  <td class="align-middle text-center">
                    {{ item.qty }}/{{ item.product.unit }}
                  </td>
                  <td class="align-middle text-right">
                    {{ item.final_total | currency }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">總計</td>
                  <td class="text-right">
                    {{ order.total | currency }}
                  </td>
                </tr>
              </tfoot>
            </table>
            <table class="table d-table d-md-none table-hover">
              <tbody
                class="border-0"
                v-for="item in order.products"
                :key="item.id"
              >
                <tr>
                  <td class="align-middle" colspan="2">
                    {{ item.product.title }}
                  </td>
                </tr>
                <tr>
                  <td class="align-middle border-0">
                    {{ item.qty }}/{{ item.product.unit }}
                  </td>
                  <td class="align-middle text-right border-0">
                    {{ item.final_total | currency }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="text-right">總計</td>
                  <td class="text-right">
                    {{ order.total | currency }}
                  </td>
                </tr>
              </tfoot>
            </table>
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th style="width: 110px">Email</th>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <th>收件人電話</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <span v-if="!order.is_paid">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-right">
              <button class="btn btn-danger">確認付款去</button>
            </div>
          </form>
        </div>
        <div class="row justify-content-center" v-else>
          <div class="col-md-6">
            <div class="l-sectionImage l-sectionImage--2"></div>
          </div>
          <div class="col-md-6">
            <table class="table">
              <thead class="thead-dark text-center">
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="align-middle text-center">
                    {{ item.product.title }}
                  </td>
                  <td class="align-middle text-center">
                    {{ item.qty }}/{{ item.product.unit }}
                  </td>
                  <td class="align-middle text-right">
                    {{ item.final_total | currency }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">總計</td>
                  <td class="text-right">
                    {{ order.total | currency }}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div class="text-right">
              <router-link to="/" class="btn btn-outline-dark mr-3"
                >返回首頁</router-link
              >
              <router-link to="/category" class="btn btn-danger"
                >繼續逛逛</router-link
              >
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'FrontPay',
  data() {
    return {
      orderId: '',
      order: {
        user: '',
      },
      status: {
        isLoading: false,
      },
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order/${vm.orderId}`;
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.order = response.data.order;
        }
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/pay/${vm.orderId}`;
      vm.status.isLoading = true;
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.getOrder();
          setTimeout(() => {
            vm.status.isLoading = false;
          }, 500);
        }
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>

<style lang="scss" scoped></style>
