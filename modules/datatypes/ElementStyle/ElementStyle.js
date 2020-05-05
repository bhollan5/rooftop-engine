

// The object class for our custom ElementStyling datatype.
//
//   Attributes:
//      - id:         String
//      - name:       String
//
//      - size:       Size
//      
//      
//

import {Size} from '~/modules/globals';


export function ElementStyle(payload) {

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
ElementStyle.prototype.new_default = function (color_obj) {

  this.size = new Size();
};