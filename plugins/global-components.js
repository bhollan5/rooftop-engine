// This is where we register components globally. 
// This script is called in nuxt.config.js.

import Vue from 'vue';
import commonComponents from '~/components/index.js';

for (let key in commonComponents)
  Vue.component(key, commonComponents[key]);
