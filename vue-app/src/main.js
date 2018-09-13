// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import Vue2Filters from 'vue2-filters';

import Hogwatch from './Hogwatch';

Vue.use(Vue2Filters);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Hogwatch />',
  components: { Hogwatch },
});
