// Used to import all our global components at once. 


// Layout components
import theContent from './layout/the_content.vue';
import theSidebar from './layout/the_sidebar.vue';



// Inputs: 
import textField from './widgets/inputs/text-field.vue';
import checkbox from './widgets/inputs/check-box.vue';
import colorPicker from './widgets/inputs/color-picker.vue';
import svgUploader from './widgets/inputs/svg-uploader.vue';
import dropdown from './widgets/inputs/dropdown.vue';
import colorPalette from './widgets/inputs/color-palette.vue';
import slider from './widgets/inputs/slider.vue';
import picker from './widgets/inputs/picker.vue';
import formField from './widgets/inputs/form-field';
import alert from './widgets/inputs/alert.vue';

// Widgets:
import lineBreak from './widgets/svg/line-break.vue';
import collection from './widgets/links/collection.vue';
import articleCard from '@/components/widgets/links/article_card.vue';

import svgRender from '@/components/widgets/svg/svg_render.vue';

// Sidebar:
import card from './widgets/side_bar/card.vue';

// Icons:
//   We import SVGs as .vue files so we can modify them with CSS, for theming.
//   To understand why: https://css-tricks.com/using-svg/ 
import checkIcon from './widgets/icons/check-icon.vue';
import editIcon from './widgets/icons/edit-icon.vue';
import expandIcon from './widgets/icons/expand-icon.vue';
import gearIcon from './widgets/icons/gear-icon.vue';
import hamburgerIcon from './widgets/icons/hamburger-icon.vue';
import imageIcon from './widgets/icons/image-icon.vue';
import mediaIcon from './widgets/icons/media-icon.vue';
import merchIcon from './widgets/icons/merch-icon.vue';
import nonficIcon from './widgets/icons/nonfic-icon.vue';
import personIcon from './widgets/icons/person-icon.vue';
import searchIcon from './widgets/icons/search-icon.vue';
import servicesIcon from './widgets/icons/services-icon.vue';
import trashIcon from './widgets/icons/trash-icon.vue';
import saveIcon from './widgets/icons/save-icon.vue';
import viewIcon from './widgets/icons/view-icon.vue';
import leftArrowIcon from './widgets/icons/left-arrow-icon.vue';
import rightArrowIcon from './widgets/icons/right-arrow-icon.vue';
import upArrowIcon from './widgets/icons/up-arrow-icon.vue';
import downArrowIcon from './widgets/icons/down-arrow-icon.vue';

// debug
import objectDisplay from './widgets/debug/object_display.vue';

import layerPicker from './widgets/layer_picker.vue';

import objectEditor from './widgets/inputs/object_editor.vue';



export default {

  // Layout
  theContent,

  // Inputs
  colorPicker,
  textField,
  svgUploader,
  dropdown,
  colorPalette,
  checkbox,
  slider,
  picker,
  formField,
  alert,

  // Misc:
  lineBreak,
  collection,
  articleCard,

  svgRender,

  // sidebar:
  theSidebar,
  card,


  // Icons
  hamburgerIcon,
  editIcon,
  checkIcon,
  personIcon,
  searchIcon,
  gearIcon,
  expandIcon,
  nonficIcon,
  merchIcon,
  mediaIcon,
  servicesIcon,
  trashIcon,
  imageIcon,
  saveIcon,
  viewIcon,
  leftArrowIcon,
  rightArrowIcon,
  upArrowIcon,
  downArrowIcon,

  objectDisplay,

  layerPicker,

  objectEditor,
};