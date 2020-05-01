

// The object class for our custom Material datatype.
//   element attributes:
//      - bg:     Color
//      - text:   Colors
//      - l:      Num (0 - 100)
//      - name:   String

import {ColorScheme} from '~/modules/datatypes/ColorScheme/ColorScheme.js';



export function Material(color_scheme, start_depth=0) {
  this.color_scheme = color_scheme;
  this.start_depth = start_depth;

  this.is_dark = false;
}

// Takes an optional offset array.
Material.prototype.get_css_string = function (offset) {
  if (!offset) {
    offset = [0,0,0];
  }
  let color_string = 'hsl('
  color_string += (color[0] + offset[0]) +  ',';
  color_string += (color[1] + offset[1]) + '%,';
  color_string += (color[2] + offset[2]) + '%)';
  return color_string;
};
