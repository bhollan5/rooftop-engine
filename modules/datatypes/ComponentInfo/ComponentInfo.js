import { query_array_of_objects } from '~/modules/helpers.js';
import component_templates from '~/modules/datatypes/ComponentInfo/component_templates.js';

// The object class for an object with a component's info. 
//      - id:               String
//      - template_props:   Object
//      - config_props:     Object

export function ComponentInfo(component_id) {

  if (!component_id) {
    this.id = '';
    return;
  }

  let component = query_array_of_objects(component_templates, {id: component_id})[0];

  if (!element) {
    console.error("Invalid component id!!")
    return;
  }
  
  this.id = component.id;
  this.template_props = component.template_props;
  this.config_props = component.config_props;

  
}
