


// The object class for our custom datatype, element!
//   element attributes:
//      - template_id:    String
//      - component_id:   String
//      - local_data:     Array
//      - prop_config:    Object
export function Element(payload) {
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