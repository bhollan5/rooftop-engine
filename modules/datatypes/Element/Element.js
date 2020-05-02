import { query_array_of_objects } from '~/modules/helpers.js';
import element_templates from '~/modules/datatypes/Element/element_templates.js';

// The object class for our custom datatype, element!
//   element attributes:
//      - template_id:    String
//      - component_id:   String
//      - local_data:     Array
//      - prop_config:    Object
export function Element(_template_id="new", _prop_config) {

  if (typeof(_template_id) == 'string') {
    this.create_from_template(_template_id);
  }
    
  

  // if (!element) {
  //   console.error("Invalid element template id!!")
  //   return;
  // }

  // let prop_config = element.element.prop_config;
  // // Applying the passed in object config, overwriting whatever was there. 
  // prop_config = Object.assign(prop_config, _prop_config);

  // let component_id = element.element.component_id;
  // let local_data = element.element.local_data;
  // let static_data = element.element.static_data;
    
  
  // this.component_id = component_id;
  // this.template_id = _template_id;
  // this.prop_config = prop_config;
  // this.local_data = local_data;
  // this.static_data = static_data

  
}

Element.prototype.create_from_template = function(template_id) {
  let element_template = query_array_of_objects(element_templates, {id: template_id})[0];
  if (!element_template) {
    element_template = query_array_of_objects(element_templates, {id: 'new'})[0];
  }

  let element = element_template.element;
  this.component_id = element.component_id;
  this.template_id = element.id;
  this.prop_config = element.prop_config;
  this.local_data = element.local_data;
  this.static_data = element.static_data
}