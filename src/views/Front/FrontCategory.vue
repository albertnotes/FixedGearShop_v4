<template>
  <div>
    <main>
      <front-hero :container-style="'height: 60vh'"/>
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent h5 border-bottom rounded-0 mb-4">
            <li class="breadcrumb-item">
              <router-link to="/">首頁</router-link>
            </li>
            <li class="breadcrumb-item active">
              產品
            </li>
          </ol>
        </nav>
        <div class="row">
          <div class="col-md-3 mb-4">
            <ul class="nav d-none d-md-flex flex-md-column justify-content-md-center h5">
              <li class="nav-item">
                <a class="nav-link" href="#" :class="{ 'active': categoryProduct === '' }"
                  @click.prevent="categoryProduct = ''; searchProduct = ''; getProducts()">
                  所有產品
                </a>
              </li>
              <li class="nav-item" v-for='(category, index) in getCategory' :key="index">
                <a class="nav-link" href="#" :class="{ 'active': categoryProduct === category }"
                  @click.prevent="categoryProduct = category; searchProduct = ''; getProducts()">
                  {{ category }}
                </a>
              </li>
            </ul>
            <div class="btn-group d-flex d-md-none" role="group">
              <button type="button" class="btn btn-outline-primary"
              :class="{'active': !categoryProduct}"
              @click.prevent="categoryProduct = ''; searchProduct = ''; getProducts()">
                所有產品
              </button>
              <button type="button" class="btn btn-outline-primary"
              :class="{'active': categoryProduct === category}"
              @click.prevent="categoryProduct = category; searchProduct = ''; getProducts()"
              v-for="(category, index) in getCategory" :key="index">
                {{ category }}
              </button>
            </div>
          </div>
          <div class="col-md-9">
            <!-- init categoryProduct-->
            <div class="row mb-5">
              <div class="col-8 col-md-5">
                <div class="input-group input-group-sm">
                  <input class="form-control"
                  type="text" placeholder="Search 請按 Enter"
                  v-model="searchProduct"
                  @keyup.enter="getProducts(1,searchProduct); categoryProduct = '';">
                  <div class="input-group-append">
                    <button class="btn btn-dark"
                    @click="getProducts(1,searchProduct); categoryProduct = '';">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col text-right text-md-left">
                <select class="custom-select custom-select-sm"
                v-model="pagination.eachPageItem"
                @change="getProducts()">
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-lg-4 col-xl-3 pb-5 border-md-bottom"
              v-for='product in products' :key="product.id">
                <div class="card card--product">
                  <a href="#" class="card-img" @click.prevent="toDetail(product.id)">
                    <img :src="product.imageUrl" alt="" class="img-fluid">
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
                  <button type="button" class="btn btn-danger"
                    @click="addToCart(product.id)">
                    加入購物車
                  </button>
                </div>
              </div>
              <div class="col-12 mt-5">
                <shared-pagination :pagesData="pagination" @current-page="getProducts"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// mixins
import getProducts from '@/mixins/getProducts';
import cart from '@/mixins/cart';
import toDetail from '@/mixins/toDetail';
// components
import FrontHeader from '@/components/Front/FrontHeader.vue';
import FrontHero from '@/components/Front/FrontHero.vue';
import SharedPagination from '@/components/Shared/SharedPagination.vue';

export default {
  name: 'FrontCategory',
  data(
  ) {
    return {
      status: {
        isLoading: false,
      },
    };
  },
  mixins: [
    getProducts,
    cart,
    toDetail,
  ],
  components: {
    FrontHeader,
    FrontHero,
    SharedPagination,
  },
  methods: {
    toCategory(
      category,
    ) {
      this.categoryProduct = category;
      this.getProducts(
      );
    },
  },
  computed: {
    getCategory(
    ) {
      const vm = this;
      const temp = [];
      // 過濾重覆 category 值
      vm.allProducts.forEach(
        (element) => {
          if (!temp.includes(
            element.category,
          )) {
            temp.push(
              element.category,
            );
          }
        },
      );
      // 字串排序
      return temp.sort(
        (
        ) => 0 - 1,
      );
    },
  },
  created(
  ) {
    // 註冊監聽 message:category 事件，參數為 fn
    this.$bus.$on(
      'message:category', this.toCategory,
    );
    this.getProducts(
    );
    this.getCart(
    );
  },
  beforeDestroy(
  ) {
    // 手動銷毀事件，eventBus 不會自動清除
    this.$bus.$off(
      'message:category', this.toCategory,
    );
  },
};
</script>

<style lang="scss" scoped>
  .nav-link.active {
    color: black;
  }
  .custom-select {
    max-width: 5rem;
    text-align-last:center;
  }
  .border-md-bottom {
    @media (max-width: 767px) {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 15px;
        left: 15px;
        height: 1px;
        background-color: #8d82a4;
      }
      & + & {
        padding-top: 2rem;
      }
    }
  }
</style>
