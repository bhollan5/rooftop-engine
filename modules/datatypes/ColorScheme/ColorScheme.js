
import {Color} from '~/modules/datatypes/Color/Color.js';
import color_schemes from '~/modules/datatypes/ColorScheme/some_color_schemes.js';
import { query_array_of_objects } from '~/modules/helpers.js';



// The object class for our custom ColorScheme datatype. 
//   element attributes:
//      - bg:      Num (0 - 360)
//      - s:      Num (0 - 100)
//      - l:      Num (0 - 100)
//      - name:   String


export function ColorScheme(obj_or_template_id) {
  if (!this.create_from_template) {
    return;
  }
  // If it was initialized with a string, that string is a template id. 
  if (typeof(obj_or_template_id) == 'string') {
    return this.create_from_template(obj_or_template_id)

  // If it was initialized with an object, that object is config for the Material. 
  } else if (typeof(obj_or_template_id) == 'object') {
    this.create_from_object(obj_or_template_id);
  }

  this._is_dark = false;

}


ColorScheme.prototype.create_from_template = function(template_id) {
  return query_array_of_objects(color_schemes, template_id)[0];
}

ColorScheme.prototype.create_from_object = function(material_obj) {
  console.warn("Do this work")
  this.color_scheme = material_obj.color_scheme || new ColorScheme('dark');
  this.start_depth = material_obj.start_depth || 0;
  this.name = material_obj.name || 'New Material';
  this.styling = material_obj.styling || {};
}

ColorScheme.prototype.get_contrast = function () {
  // todo
};
