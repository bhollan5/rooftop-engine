
import {Color} from '~/modules/datatypes/Attributes/Color/Color.js';
import color_schemes from '~/modules/datatypes/ColorScheme/some_color_schemes.js';
import { query_array_of_objects } from '~/modules/helpers.js';



// The object class for our custom ColorScheme datatype. 
//   element attributes:
//      - bg:      Num (0 - 360)
//      - s:      Num (0 - 100)
//      - l:      Num (0 - 100)
//      - name:   String


export function ColorScheme(payload) {

  // If it was initialized with a string, that string is a template id. 
  if (typeof(payload) == 'string') {
    this.create_from_template(payload)

  // If it was initialized with an object, that object is config for the Material. 
  } else if (typeof(payload) == 'object') {
    this.create_from_object(payload);
  }

  this._is_dark = false;

}


ColorScheme.prototype.create_from_template = function(template_id) {
  let scheme = query_array_of_objects(color_schemes, {id: template_id})[0];
  if (scheme) {
    this.name = scheme.name;
    this.bg = scheme.bg;
    this.text = scheme.text;
    this.ill = scheme.ill;
  }
}

ColorScheme.prototype.create_from_object = function(material_obj) {
  this.color_scheme = material_obj.color_scheme || new ColorScheme('dark');
  this.start_depth = material_obj.start_depth || 0;
  this.name = material_obj.name || 'New Material';
  this.styling = material_obj.styling || {};
}

ColorScheme.prototype.get_contrast = function () {
  // todo
};
