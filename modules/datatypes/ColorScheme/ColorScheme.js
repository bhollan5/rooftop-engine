import {Color} from '~/modules/datatypes/Color/Color.js';


// The object class for our custom Color datatype.
//   element attributes:
//      - h:      Num (0 - 360)
//      - s:      Num (0 - 100)
//      - l:      Num (0 - 100)
//      - name:   String


export function ColorScheme(bg, text, color_array, name) {

  this.bg = bg;
  this.text = text;
  this.color_array = color_array;
  this.name = name;

}

ColorScheme.prototype.get_contrast = function () {
  // todo
};
