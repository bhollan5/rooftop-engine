// This is a module for storing and handling console notifs and messages.

import Vue from 'vue';

// From: https://nuxtjs.org/guide/plugins#combined-inject
export default ({ app }, inject) => {
  inject('console', {

    // Booleans indicating whether or not to show various subjects
    subject_filter: {
      projects: true,
      themes: true,
      
    },

    log_messages: false,
    messages: [],
    alert_msg: '',

    // Read functions: 
    get_log() {
      return this.messages;
    },

    alert(msg) {
      this.alert_msg = msg
    },
  
    // logging functions:
    log: function(re, msg) {
      this.messages.push({
        type: 'message',
        message: msg,
        re: re,
      });
      if (this.log_messages) { console.log(msg) };
    },
    test: function() {
      console.warn("Wow this worked??");
    }
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