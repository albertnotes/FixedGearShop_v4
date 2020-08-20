<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="messages = i"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SharedAlert',
  computed: {
    messages: {
      get() {
        return this.$store.state.alertMessage;
      },
      set(num) {
        this.$store.commit('DELETE_MESSAGE', num);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.message-alert {
  position: fixed;
  width: max-content;
  top: 75px;
  right: 20px;
  z-index: 1100;
  @media (max-width: 767px) {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
