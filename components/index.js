// Used to import all our global components at once. 


// Inputs: 
import textField from './inputs/text-field.vue';
import checkbox from './inputs/check-box.vue';
import colorPicker from './inputs/color-picker.vue';
import svgUploader from './inputs/svg-uploader.vue';
import dropdown from './inputs/dropdown.vue';
import colorPalette from './inputs/color-palette.vue';
import slider from './inputs/slider.vue';
import picker from './inputs/picker.vue';
import formField from './inputs/form-field';
import alert from './inputs/alert.vue';

// Widgets:
import lineBreak from './misc/line-break.vue';
import collection from './widgets/collection.vue';
import articleCard from '@/components/widgets/article_card.vue';

// Sidebar:
import sideBar from './side_bar/sidebar.vue';
import card from './side_bar/card.vue';

// Icons:
//   We import SVG icons this way so we can modify them with CSS, for theming.
//   To understand why: https://css-tricks.com/using-svg/ 
import checkIcon from './icons/check-icon.vue';
import editIcon from './icons/edit-icon.vue';
import expandIcon from './icons/expand-icon.vue';
import gearIcon from './icons/gear-icon.vue';
import hamburgerIcon from './icons/hamburger-icon.vue';
import imageIcon from './icons/image-icon.vue';
import mediaIcon from './icons/media-icon.vue';
import merchIcon from './icons/merch-icon.vue';
import nonficIcon from './icons/nonfic-icon.vue';
import personIcon from './icons/person-icon.vue';
import searchIcon from './icons/search-icon.vue';
import servicesIcon from './icons/services-icon.vue';
import trashIcon from './icons/trash-icon.vue';

export default {
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

  // sidebar:
  sideBar,
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

};