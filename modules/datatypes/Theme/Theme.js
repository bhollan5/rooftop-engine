

// The object class for our custom Theme datatype.
//   element attributes:
//      - id:      
//      - name:        
//      - can_read:     Array of user id's
//      - can_write:    Array of user id's
//
//      - materials:    array of materials

import { query_array_of_objects } from '~/modules/helpers.js';



export function Theme(payload) {

  // If the first argument is a string, try to find a named color. 
  if (typeof(payload) == 'string') {
    let named_color = query_array_of_objects(named_colors, {name: h})[0]
    return named_color;
  }

  this.schemes = payload.schemes;

  this.name = name;
}

//
Color.prototype.get_css_obj = function () {

  
};
