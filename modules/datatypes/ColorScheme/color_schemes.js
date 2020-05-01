import { Color } from "../datatypes/styling/Color";
import { ColorScheme } from "../datatypes/styling/ColorScheme";


let color_schemes = [];


let dark_bg = new Color(0,0,20,'darkgray');
let light_text = new Color(0,0,100,'white');
let highlights = [new Color(), new Color()];

let dark_scheme = new ColorScheme(dark_bg, light_text, highlights);

color_schemes.push(dark_scheme);




export default color_schemes;