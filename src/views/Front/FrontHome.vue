<template>
  <div>
    <main>
      <keep-alive>
        <front-home-video :container-style="'height: 70vh'" />
      </keep-alive>
      <section class="container l-section">
        <h2 class="l-section__title">
          產品導覽
        </h2>
        <div class="row mb-n4 mb-md-0">
          <div
            class="col-md-4 mb-4 mb-md-0"
            v-for="(category, index) in categories"
            :key="index"
          >
            <figure
              class="l-sectionImage"
              :class="`l-sectionImage--${index + 1}`"
            >
              <figcaption>
                <a
                  href="#"
                  class="l-sectionImage__text h4"
                  @click.prevent="toCategory(category)"
                >
                  {{ category }}
                </a>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section class="l-section">
        <h2 class="l-section__title">
          影片介紹
        </h2>
        <div class="bg-light">
          <div class="container">
            <div class="row align-items-center" id="playerContainer">
              <div class="col-lg-6 p-0">
                <lazy-youtube-video
                  v-if="videoshow"
                  :autoplay="true"
                  src="https://www.youtube.com/embed/Pn6ie1zCkZU"
                  aspectRatio="4:3"
                />
              </div>
              <div class="col-lg-6 l-section__about p-5">
                <p>
                  Fixed Gear 的真正興起要歸功於紐約的 Bike Messenger
                  們， 時間撥回上個世紀 70
                  年代末，美國的汽車數量和出行使用率呈
                  現出爆炸式的增長，導致了紐約等大城市的道路交通狀況愈發擁
                  堵。
                </p>
                <p>
                  爲了不影響送信時間並提升效率，Bike Messenger 逐漸成
                  爲各大公司主推的派送服務。郵差們開始改用騎車的方式運送郵
                  件，通過騎車不僅可以自由的穿梭在城市 CBD
                  的大街小巷之間
                  ，同時也避免了市內停車所帶來的限制、費用與罰款。
                </p>
                <p>
                  影片便講述了一位自行車郵差在曼哈頓街頭所經曆的「生死速遞」。
                </p>
                <div class="text-center text-md-left">
                  <a
                    href="https://en.wikipedia.org/wiki/Premium_Rush"
                    target="_blank"
                    class="btn btn-primary px-5"
                  >
                    了解更多
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="container l-section">
        <div class="text-center mb-5">
          <h2 class="mb-3 l-section__title">
            新品上市
          </h2>
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-outline-primary"
              :class="{ active: !categoryProduct }"
              @click.prevent="
                categoryProduct = '';
                searchProduct = '';
                getProducts();
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
                getProducts();
              "
              v-for="(category, index) in categories"
              :key="index"
            >
              {{ category }}
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <swiper class="swiper h-100" :options="swiperOptionMuch">
              <swiper-slide
                v-for="product in products"
                :key="product.id"
              >
                <div class="card card--product">
                  <a
                    href="#"
                    class="card-img"
                    @click.prevent="toDetail(product.id)"
                  >
                    <img
                      :src="product.imageUrl"
                      alt=""
                      class="img-fluid"
                    />
                  </a>
                  <div class="card-body">
                    <h5 class="card-title text-truncate">
                      {{ product.title }}
                    </h5>
                    <div class="cardPrice">
                      <span
                        class="cardPrice__title"
                        v-if="product.price"
                      >
                        {{ product.price | currency }}
                      </span>
                      <span v-if="!product.price">
                        {{ product.origin_price | currency }}
                      </span>
                      <del
                        class="cardPrice__subtitle"
                        v-if="product.price"
                      >
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
      </section>
      <section class="l-section">
        <h2 class="l-section__title l-section__title--marginTop">
          現場體驗
        </h2>
        <div class="bg-light">
          <div class="container">
            <div class="row flex-md-row-reverse align-items-center">
              <div class="col-md-6">
                <figure
                  class="l-sectionImage l-sectionImage--4"
                ></figure>
              </div>
              <div
                class="col-md-6 l-section__about p-md-5 py-5 text-center text-md-right"
              >
                <h3 class="h4">
                  想體驗方式如下：
                </h3>
                <ul class="list-unstyled px-3">
                  <li>
                    <span
                      class="far fa-clock"
                      style="width: 16px;"
                    ></span>
                    每週一、三下午14:00 - 17:00
                  </li>
                  <li>
                    <span
                      class="fas fa-map-marker-alt"
                      style="width: 16px;"
                    ></span>
                    桃園市中壢區永嘉街25號3樓
                  </li>
                </ul>
                <p>
                  僅提供現場車款，不收取任何費用。
                </p>
                <a
                  href="https://www.facebook.com/pg/WheelTalkFixed/about/?ref=page_internal"
                  target="_blank"
                  class="btn btn-primary px-5"
                >
                  預約體驗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="container l-section">
        <div class="text-center mb-5">
          <h2 class="mb-3 l-section__title">
            專業推薦
          </h2>
        </div>
        <div class="row">
          <div class="col-md-4 mb-4 mb-md-0">
            <figure class="l-sectionImage l-sectionImage--4">
              <figcaption>
                <a
                  href="http://www.wheeltalkfixed.com/2017/fgfs-portland-day-1/"
                  class="l-sectionImage__text"
                  target="_blank"
                >
                  FGFS PORTLAND<br />
                  <small>October 2, 2017</small>
                </a>
              </figcaption>
            </figure>
          </div>
          <div class="col-md-4 mb-4 mb-md-0">
            <figure class="l-sectionImage l-sectionImage--5">
              <figcaption>
                <a
                  href="http://www.wheeltalkfixed.com/2018/fixed-gear-portland-this-is-a-sign/"
                  class="l-sectionImage__text"
                  target="_blank"
                >
                  FIXED GEAR PORTLAND<br />
                  <small>March 25, 2018</small>
                </a>
              </figcaption>
            </figure>
          </div>
          <div class="col-md-4">
            <figure class="l-sectionImage l-sectionImage--6">
              <figcaption>
                <a
                  href="http://www.wheeltalkfixed.com/2017/mash-parallax-turning-of-the-tide/"
                  class="l-sectionImage__text"
                  target="_blank"
                >
                  MASH PARALLAX<br />
                  <small>October 25, 2017</small>
                </a>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
