/* The kernel app runs on the server. */

let readline = require('readline');

module.exports = {
  start,
}

process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});

/* ---------------------------
        Kernel Attributes:
   ---------------------------  */

let height = 3;
let width = 30;
let content = [];
let status = 'dead';



/* ---------------------------
      Content update methods:
   ---------------------------  */

function start() {
  status = 'running';
  render([
    '',
    `  Status: ${status}  `,
    '',
  ])
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
  c_write('┏' + c_loop('━', width) + '┓');

  // Middle lines: 
  for (let i = 0; i < lines_array.length; i++) {
    let needed_spaces = width - lines_array[i].length;
    c_write('┃' + lines_array[i] + c_loop(' ', needed_spaces) + '┃');
  }

  // Bottom line:
  c_write('┗' + c_loop('━', width) + '┛');

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






