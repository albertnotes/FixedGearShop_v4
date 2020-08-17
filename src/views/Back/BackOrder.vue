<template>
  <div>
    <div class="table-responsive-lg mb-3">
      <table class="table table-sm text-nowrap table-hover">
        <thead>
          <tr class="text-center">
            <th scope="col" class="border-top-0">購買時間</th>
            <th scope="col" class="border-top-0">Email</th>
            <th scope="col" class="border-top-0">購買品項</th>
            <th scope="col" class="border-top-0">應付款項</th>
            <th scope="col" class="border-top-0">付款狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="(order,key) in sortOrder" :key="key">
            <td scope="row" class="align-middle">{{ order.create_at | date }}</td>
            <td class="align-middle">{{ order.user.email }}</td>
            <td class="text-left">
              <ul class="list-unstyled mb-0">
                <li v-for="(product, key) in order.products" :key="key">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right align-middle">{{ order.total | currency }}</td>
            <td v-if="order.is_paid" class="text-success align-middle">已付款</td>
            <td v-else class="text-danger align-middle">未付款</td>
          </tr>
        </tbody>
      </table>
    </div>
    <shared-pagination :pagesData="pagination" @current-page="getOrders"/>
  </div>
</template>

<script>
import SharedPagination from '@/components/Shared/SharedPagination.vue';

export default {
  data(
  ) {
    return {
      orders: [],
      status: {
        isLoading: false,
        fileUploading: false,
      },
      pagination: {},
    };
  },
  components: {
    SharedPagination,
  },
  methods: {
    getOrders(
      page = 1,
    ) {
      const vm = this;
      const api = `
      ${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/orders?page=${page}`;
      vm.status.isLoading = true;
      vm.$http.get(
        api,
      ).then(
        (response) => {
          if (response.data.success) {
            vm.orders = response.data.orders;
            vm.pagination = response.data.pagination;
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
  computed: {
    sortOrder(
    ) {
      const vm = this;
      let tempOrder = [];
      if (vm.orders.length) {
        // 假設 a 已付款 b 未付款
        // 回傳值小於 0 即 a 在前
        // 回傳值大於 0 即 b 在前
        tempOrder = vm.orders.sort(
          (
            a, b,
          ) => {
            const aIsPaid = a.is_paid ? 1 : 0;
            const bIsPaid = b.is_paid ? 1 : 0;
            return bIsPaid - aIsPaid;
          },
        );
      }
      return tempOrder;
    },
  },
  created(
  ) {
    this.getOrders(
    ); // init
  },
};
</script>
