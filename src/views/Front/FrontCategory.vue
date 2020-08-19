<template>
  <div>
    <main>
      <front-hero :container-style="'height: 60vh'" />
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
            <ul
              class="nav d-none d-md-flex flex-md-column justify-content-md-center h5"
            >
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#"
                  :class="{ active: !categoryProduct }"
                  @click.prevent="
                    categoryProduct = '';
                    searchProduct = '';
                  "
                >
                  所有產品
                </a>
              </li>
              <li
                class="nav-item"
                v-for="(category, index) in categories"
                :key="index"
              >
                <a
                  class="nav-link"
                  href="#"
                  :class="{ active: categoryProduct === category }"
                  @click.prevent="
                    categoryProduct = category;
                    searchProduct = '';
                  "
                >
                  {{ category }}
                </a>
              </li>
            </ul>
            <div class="btn-group d-flex d-md-none" role="group">
              <button
                type="button"
                class="btn btn-outline-primary"
                :class="{ active: !categoryProduct }"
                @click.prevent="
                  categoryProduct = '';
                  searchProduct = '';
                "
              >
                所有產品
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                :class="{ active: categoryProduct === category }"
                @click.prevent="
                  categoryProduct = category;
                  searchProduct = '';
                "
                v-for="(category, index) in categories"
                :key="index"
              >
                {{ category }}
              </button>
            </div>
          </div>
          <div class="col-md-9">
            <!-- init categoryProduct-->
            <div class="row mb-5">
              <div class="col-8 col-md-5">
                <div class="input-group input-group-sm">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Search 即時搜尋"
                    v-model="searchProduct"
                    @input="categoryProduct = ''"
                  />
                </div>
              </div>
              <div class="col text-right text-md-left">
                <select
                  class="custom-select custom-select-sm"
                  v-model="selectedEachPageItem"
                  @change="pagination = selectedEachPageItem"
                >
                  <option value="4">4</option>
                  <option value="8" selected>8</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-6 col-lg-4 col-xl-3 pb-5 border-md-bottom"
                v-for="product in products"
                :key="product.id"
              >
                <div class="card card--product">
                  <a
                    href="#"
                    class="card-img"
                    @click.prevent="toDetail(product.id)"
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
              </div>
              <div class="col-12 mt-5">
                <shared-pagination :pagesData="pagination" />
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
import cart from '@/mixins/cart';
import toDetail from '@/mixins/toDetail';
// components
import FrontHero from '@/components/Front/FrontHero.vue';
import SharedPagination from '@/components/Shared/SharedPagination.vue';

export default {
  name: 'FrontCategory',
  data() {
    return {
      selectedEachPageItem: 8,
    };
  },
  computed: {
    products: {
      get() {
        return this.$store.getters['products/paginationProducts'];
      },
    },
    categories: {
      get() {
        return this.$store.getters['products/categories'];
      },
    },
    pagination: {
      get() {
        return this.$store.getters['products/pagination'];
      },
      set(val) {
        this.$store.commit('products/EACHPAGEITEM', val);
      },
    },
    searchProduct: {
      get() {
        return this.$store.state.products.searchProduct;
      },
      set(val) {
        this.$store.commit('products/SEARCHPRODUCT', val);
      },
    },
    categoryProduct: {
      get() {
        return this.$store.state.products.categoryProduct;
      },
      set(val) {
        this.$store.commit('products/CATEGORYPRODUCT', val);
      },
    },
  },
  mixins: [cart, toDetail],
  components: {
    FrontHero,
    SharedPagination,
  },
  mounted() {
    this.$store.commit('HEADERSTATUS', 'fixed-top');
  },
  beforeDestroy() {
    this.$store.commit('HEADERSTATUS', '');
  },
};
</script>

<style lang="scss" scoped>
.nav-link.active {
  color: black;
}
.custom-select {
  max-width: 5rem;
  text-align-last: center;
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
