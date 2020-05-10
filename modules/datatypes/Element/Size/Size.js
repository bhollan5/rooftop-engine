

// The object class for our custom Size datatype.
//
//   Attributes:
//      - id:         String
//      - name:       String
//
//      - width, -height:   LengthUnit
//       - max, -min:       LengthUnit
//      - padding, margin:  [LengthUnit,LengthUnit,LengthUnit,LengthUnit]
//

import {LengthUnit} from '~/modules/datatypes/LengthUnit/LengthUnit.js';


export function Size(payload) {

  if (typeof(payload) == 'object') {
    return this.new_from_object();
    
  } else if (typeof(payload) == 'string' ) {
    return this.new_from_template();
    
  } else if (payload === undefined ) {
    return this.new_default();
  }

}

//
// Constructors:
//
Size.prototype.new_default = function (color_obj) {
  this.width = new LengthUnit();
  this.height = new LengthUnit();
  this.min_width =  new LengthUnit();
  this.min_height = new LengthUnit();
  this.padding = []
  return this;
};

Size.prototype.to_css_obj = function() {
  return {
    width: this.width.to_string(),
    height: this.height.to_string(),
  }
};

Size.prototype.to_string = function() {
  let css_str = this.width.to_string();
  
};