import { Color } from "~/modules/datatypes/Color/Color";


let color_schemes = [];

export default [
  {
    name: 'dark',
    bg: [new Color('gray')],
    text: [new Color('white')],
    ill: [new Color(), new Color()],
  },
  {
    name: 'dark-card',
    bg: [new Color('darkgray')],
    text: [new Color('white')],
    ill: [new Color(), new Color()],
  },
];