
// This script gives us this.$page

// From: https://nuxtjs.org/guide/plugins#combined-inject
export default ({ app }, inject) => {
  inject('page', {

    new_page() {
      return { 
        body_data: [],
        page_data: [],
        theme: [],
      };
    },

  })
}
