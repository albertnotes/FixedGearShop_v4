import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import $ from 'jquery';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue';
import router from './router';
import './bus';
import './vee-validate';
import currencyFilter from './filters/currency';
import date from './filters/date';

Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('date', date);
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API_PATH}/api/user/check`;
    Vue.axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/',
        });
        $('#SigninModal').modal('show');
      }
    });
  } else {
    next();
  }
});
