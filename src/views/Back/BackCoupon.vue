<template>
  <div>
    <div class="form-inline my-2">
      <button class="btn btn-sm btn-primary ml-auto" @click="openModal(true)">
        新增優惠卷
      </button>
    </div>
    <div class="table-responsive-lg mb-3">
      <table class="table table-sm text-nowrap table-hover">
        <thead>
          <tr class="text-center">
            <th scope="col">優惠碼</th>
            <th scope="col">名稱</th>
            <th scope="col" style="width: 10%">折扣百分比</th>
            <th scope="col" style="width: 12%">到期日</th>
            <th scope="col" style="width: 12%">是否啟用</th>
            <th scope="col" style="width: 12%">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="(coupon, key) in coupons" :key="key">
            <td scope="row" class="align-middle">{{ coupon.code }}</td>
            <td class="align-middle">{{ coupon.title }}</td>
            <td class="align-middle">{{ coupon.percent }}</td>
            <td class="align-middle">{{ coupon.due_date | date }}</td>
            <td v-if="coupon.is_enabled" class="text-success align-middle">
              已啟用
            </td>
            <td v-else class="text-danger align-middle">未啟用</td>
            <td class="align-middle">
              <div class="btn-group btn-group-sm" role="group">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="openModal(false, coupon)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="openDelModal(coupon)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <shared-pagination :pagesData="pagination" @current-page="getCoupon" />
    <!-- Modal -->
    <div
      class="modal fade"
      id="CouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="CouponModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md" role="document">
        <ValidationObserver v-slot="{ invalid }">
          <form
            class="modal-content bg-dark text-white"
            @submit.prevent="updateCoupon"
          >
            <div class="modal-header border-0">
              <h5 class="modal-title" id="CouponModalLabel">
                <span>新增優惠卷</span>
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="tempCouponTitle">名稱</label>
                    <ValidationProvider
                      name="名稱"
                      rules="required"
                      immediate
                      v-slot="{ errors, classes }"
                    >
                      <input
                        type="text"
                        class="form-control"
                        id="tempCouponTitle"
                        placeholder="請輸入名稱"
                        v-model="tempCoupon.title"
                        :class="classes"
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="tempCouponCode">優惠碼</label>
                      <ValidationProvider
                        name="優惠碼"
                        rules="required"
                        immediate
                        v-slot="{ errors, classes }"
                      >
                        <input
                          type="text"
                          class="form-control"
                          id="tempCouponCode"
                          placeholder="請輸入優惠碼"
                          v-model="tempCoupon.code"
                          :class="classes"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="due_date">到期日</label>
                      <ValidationProvider
                        name="到期日"
                        rules="required"
                        v-slot="{ errors, classes }"
                        immediate
                      >
                        <datepicker
                          class="text-dark"
                          :value="due_date"
                          @selected="ComponentDate"
                          :input-class="['form-control', classes]"
                        ></datepicker>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="tempCouponPercent">折扣百分比</label>
                      <ValidationProvider
                        name="到期日"
                        rules="required"
                        immediate
                        v-slot="{ errors, classes }"
                      >
                        <input
                          type="number"
                          class="form-control"
                          id="tempCouponPercent"
                          placeholder="請輸入折扣百分比"
                          v-model="tempCoupon.percent"
                          :class="classes"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="tempCouponIs_enabled"
                        v-model="tempCoupon.is_enabled"
                        :true-value="1"
                        :false-value="0"
                      />
                      <label
                        class="form-check-label"
                        for="tempCouponIs_enabled"
                      >
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer border-0">
              <button
                type="button"
                class="btn btn-outline-white"
                data-dismiss="modal"
              >
                取消
              </button>
              <button type="submit" class="btn btn-danger" :disabled="invalid">
                確認
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header border-0 text-danger">
            <h5 class="modal-title" id="delModalLabel">
              <span>刪除優惠卷</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong>
            優惠卷(刪除後將無法恢復)。
          </div>
          <div class="modal-footer border-0">
            <button
              type="button"
              class="btn btn-outline-white px-4"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger px-4"
              @click="updateDelCoupon"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import SharedPagination from '@/components/Shared/SharedPagination.vue';
import Datepicker from 'vuejs-datepicker';

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
      status: {
        fileUploading: false,
      },
      due_date: '', // 轉換時間
    };
  },
  watch: {
    due_date() {
      const vm = this;
      // input type="date" 是字串 - 年月日
      // watch due_date 值當有變動時，轉為時間戳記 會 / 1000 是把毫秒拿掉取整數
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },
  computed: {
    pagination: {
      get() {
        return this.$store.getters['products/pagination'];
      },
      set(val) {
        this.$store.commit('products/EACH_PAGE_ITEM', val);
      },
    },
  },
  components: {
    SharedPagination,
    Datepicker,
  },
  methods: {
    getCoupon(page = 1) {
      const vm = this;
      vm.$store.commit('LOADING', true);
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupons?page=${page}`;
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.coupons = response.data.coupons;
          vm.pagination = response.data.pagination;
          vm.$store.commit('LOADING', false);
        } else {
          vm.$store.commit('LOADING', false);
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger',
          });
        }
      });
    },
    openModal(isNew, Coupon) {
      this.isNew = isNew;
      if (isNew) {
        this.due_date = ''; // init
        this.tempCoupon = {};
      } else {
        // 避免傳址
        this.tempCoupon = { ...Coupon };
        const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
          .toISOString()
          .split('T');
        this.due_date = dateAndTime['0'];
      }
      $('#CouponModal').modal('show');
    },
    updateCoupon() {
      const vm = this;
      let api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        if (response.data.success) {
          $('#CouponModal').modal('hide');
          vm.getCoupon();
        } else {
          $('#CouponModal').modal('hide');
          vm.getCoupon();
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger',
          });
        }
      });
    },
    openDelModal(coupon) {
      this.tempCoupon = coupon;
      $('#delCouponModal').modal('show');
    },
    updateDelCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/Coupon/${vm.tempCoupon.id}`;
      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          $('#delCouponModal').modal('hide');
          vm.getCoupon();
        } else {
          $('#delCouponModal').modal('hide');
          vm.getCoupon();
          vm.$store.dispatch('updateMessage', {
            message: response.data.message,
            status: 'danger',
          });
        }
      });
    },
    ComponentDate(date) {
      this.due_date = date;
    },
  },
  mounted() {
    this.getCoupon(); // init
  },
};
</script>
