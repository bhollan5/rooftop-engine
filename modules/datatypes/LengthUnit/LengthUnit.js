

// The object class for our custom LengthUnit datatype.
//
//   Attributes:
//
//      - value:      
//      - unit:     
//
//  Methods:
//      string get_string()


let absolute_units = ['cm', 'mm', 'in', 'px', 'pt', 'pc'];
let relative_units = ['em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', '%'];


export function LengthUnit(value=100, unit="px") {

  this.value = value;

  if (absolute_units.indexOf(unit) != -1) {
    this.type = 'absolute';
  } else if (relative_units.indexOf(unit) != -1) {
    this.type = 'relative';
  } else if (unit == 'auto') {
    this.type = 'auto';
  } else {
    console.error("Invalid length unit: " + unit);
    return;
  }

  this.unit = unit;

}

//
// Methods:
//
LengthUnit.prototype.new_default = function (color_obj) {
  
};