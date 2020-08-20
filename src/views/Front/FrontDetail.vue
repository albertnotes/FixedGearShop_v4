<template>
  <div>
    <main class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent border-bottom rounded-0 h5 mb-0">
          <li class="breadcrumb-item">
            <router-link to="/">首頁</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/category">產品</router-link>
          </li>
          <li class="breadcrumb-item active">
            {{ product.category }}
          </li>
        </ol>
      </nav>
      <section class="row l-section">
        <div class="col-md-7">
          <img
            class="img-fluid mx-auto d-block"
            :src="product.imageUrl"
            alt=""
          />
        </div>
        <div class="col-md-5">
          <h3 class="mb-5">{{ product.title }}</h3>
          <h5>規格</h5>
          <p>{{ product.description }}</p>
          <h5>說明</h5>
          <p>{{ product.content }}</p>
          <div class="my-4 py-2 bg-light text-center">
            <span class="fas fa-truck mr-3"></span>
            <span>免運費</span>
          </div>
          <div class="d-flex justify-content-between align-items-center py-3">
            <div>
              <h6 class="font-weight-bold" v-if="!product.price">
                {{ product.origin_price | currency }}
              </h6>
              <del
                class="small text-muted font-weight-bold"
                v-if="product.price"
              >
                {{ product.origin_price | currency }}
              </del>
              <h5 class="text-danger font-weight-bold" v-if="product.price">
                {{ product.price | currency }}
              </h5>
            </div>
            <div class="text-muted">
              <span v-if="!product.price">
                小計
                {{ (product.origin_price * qty) | currency }}
              </span>
              <span v-if="product.price">
                小計 {{ (product.price * qty) | currency }}
              </span>
            </div>
          </div>
          <div
            class="
          d-flex justify-content-between
          align-items-md-center flex-column flex-md-row"
          >
            <div class="c-inputGroup mb-3 mr-md-3 mb-md-0">
              <button
                class="btn c-inputGroup__minusBtn"
                :disabled="qty== 1"
                @click="qty--"
              >
                <i class="fas fa-minus"></i>
              </button>
              <input
                type="text"
                class="form-control"
                v-model="qty"
                disabled
              />
              <button
                class="btn c-inputGroup__plusBtn"
                :disabled="qty === 10"
                @click="qty++"
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <button
              type="button"
              class="btn btn-danger px-4 w-100"
              @click="addToCart(product.id, qty)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </section>
      <div class="row l-section justify-content-center">
        <h2 class="l-section__title">其他產品</h2>
        <div class="col">
          <swiper class="swiper h-100" :options="swiperOptionMuch">
            <swiper-slide v-for="product in products" :key="product.id">
              <div class="card card--product">
                <a
                  href="#"
                  class="card-img"
                  @click.prevent="
                    toDetail(product.id);
                    updateDetailId();
                  "
                >
                  <img :src="product.imageUrl" alt="" class="img-fluid" />
                </a>
                <div class="card-body">
                  <h5 class="card-title text-truncate">
                    {{ product.title }}
                  </h5>
                  <div class="cardPrice">
                    <span class="cardPrice__title" v-if="product.price">
                      {{ product.price | currency }}
                    </span>
                    <span v-if="!product.price">
                      {{ product.origin_price | currency }}
                    </span>
                    <del class="cardPrice__subtitle" v-if="product.price">
                      {{ product.origin_price | currency }}
                    </del>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="addToCart(product.id)"
                >
                  加入購物車
                </button>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// mixins
import getProduct from '@/mixin/getProduct';
import getProducts from '@/mixin/getProducts';
import cart from '@/mixin/cart';
import toDetail from '@/mixin/toDetail';
import swiperData from '@/mixin/swiperData';

export default {
  name: 'FrontDetail',
  data() {
    return {
      qty: 1,
    };
  },
  mixins: [getProduct, getProducts, cart, toDetail, swiperData],
  methods: {
    updateDetailId() {
      this.detailId = this.$route.params.detailId;
      this.getProduct(this.detailId);
    },
  },
  computed: {
    products: {
      get() {
        return this.$store.getters['products/filteredProducts'];
      },
    },
  },
  mounted() {
    this.$store.commit('HEADER_STATUS', 'bg-black');
    this.detailId = this.$route.params.detailId;
    this.getProduct(this.detailId);
  },
  beforeDestroy() {
    this.$store.commit('HEADER_STATUS', '');
  },
};
</script>

<style lang="scss" scoped></style>
