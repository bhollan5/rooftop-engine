import { query_array_of_objects } from '~/modules/helpers.js';
import widget_templates from '~/modules/templates/widget_templates.js';


export function Widget(widget_id) {

  let component_id = '';
  let template_id = '';
  let prop_config = [];
  let local_data = [];
    
  if (!widget_id) {
    console.warn("You should initialize widgets with widget template id's!")
  }

  let widget_template = query_array_of_objects(widget_templates, {id: widget_id})[0];
  if (!widget_template) {
    console.error("Invalid widget template id!!")
  } else {
    component_id = widget_template.widget.component_id;
    template_id = widget_template.id;
    prop_config = widget_template.widget.prop_config;
    local_data = widget_template.widget.local_data;
  }
  
  this.component_id = component_id;
  this.template_id = template_id;
  this.prop_config = prop_config;
  this.local_data = local_data;


  // new_widget(component_id, template_id, prop_config, local_data) {
  //   return {
  //     component_id: component_id,
  //     template_id: template_id,
  //     prop_config: prop_config,
  //     local_data: local_data,
  //   }
  // },

  // query_templates(query) {
  //   return query_array_of_objects(this.all_widgets, query);
  // },

  
}
