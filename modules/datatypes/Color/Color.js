

// The object class for our custom Color datatype.
//   element attributes:
//      - h:      Num (0 - 360)
//      - s:      Num (0 - 100)
//      - l:      Num (0 - 100)
//      - name:   String

import {named_colors} from '~/modules/datatypes/Color/named_colors.js';
import { query_array_of_objects } from '~/modules/helpers.js';



export function Color(h,s,l,name) {

  // If the first argument is a string, try to find a named color. 
  if (typeof(h) == 'string') {
    let named_color = query_array_of_objects(named_colors, {name: h})[0]
    return named_color;
  }


  if (h === undefined || s === undefined || l === undefined) {
    h = Math.floor(Math.random() * 360);
    s = Math.floor(Math.random() * 100)
    l = Math.floor(Math.random() * 100)
  }
  this.h = h;
  this.s = s;
  this.l = l;
  this.name = name;
}

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
