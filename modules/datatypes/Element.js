import { query_array_of_objects } from '~/modules/helpers.js';

export function Element(component_id) {

  let template_id = '';
  let component_id = '';
  let prop_config = {};
  let local_data = [];
  let static_data = [];
  
  if (template_id){
    let body_template = query_array_of_objects(body_templates, {id: template_id})[0];
    if (!body_template) {
      console.error("Invalid page template id!!")
      return;
    }
    body_data = body_template.body_data;
  }

  this.body_data = body_data;


}
