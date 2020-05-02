
import containers from '~/modules/datatypes/Container/some_containers.js';
import { query_array_of_objects } from '~/modules/helpers.js';



// The object class for our custom Container datatype. 
//   Container attributes:
//      - id:       String
//      - name:     String
//      - scheme:   ColorScheme
//      - depth:    Number
//      - styling:  object?

function create_from_object(material_obj) {}

export function Container(payload) {

  this.attr = '';

  if (typeof(payload) == 'string') {
    this.create_from_template(payload);
  
  } else if (typeof(payload) == 'object') {
    this.create_from_object(payload);
  }

  return {}
  this._is_dark = false;

}


Container.prototype.create_from_template = function(template_id) {
  let container = query_array_of_objects(containers, {id: template_id})[0];
  return container;
}

Container.prototype.create_from_object = function(material_obj) {
  this.color_scheme = material_obj.scheme || new ColorScheme('dark');
  this.name = material_obj.name || 'New Material';
  this.id = material_obj.id || 'new';
}
