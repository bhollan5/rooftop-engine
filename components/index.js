// Used to import all our global components at once. 

// Importing all globals:
import inputs from './inputs/_globals';
import data_pickers from './data_pickers/_globals';
import forms from './forms/_globals';
import svg from './svg/_globals';
import containers from './containers/_globals';
import space_canvas from './space_canvas/_globals';
import links from './links/_globals';
import data_display from './data_display/_globals';


// Layout components
import theContent from './_the_layout/the_content.vue';
import theSidebar from './_the_layout/the_sidebar.vue';


export default {

  // Layout
  theContent,
  theSidebar,


  ...inputs,
  ...data_pickers,
  ...forms,
  ...svg,
  ...containers,
  ...space_canvas,
  ...links,
  ...data_display,

};