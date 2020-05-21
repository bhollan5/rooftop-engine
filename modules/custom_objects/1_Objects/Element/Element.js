import { query_array_of_objects } from '~/modules/helpers.js';
import element_templates from '~/modules/datatypes/Element/element_templates.js';
import {Size} from '~/modules/datatypes/Element/Size/Size.js';


// The object class for our custom datatype, element!
//   element attributes:
//      - template_id:    String
//      - component_id:   String
//      - local_data:     Array
//      - prop_config:    Object
export function Element(payload) {
  this.box_size = new Size();
  if (typeof(payload) == 'string') {
    this.create_from_template(payload);

  } else if (typeof(payload) == 'object') {
    this.template_id = payload.template_id;
    this.component_id = payload.component_id;
    this.prop_config = payload.prop_config;
    this.container = payload.container;
  }
  
}


Element.prototype.to_css_obj = function() {
  return {
    ...this.box_size.to_css_obj(),
  }
};

Element.prototype.create_from_template = function(template_id) {
  let element_template = query_array_of_objects(element_templates, {id: template_id})[0];
  if (!element_template) {
    element_template = query_array_of_objects(element_templates, {id: 'new'})[0];
  }

  let element = element_template.element;
  this.component_id = element.component_id;
  this.template_id = element_template.id;
  this.prop_config = element.prop_config;
  this.local_data = element.local_data;
  this.static_data = element.static_data;

}