import {ElementTemplate} from '~/modules/datatypes/ElementTemplate.js';

export default [{
  id: 'user',
  body_data: [
    new ElementTemplate('header', 
    { 
      value: {
        connection_type: 'doc_data',
        field: 'display_name'
      },
    }),
    new ElementTemplate('subheader'),
  ],
  
}]