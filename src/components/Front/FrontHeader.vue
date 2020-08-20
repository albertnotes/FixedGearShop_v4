<template>
  <header>
    <nav
      class="navbar navbar-expand-md navbar-dark"
      :class="[{ 'navbar--dark': scrolled }, headerStatus]"
    >
      <div class="container">
        <router-link class="navbar-brand mr-2" to="/">
          <img
            class="navbar-brand__img"
            :src="require('@/assets/images/WheelTalk_Logo.png')"
            alt=""
          />
        </router-link>
        <div class="order-md-1 ml-auto">
          <button
            type="button"
            class="btn navbar-iconbtn shadow-none"
            data-toggle="modal"
            data-target="#LoginModal"
          >
            <span class="fas fa-user-cog"></span>
          </button>
          <button
            class="btn navbar-iconbtn shadow-none"
            data-toggle="modal"
            data-target="#cartModal"
          >
            <span class="fas fa-shopping-cart"></span>
            <span class="badge badge-primary" v-if="cartsTotal > 0">
              {{ cartsTotal }}
            </span>
          </button>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/category">
                產品
              </router-link>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="https://github.com/Albertnotes/FixedGearShop_v4"
                target="_blank"
              >
                作者
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Cart Modal -->
    <div
      class="modal fade"
      id="cartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="cartModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        :class="{ 'modal-lg': cartsTotal > 0 }"
        role="document"
      >
        <div class="modal-content bg-dark text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title" id="cartModalLabel">購物車</h5>
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
            <div v-if="cartsTotal > 0">
              <table
                class="table d-none d-md-table table-dark table-hover
              text-center"
              >
                <thead class="thead-light text-nowrap">
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
                            updateCartQty(
                              cart.product_id,
                              cart.qty - 1,
                              cart.id
                            )
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
                            updateCartQty(
                              cart.product_id,
                              cart.qty + 1,
                              cart.id
                            )
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
                class="table d-table d-md-none table-dark table-hover
              text-center"
              >
                <tbody
                  class="border-0"
                  v-for="(cart, key) in carts.carts"
                  :key="key"
                >
                  <tr>
                    <td class="align-middle" style="width: 40px;">
                      <img :src="cart.product.imageUrl" alt="" width="40" />
                    </td>
                    <td class="align-middle text-left" colspan="2">
                      <span class="font-weight-bold" style="font-size: 14px;">
                        {{ cart.product.title }}
                      </span>
                      <br />
                      <span v-if="cart.product.price" style="font-size: 14px;">
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
                    <td class="align-middle text-right" style="width: 35px;">
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
                    <td class="align-middle border-0 p-md-margin" colspan="2">
                      <div class="c-inputGroup">
                        <button
                          class="btn c-inputGroup__minusBtn"
                          :disabled="cart.qty === 1"
                          @click="
                            updateCartQty(
                              cart.product_id,
                              cart.qty - 1,
                              cart.id
                            )
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
                            updateCartQty(
                              cart.product_id,
                              cart.qty + 1,
                              cart.id
                            )
                          "
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td class="align-middle text-right border-0" colspan="2">
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
            </div>
            <div
              class="d-flex justify-content-center flex-column align-items-center"
              v-else
              style="padding-bottom: 62px;"
            >
              <img
                class="img-fluid mx-auto d-block"
                width="190"
                :src="require('@/assets/images/first-bike-gif.gif')"
                alt=""
              />
              <h5 class="font-weight-bold">購物車目前沒有內容<br /></h5>
              <router-link
                to="/category"
                class="btn btn-danger"
                data-dismiss="modal"
              >
                返回產品
              </router-link>
            </div>
          </div>
          <div class="modal-footer border-0" v-if="cartsTotal > 0">
            <button
              type="button"
              class="btn btn-outline-light px-4"
              data-dismiss="modal"
            >
              取消
            </button>
            <router-link
              class="btn btn-danger px-4"
              to="/checkout"
              data-dismiss="modal"
              >結帳</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-- Signin Modal -->
    <div
      class="modal fade"
      id="LoginModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="LoginModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title" id="LoginModalLabel">
              登入介面
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
            <form class="formSignin" @submit.prevent="signin">
              <img
                class="mb-4 img-fluid"
                :src="require('@/assets/images/WheelTalk_Logo.png')"
                alt=""
                height="64"
              />
              <label for="inputEmail" class="sr-only">電子郵件</label>
              <input
                type="email"
                id="inputEmail"
                v-model="user.username"
                class="form-control"
                placeholder="Email address"
                required
              />
              <label for="inputPassword" class="sr-only">密碼</label>
              <input
                type="password"
                id="inputPassword"
                v-model="user.password"
                class="form-control"
                placeholder="Password"
                required
                autocomplete
              />
              <div class="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> 記住我
                </label>
              </div>
              <button class="btn btn-lg btn-danger btn-block" type="submit">
                登入
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import $ from 'jquery';
import cart from '@/mixin/cart';

export default {
  name: 'FrontHeader',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      scrolled: false,
    };
  },
  computed: {
    carts: {
      get() {
        return this.$store.state.carts.carts;
      },
    },
    cartsTotal: {
      get() {
        return this.carts.carts ? this.carts.carts.length : '';
      },
    },
    headerStatus: {
      get() {
        return this.$store.state.headerStatus;
      },
    },
  },
  mixins: [cart],
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_API_PATH}/admin/signin`;
      const vm = this;
      vm.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          vm.$router.push('/dashboard');
          $('#LoginModal').modal('hide');
        } else {
          vm.openMessage(response.data.message, 'danger');
          $('#LoginModal').modal('hide');
        }
      });
    },
    onScroll() {
      // 獲取當前滾輪高度
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      // 假設 小於 0 回傳空值
      if (currentScrollPosition < 0) {
        return;
      }
      this.scrolled = currentScrollPosition > 1;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
};
</script>

<style lang="scss" scoped>
.p-md-margin {
  @media (min-width: 576px) {
    padding-left: 76px; // 增加 1 td tag width + 12px td padding-left
  }
}

.navbar {
  transition: all 0.5s ease;
}

.navbar.navbar--dark {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: black;
}
.formSignin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
  .checkbox {
    font-weight: 400;
  }
  .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-control:focus {
    z-index: 2;
  }
  input[type='email'] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  input[type='password'] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
select.form-control {
  background-image: none;
  appearance: none;
  text-align: center;
  text-align-last: center;
}
.navbar-brand__img {
  height: 24px;
  @media (min-width: 768px) {
    height: 32px;
  }
}
.navbar-nav > .nav-item {
  .nav-link {
    padding: 0.75rem 1rem;
    height: 50px;
    color: rgba(black, 0.5);
    &:hover,
    &:active,
    &.active {
      color: black;
      font-weight: 700;
    }
    @media (min-width: 768px) {
      color: rgba(white, 0.5);
      &:hover,
      &:active,
      &.active {
        color: white;
      }
    }
  }
}
.navbar-iconbtn {
  padding: 0.75rem 1rem;
  position: relative;
  color: rgba(white, 0.5);
  &:hover,
  &:active,
  &.active {
    color: white;
    font-weight: 700;
  }
  .badge {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    background-color: red;
    border-radius: 50px;
    color: #fff;
  }
}
.navbar-toggler {
  border: none;
  cursor: pointer;
  height: 50px;
  &:focus {
    outline: none !important;
  }
}
@media (max-width: 767.98px) {
  .navbar-nav {
    background-color: #fff;
    border-radius: 0.25rem;
    text-align: left;
    padding: 1.5rem 3rem;
    .nav-link {
      border-bottom: 1px dashed rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
