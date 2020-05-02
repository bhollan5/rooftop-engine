

// The object class for our custom Material datatype.
//   element attributes:
//      - bg:     Color
//      - text:   Colors
//      - l:      Num (0 - 100)
//      - name:   String

import {ColorScheme} from '~/modules/datatypes/ColorScheme/ColorScheme.js';


// Material constructor!
export function Material(obj_or_template_id) {

  // If it was initialized with a string, that string is a template id. 
  if (typeof(obj_or_template_id) == 'string') {
    this.create_from_template(obj_or_template_id)

  // If it was initialized with an object, that object is config for the Material. 
  } else if (typeof(obj_or_template_id) == 'object') {
    this.create_from_object(obj_or_template_id);
  }

}

Material.prototype.create_from_object = function(material_obj) {
  console.log("Do this work")
  this.color_scheme = material_obj.color_scheme || new ColorScheme('dark');
  this.start_depth = material_obj.start_depth || 0;
  this.name = material_obj.name || 'New Material';
  this.styling = material_obj.styling || {};
}

Material.prototype.create_from_template = function(template_id) {

}

Material.prototype.get_css_obj = function (offset) {
  
  let bg_arr = this.color_scheme.bg;
  return;


  let css_obj = {
    background: this.color_scheme.bg[0].get_css_string([0,0,0]),
    color: this.color_scheme.text[0].get_css_string([0,0,-40]),

    '--dark': this.color_scheme.bg[0].get_css_string([0,0,-5]),
    
    'font-family': this.font,
  };

  css_obj['.dark'] = {
    background: this.color_scheme.bg[0].get_css_string([0,0,-5])
  }

  return css_obj;

};
