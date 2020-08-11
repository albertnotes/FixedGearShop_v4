<template>
  <nav class="col-md-2 d-none d-md-block sidebar">
    <div class="sidebar-sticky">
      <h6 class="sidebar-heading d-flex justify-content-between
      align-items-center px-3 mb-1 text-muted">
        <span>管理員</span>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/product">
            產品管理
            <span class="fas fa-desktop"></span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/order">
            訂單管理
            <span class="fas fa-inbox"></span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/coupon">
            優惠卷
            <span class="fas fa-money-check-alt"></span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BackSidebar',
  methods: {
    signout(
    ) {
      const api = `${process.env.VUE_APP_API_PATH}/logout`;
      const vm = this;
      vm.$http.post(
        api,
      ).then(
        (response) => {
          if (response.data.success) {
            vm.$router.push(
              '/',
            );
          }
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
  /*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  background-color: #f8f9fa;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link.active{
  color: #20c997;
  font-weight: 700;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

</style>
