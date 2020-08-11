<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
@import '@/assets/scss/all.scss';
// Sticky Footer
.l-stickyFooter {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .l-stickyFooter__main {
    flex: 1 0 auto;
  }
  .l-stickyFooter__footer {
    flex-shrink: 0;
  }
}
</style>
