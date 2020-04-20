// This is a module for storing and handling console notifs and messages.

import Vue from 'vue';

// From: https://nuxtjs.org/guide/plugins#combined-inject
export default ({ app }, inject) => {
  inject('db', {

    // Load the content of a page into the store:
    get_page(collection_name, document_name) {
      return this.messages;
    },

  })
}
