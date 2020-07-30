let readline = require('readline');
const EventEmitter = require('events');

module.exports = {
  render,
  update
}

/* ---------------------------
         Box Attributes:
   ---------------------------  */

let height = 0;
let width = 0;
let content = [];



/* ---------------------------
      Content update methods:
   ---------------------------  */

// This will reset & rerender the box!
function update(lines_array) {

  // First, set the box's data. 
  set_lines(lines_array);
  
  // Then, clear the old box. 
  clear();

  // Finally, show the new box. 
  render(lines_array);
}


/* To set the boxes data: */
function set_lines(lines_array) {
  // Grabbing our box height:
  height = lines_array.length + 2;
  length = 0;
  for (let i = 0; i < lines_array.length; i++) {
    if (lines_array[i].length > length) {
      length = lines_array[i].length;
    }
  }
  content = lines_array;
}

/* ---------------------------
      Console draw methods:
   ---------------------------  */

function clear() {
  if (height == 0) {
    return;
  }
  for (let i = 0; i < height; i++) {
    console.log('\x1b[3A'); // Move the cursor up!
    console.log('\x1b[2K'); // Clear the line!;

  } 
}

/* Takes an array of text lines! */
function render(lines_array) {

  

  // Top line:
  c_write('┏' + c_loop('━', length) + '┓');

  // Middle lines: 
  for (let i = 0; i < lines_array.length; i++) {
    let needed_spaces = length - lines_array[i].length;
    c_write('┃' + lines_array[i] + c_loop(' ', needed_spaces) + '┃');
  }

  // Bottom line:
  c_write('┗' + c_loop('━', length) + '┛');

}

/* Write to the console: */
function c_write(_string) {
  console.log(_string)
}

// Loop a string x amount of times:
function c_loop(_string, _amount) {
  let looped_string = '';
  for (let i = 0; i < _amount; i++) {
    looped_string += (_string);
  }
  return looped_string;
}

function color(string) {
  // Changing the writer to a color:
  console.log('\x1b[32m');

};
function reset_color() {
  console.log("\x1b[0m");
}