// mixins
import getProducts from '@/mixins/getProducts';
import cart from '@/mixins/cart';
import toDetail from '@/mixins/toDetail';
import swiperData from '@/mixins/swiperData';

// components
import FrontHomeVideo from '@/components/Front/FrontHomeVideo.vue';

// 影片套件
import LazyYoutubeVideo from 'vue-lazy-youtube-video';

export default {
  name: 'FrontHome',
  data() {
    return {
      status: {
        isLoading: false,
      },
      videoshow: true, // 預設顯示
    };
  },
  computed: {
    products: {
      get() {
        return this.$store.getters['products/filteredProducts'];
      },
    },
    categories: {
      get() {
        return this.$store.getters['products/categories'];
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
  mixins: [getProducts, cart, toDetail, swiperData],
  components: {
    FrontHomeVideo,
    LazyYoutubeVideo,
  },
  methods: {
    toCategory(category) {
      this.$store.commit('products/CATEGORYPRODUCT', category);
      this.$router.push('/category');
    },
    playedScrollObserver() {
      const vm = this;
      // Intersection Observer Web API
      // 監聽元素區塊
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              vm.videoshow = true;
            } else {
              vm.videoshow = false;
            }
          });
        },
      );
      const el = document.querySelector('#playerContainer');
      const vw = window.screen.width;
      /**
       * 影片 template 39 - 45行
       * 螢幕斷點 min-width 992px 兩欄式
       * 執行 IntersectionObserver API 滾動播放
       * 註記：mobile不支援autoplay播放
       */
      if (vw >= 992) {
        intersectionObserver.observe(el);
      }
    },
  },
  mounted() {
    this.$store.commit('HEADERSTATUS', 'fixed-top');
    this.playedScrollObserver();
  },
  beforeDestroy() {
    this.$store.commit('HEADERSTATUS', '');
  },
};
</script>

<style lang="scss" scoped>
@import '~vue-lazy-youtube-video/dist/style.css';
</style>
