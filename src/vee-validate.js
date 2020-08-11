import Vue from 'vue';
import {
  ValidationObserver, ValidationProvider, extend, localize, configure,
} from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

Vue.component(
  'ValidationProvider', ValidationProvider,
);
Vue.component(
  'ValidationObserver', ValidationObserver,
);
Object.keys(
  rules,
).forEach(
  (rule) => {
    extend(
      rule, rules[rule],
    );
  },
);
localize(
  'zh_TW', zhTW,
);

configure(
  {
    classes: {
      valid: 'is-valid',
      invalid: 'is-invalid',
    },
  },
);
