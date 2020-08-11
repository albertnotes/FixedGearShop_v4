import Vue from 'vue';

// 建立 Vue
const bus = new Vue(
);
// 使用 defineProperties 設為只能讀取，不能修改
Object.defineProperties(
  Vue.prototype, {
    $bus: {
      get(
      ) {
        return bus;
      },
    },
  },
);
