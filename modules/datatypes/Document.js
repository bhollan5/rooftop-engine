import { query_array_of_objects } from '~/modules/helpers.js';

import body_templates from '~/modules/templates/body_templates.js';


export function Document(template_id, doc_data) {

  let body_data = [];   // An array of Widgets.
  
  if (template_id){
    let body_template = query_array_of_objects(body_templates, {id: template_id})[0];
    if (!body_template) {
      console.error("Invalid page template id!!")
      return;
    }
    body_data = body_template.body_data;
  }

  this.body_data = body_data;
  this.doc_data = doc_data;

}
