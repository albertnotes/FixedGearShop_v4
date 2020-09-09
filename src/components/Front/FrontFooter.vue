<template>
  <footer class="l-footer l-stickyFooter__footer position-relative py-5">
    <div class="container">
      <div class="row">
        <div class="c-mouse">
          <a href="#" class="c-mouse__icon" @click.prevent="scrollToTop">
            <div class="c-mouse__icon__wheel">
              <span class="fas fa-chevron-up"></span>
            </div>
          </a>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <h2>
            <img
              class="l-footer__logo"
              :src="require('@/assets/images/WheelTalk_Logo.png')"
              alt=""
            />
          </h2>
          <p>資料、圖片來源皆來自網路，僅用來做為學習用途。</p>
        </div>
        <div class="col-md-6 l-footer__menu">
          <ul class="nav justify-content-end mb-3">
            <li>
              <a
                href="https://www.facebook.com/WheelTalkFixed/"
                class="h2 mr-3"
                target="_blank"
              >
                <span class="fab fa-facebook"></span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/Slumworm/"
                class="h2 mr-3"
                target="_blank"
              >
                <span class="fab fa-instagram"></span>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/Slumworm"
                class="h2 mr-3"
                target="_blank"
              >
                <span class="fab fa-twitter"></span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Albertnotes/FixedGearShop_v4"
                class="h2"
                target="_blank"
              >
                <span class="fab fa-github"></span>
              </a>
            </li>
          </ul>
          <p class="text-right">{{ author }} © {{ year }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'FrontFooter',
  data() {
    return {
      author: 'Albert',
      year: new Date().getFullYear(),
    };
  },
  methods: {
    scrollToTop() {
      $('html, body').animate({ scrollTop: 0 }, 500);
    },
  },
};
</script>
