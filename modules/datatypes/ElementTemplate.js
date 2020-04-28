import { query_array_of_objects } from '~/modules/helpers.js';
import element_templates from '~/modules/templates/element_templates.js';

// The object class for our custom datatype, element!
//   element attributes:
//      - template_id:    String
//      - component_id:   String
//      - local_data:     Array
//      - static_data:    Array
//      - prop_config:    Object
export function ElementTemplate(_template_id, _prop_config) {

  let element = query_array_of_objects(element_templates, {id: _template_id})[0];

  if (!element) {
    console.error("Invalid element template id!!")
    return;
  }

  let prop_config = element.element.prop_config;
  // Applying the passed in object config, overwriting whatever was there. 
  prop_config = Object.assign(prop_config, _prop_config);

  let component_id = element.element.component_id;
  let local_data = element.element.local_data;
  let static_data = element.element.static_data;
    
  
  this.component_id = component_id;
  this.template_id = _template_id;
  this.prop_config = prop_config;
  this.local_data = local_data;
  this.static_data = static_data

  
}
