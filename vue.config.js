// vue.config.js
/* eslint no-param-reassign: "error" */
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: (config) => {
    config.plugin(
      'html',
    ).tap(
      (args) => {
        args[0].title = 'FixedGearShop_v4';
        return args;
      },
    );
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/FixedGearShop_v4/' : '/',
};
