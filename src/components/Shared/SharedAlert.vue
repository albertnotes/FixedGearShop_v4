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
        @click="removeMessage(i)"
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
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
    // message 訊息
    // status 樣式，預設值為 warning
    openMessage(message, status = 'warning') {
      this.updateMessage(message, status);
    },
  },
  created() {
    // 註冊監聽 message:push 事件，參數為 function
    this.$bus.$on('message:push', this.openMessage);
  },
  beforeDestroy() {
    // 手動銷毀事件，eventBus 不會自動清除
    this.$bus.$off('message:push', this.openMessage);
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
