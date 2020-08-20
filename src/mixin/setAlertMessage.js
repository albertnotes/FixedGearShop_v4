export default {
  methods: {
    // message 訊息
    // status 樣式，預設值為 warning
    openMessage(message, status = 'warning') {
      this.$store.dispatch('updateMessage', { message, status });
    },
  },
};
