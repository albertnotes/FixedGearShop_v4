<template>
  <div>
    <main class="container">
      <section class="l-section" v-if="cartCurrentNumber > 0">
        <h2 class="l-section__title">購物車內容</h2>
        <div class="row justify-content-center">
          <div class="col-md-10">
            <table
              class="table d-none d-md-table table-hover text-center"
            >
              <thead class="thead-dark text-nowrap">
                <th style="width: 5%">刪除</th>
                <th>品名</th>
                <th style="width: 10%">數量</th>
                <th>單價</th>
                <th>總計</th>
              </thead>
              <tbody>
                <tr v-for="(cart, key) in carts.carts" :key="key">
                  <td class="align-middle">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="deleteCart(cart.id)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td class="align-middle">
                    {{ cart.product.title }}
                    <div class="text-success" v-if="cart.coupon">
                      已套用優惠券
                    </div>
                  </td>
                  <td class="align-middle">
                    <div class="c-inputGroup">
                      <button
                        class="btn c-inputGroup__minusBtn"
                        :disabled="cart.qty === 1"
                        @click="
                          cart.qty--;
                          updateCartQty(
                            cart.product_id,
                            cart.qty,
                            cart.id
                          );
                        "
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                      <input
                        type="text"
                        class="form-control"
                        v-model="cart.qty"
                        disabled
                      />
                      <button
                        class="btn c-inputGroup__plusBtn"
                        :disabled="cart.qty === 10"
                        @click="
                          cart.qty++;
                          updateCartQty(
                            cart.product_id,
                            cart.qty,
                            cart.id
                          );
                        "
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td class="align-middle text-right">
                    {{ cart.total | currency }}
                  </td>
                  <td class="align-middle text-right">
                    {{ cart.final_total | currency }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" class="text-right">總計</td>
                  <td class="text-right">
                    {{ carts.total | currency }}
                  </td>
                </tr>
                <tr v-if="carts.final_total !== carts.total">
                  <td colspan="4" class="text-right text-success">
                    折扣價
                  </td>
                  <td class="text-right text-success">
                    {{ carts.final_total | currency }}
                  </td>
                </tr>
              </tfoot>
            </table>
            <table
              class="table d-table d-md-none table-hover text-center"
            >
              <tbody
                class="border-0"
                v-for="(cart, key) in carts.carts"
                :key="key"
              >
                <tr>
                  <td class="align-middle" style="width: 40px;">
                    <img
                      :src="cart.product.imageUrl"
                      alt=""
                      width="40"
                    />
                  </td>
                  <td class="align-middle text-left" colspan="2">
                    <span
                      class="font-weight-bold"
                      style="font-size: 14px;"
                    >
                      {{ cart.product.title }}
                    </span>
                    <br />
                    <span
                      v-if="cart.product.price"
                      style="font-size: 14px;"
                    >
                      {{ cart.product.price | currency }}
                    </span>
                    <span v-else style="font-size: 14px;">
                      {{ cart.product.origin_price | currency }}
                    </span>
                    <span
                      class="text-success"
                      v-if="cart.coupon"
                      style="font-size: 14px;"
                    >
                      已套用優惠券
                    </span>
                  </td>
                  <td
                    class="align-middle text-right"
                    style="width: 35px;"
                  >
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="deleteCart(cart.id)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td
                    class="align-middle border-0 p-md-margin"
                    colspan="2"
                  >
                    <div class="c-inputGroup">
                      <button
                        class="btn c-inputGroup__minusBtn"
                        :disabled="cart.qty === 1"
                        @click="
                          cart.qty--;
                          updateCartQty(
                            cart.product_id,
                            cart.qty,
                            cart.id
                          );
                        "
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                      <input
                        type="text"
                        class="form-control"
                        v-model="cart.qty"
                        disabled
                      />
                      <button
                        class="btn c-inputGroup__plusBtn"
                        :disabled="cart.qty === 10"
                        @click="
                          cart.qty++;
                          updateCartQty(
                            cart.product_id,
                            cart.qty,
                            cart.id
                          );
                        "
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td
                    class="align-middle text-right border-0"
                    colspan="2"
                  >
                    {{ cart.final_total | currency }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">總計</td>
                  <td colspan="2" class="text-right">
                    {{ carts.total | currency }}
                  </td>
                </tr>
                <tr v-if="carts.final_total !== carts.total">
                  <td colspan="2" class="text-right text-success">
                    折扣價
                  </td>
                  <td colspan="2" class="text-right text-success">
                    {{ carts.final_total | currency }}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                v-model="coupon_code"
                style="text-align-last: center;"
                placeholder="請輸入優惠碼"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-danger"
                  type="button"
                  @click="addCouponCode"
                >
                  套用優惠碼
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="l-section" v-if="cartCurrentNumber > 0">
        <h2 class="l-section__title">結帳表單</h2>
        <div class="row justify-content-center">
          <ValidationObserver class="col-md-10" v-slot="{ invalid }">
            <form @submit.prevent="createOrder">
              <div class="form-group">
                <label for="useremail">Email <span>*</span></label>
                <ValidationProvider
                  name="E-mail"
                  rules="required|email"
                  v-slot="{ errors, classes }"
                >
                  <input
                    type="email"
                    class="form-control"
                    id="useremail"
                    :class="classes"
                    v-model="form.user.email"
                    placeholder="請輸入 Email"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <label for="username"
                  >收件人姓名 <span>*</span></label
                >
                <ValidationProvider
                  name="姓名"
                  v-slot="{ errors, classes }"
                >
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    :class="classes"
                    v-model="form.user.name"
                    placeholder="輸入姓名"
                    required
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <ValidationProvider
                  name="電話"
                  :rules="{ regex: /[0-9]{9}/ }"
                  v-slot="{ errors, classes }"
                >
                  <label for="usertel"
                    >收件人電話 <span>*</span></label
                  >
                  <input
                    type="tel"
                    class="form-control"
                    id="usertel"
                    :class="classes"
                    v-model="form.user.tel"
                    placeholder="請輸入電話"
                    required
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <label for="useraddress"
                  >收件人地址 <span>*</span></label
                >
                <ValidationProvider
                  name="地址"
                  v-slot="{ errors, classes }"
                >
                  <input
                    type="text"
                    class="form-control"
                    id="useraddress"
                    :class="classes"
                    v-model="form.user.address"
                    placeholder="請輸入地址"
                    required
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <label for="comment">留言</label>
                <textarea
                  name=""
                  id="comment"
                  class="form-control"
                  cols="30"
                  rows="10"
                  v-model="form.message"
                />
              </div>
              <div class="text-right">
                <button
                  class="btn btn-outline-danger"
                  type="submit"
                  :class="{ 'not-allowed': invalid }"
                  :disabled="invalid"
                >
                  送出訂單
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </section>
      <section class="l-section" v-else>
        <h2 class="l-section__title l-section__title--marginTop">
          購物車內容
        </h2>
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div
              class="d-flex justify-content-center flex-column align-items-center"
            >
              <img
                class="img-fluid mx-auto d-block"
                width="190"
                :src="require('@/assets/images/first-bike-gif.gif')"
                alt=""
              />
              <h5 class="font-weight-bold">
                購物車目前沒有內容<br />
              </h5>
              <router-link
                to="/category"
                class="btn btn-danger"
                data-dismiss="modal"
              >
                返回產品
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
// mixins
import cart from '@/mixins/cart';
import cartOrder from '@/mixins/cartOrder';
// components
import FrontHeader from '@/components/Front/FrontHeader.vue';

export default {
  name: 'FrontCheckout',
  data() {
    return {
      status: {
        isLoading: false,
      },
    };
  },
  mixins: [cart, cartOrder],
};
</script>

<style lang="scss" scoped>
.p-md-margin {
  @media (min-width: 576px) {
    padding-left: 76px; // 增加 1 td tag width + 12px td padding-left
  }
}
.cartImage {
  position: relative;
  .cartImage__text {
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.not-allowed {
  cursor: not-allowed;
}
</style>
