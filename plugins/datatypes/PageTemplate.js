// Page templates are predefined page widget setups. 



// From: https://nuxtjs.org/guide/plugins#combined-inject
export default ({ app }, inject) => {
  inject('PageTemplate', {

    get_page_template(query) {
      // TODO: make a global functions module that does stuff like this. 
      return this.all_page_templates.filter( function(template) {
        for (let field in query) {
          if (query[field] != template[field]) {
            return false;
          }
        }
        return true;
      });
    },

    all_page_templates: [{
      id: 'user',
      page: { 
        body_data: [{
          id: 'header',
          icon: 'H1',
          bold: true,
          title: 'Page Header',
          description: 'The title of the page.',
          config: {
            component: 'text-field',
            fontsize: 'h1',
            bottom: 0,
          }
        }],
        page_data: [],
        theme: [],
      },
      
    }]

  })
}
