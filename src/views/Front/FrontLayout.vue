<template>
  <div class="l-stickyFooter">
    <loading :active.sync="isloading">
      <template name="default">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </template>
    </loading>
    <shared-alert />
    <front-header />
    <router-view class="l-stickyFooter__main" />
    <front-footer />
  </div>
</template>

<script>
// mixins
import getProducts from '@/mixin/getProducts';

// components
import SharedAlert from '@/components/Shared/SharedAlert.vue';
import FrontHeader from '@/components/Front/FrontHeader.vue';
import FrontFooter from '@/components/Front/FrontFooter.vue';

export default {
  computed: {
    isloading: {
      get() {
        return this.$store.state.isLoading;
      },
    },
  },
  components: {
    SharedAlert,
    FrontHeader,
    FrontFooter,
  },
  mixins: [getProducts],
  created() {
    this.$store.commit('LOADING', true);
  },
  mounted() {
    this.getProducts();
    this.$store.commit('LOADING', false);
  },
};
</script>
