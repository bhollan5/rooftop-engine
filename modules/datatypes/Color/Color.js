

// The object class for our custom Color datatype.
//
//   Attributes:
//      - h:      Num (0 - 360)
//      - s:      Num (0 - 100)
//      - l:      Num (0 - 100)
//      - name:   String
//
//  Methods:
//      void create_from_template(String)
//      void create_random_color()
//      string get_css_string()

import {named_colors} from '~/modules/datatypes/Color/some_colors.js';
import { query_array_of_objects } from '~/modules/helpers.js';



export function Color(payload) {

  // If the first argument is a string, try to find a named color. 
  if (typeof(payload) == 'string') {
    return this.create_from_template(payload);

  } else if (payload === undefined ) {
    return this.create_random_color();
  }

}


// Constructors:
Color.prototype.create_from_template = function (template_id) {
  let named_color = query_array_of_objects(named_colors, {name: template_id})[0]
  return named_color;
};

Color.prototype.create_random_color = function () {
  this.h = Math.floor(Math.random() * 360);
  this.s = Math.floor(Math.random() * 100);
  this.l = Math.floor(Math.random() * 100);
  this.name = 'random';
};


// Takes an optional offset array.
// Snagged this layout for modules from here btw:
// http://fredkschott.com/post/2014/01/node-js-cookbook---constructors-and-custom-types/
Color.prototype.get_css_string = function (offset) {
  if (!offset) {
    offset = [0,0,0];
  }
  let color_string = 'hsl('
  color_string += (this.h + offset[0]) +  ',';
  color_string += (this.s + offset[1]) + '%,';
  color_string += (this.l + offset[2]) + '%)';
  return color_string;
};
