import {Element} from '~/modules/datatypes/Element/Element.js';

export default [{
  id: 'user',
  body_data: [
    new Element('header', 
    { 
      value: {
        connection_type: 'doc_data',
        field: 'display_name'
      },
    }),
    new Element('subheader'),
  ],
  
}]