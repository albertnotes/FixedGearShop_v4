<template>
  <header>
    <nav
      class="navbar navbar-dark bg-dark
    fixed-top flex-md-nowrap p-0 shadow"
    >
      <router-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="/dashboard/product">
        後台管理系統
      </router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">
            登出
            <span class="fas fa-sign-out-alt"></span>
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'BackHeader',
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_API_PATH}/logout`;
      const vm = this;
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/');
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/*
 * Navbar
 */

.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}
</style>
