
import { query_array_of_objects } from '~/modules/helpers.js';
import Widget from '~/modules/datatypes/Widget.js';

export default {
  get_page_template(query) {
    return query_array_of_objects(this.all_page_templates, query);
  },

  all_page_templates: [{
    id: 'user',
    page: { 
      body_data: [
        Widget.get_widget({ id: 'header' }),
        Widget.get_widget({ id: 'header' }),
      ],
      page_data: [],
      theme: [],
    },
    
  }]
}
