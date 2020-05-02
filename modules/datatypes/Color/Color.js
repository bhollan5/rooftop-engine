

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
  if (typeof(payload) == 'object') {
    this.h = payload.h;
    this.s = payload.s;
    this.l = payload.l;
    this.name = payload.name;

  } else if (typeof(payload) == 'string' ) {
    return this.create_from_template(payload);

  } else if (payload === undefined ) {
    return this.create_random_color();
  }

}

//
// Constructors:
//
Color.prototype.create_from_object = function (color_obj) {
  console.warn('color.create_from_object is [deprecated]');
};

Color.prototype.create_from_template = function (template_id) {
  let named_color = query_array_of_objects(named_colors, {name: template_id})[0];
  if (!named_color) { 
    // console.warn("Color not found!"); 
    return; 
  }
  return new Color(named_color);
};

Color.prototype.create_random_color = function () {
  this.h = Math.floor(Math.random() * 360);
  this.s = Math.floor(Math.random() * 100);
  this.l = Math.floor(Math.random() * 100);
  this.name = 'random';
};


//
// Getters:
//
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

// Returns an array of 5 colors. 
Color.prototype.get_shades = function () {
  let shades = [
    this.get_offset([0,0,-10], '-darker'),
    this.get_offset([0,0,-5], '-dark'),
    this.get_offset([0,0,0], ''),
    this.get_offset([0,0,5], '-light'),
    this.get_offset([0,0,10], '-lighterer'),
  ];
  return shades;
  
};

// Returns a new color of 5 colors. 
Color.prototype.get_offset = function (offset, suffix="") {
  if (typeof(offset) != 'object' || offset.length != 3) {
    console.error("Invalid color offset. ")
    return;
  }
  let color_obj = {
    h: this.h + offset[0],
    s: this.s + offset[1],
    l: this.l + offset[2],
    name: this.name + suffix
  };
  let offset_color = new Color(color_obj)
  return offset_color;

};

