import { Color } from "./node_modules/~/modules/datatypes/Attributes/Color/Color";


let color_schemes = [];

export default [
  {
    name: 'Dark',
    id: 'dark',
    bg: [new Color('gray')],
    text: [new Color('white')],
    ill: [new Color(), new Color()],
  },
  {
    name: 'Dark Card', 
    id: 'dark-card',
    bg: [new Color('darkgray')],
    text: [new Color('white')],
    ill: [new Color(), new Color()],
  },
];