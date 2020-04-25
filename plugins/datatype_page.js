// This is a module for storing and handling console notifs and messages.

import Vue from 'vue';

// From: https://nuxtjs.org/guide/plugins#combined-inject
export default ({ app }, inject) => {
  inject('page', {

    new_page() {
      console.warn("L:")
      return { 
        body_data: [],
        page_data: [],
        theme: [],
      };
    },

  })
}

// Vue.prototype.$console = {

//   log_messages: false,
//   log: [],

//   // functions
//   log(msg) {
//     log.push({
//       type: 'message',
//       message: msg
//     });
//     if (this.log_messages) { console.log(msg) };
//   },
//   test: function() {
//     console.warn("Wow this worked??");
//   }
// }