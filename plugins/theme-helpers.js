// This is a module for storing and handling console notifs and messages.

// From: https://nuxtjs.org/guide/plugins#combined-inject
export default ({ app }, inject) => {
  inject('theme', {

    // All the fields in a color scheme.
    color_fields: [
      'logo',
      'bg', 'bg2', 'bg_text', 'bg_text2',
      'card', 'card2', 'card_text', 'card_text2',
      'link',
      'bg2_input', 'bg2_input_text', 'bg2_input_text2',
      'c1', 'c1_light', 'c2', 'c2_light', 'c3', 'c3_light',
      'input', 'input_text', 'input_text2',
      'action', 'confirm', 'danger',
      'action_text', 'confirm_text', 'danger_text',
    ],

    simplify(theme) {
      let s_theme = JSON.parse(JSON.stringify(theme));

      // Quick function to let us shift the lightness of a color
      let l_shift = function (hsl, shift) {
        return [hsl[0], hsl[1], hsl[2] + shift];
      };
      s_theme.colors.bg2 = l_shift(s_theme.colors.bg, -5);
      s_theme.colors.input = l_shift(s_theme.colors.bg, 5);
      s_theme.colors.input_text = l_shift(s_theme.colors.bg_text, 0);
      s_theme.colors.input_text2 = l_shift(s_theme.colors.bg_text2, 0);
      s_theme.colors.card2 = l_shift(s_theme.colors.card, -5);
      return s_theme;
    },

    theme_css_obj(theme) {
      // Colors are stored as HSL arrays, so we need to iterate thru them
      //   and change them to 'hsl(x,x%,x%)' format
      let style_obj = {};
      if (!theme || !theme.colors.bg) {
        return;
      }

      // Simplifying the theme...
      let s_theme = this.simplify(theme);

      this.color_fields.forEach((field) => {
        // Making sure the field is in our color scheme.
        if (!s_theme.colors[field]) {
          console.warn("This theme is missing a color: " + field);
          return;
        }

        // Turning 'bg_text' into '--bg-text':
        let css_var_name = '--' + field.replace(/_/g, "-");

        // setting up our style object:
        style_obj[css_var_name] = this.hsl_to_css(s_theme.colors[field], [0,0,0]);

        style_obj[css_var_name + '-light'] = this.hsl_to_css(s_theme.colors[field], [0,0,5]);
        style_obj[css_var_name + '-lighter'] = this.hsl_to_css(s_theme.colors[field], [0,0,10]);
        style_obj[css_var_name + '-dark'] = this.hsl_to_css(s_theme.colors[field], [0,0,-5]);
        style_obj[css_var_name + '-darker'] = this.hsl_to_css(s_theme.colors[field], [0,0,-10]);

      });
      return style_obj;
    },

    // Takes a hsl array for color, and an optional offset array.
    hsl_to_css(color, offset) {
      if (!offset) {
        offset = [0,0,0];
      }
      let color_string = 'hsl('
      color_string += (color[0] + offset[0]) +  ',';
      color_string += (color[1] + offset[1]) + '%,';
      color_string += (color[2] + offset[2]) + '%)';
      return color_string;
    },

    // Modified from this: https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
    hsl_to_hex(color) {
      // hsl should be fractions between 0 and 1
      let h = color[0] / 360;
      let s = color[1] / 100;
      let l = color[2] / 100;

      let r, g, b;

      if (s == 0){
          r = g = b = l; // achromatic
      } else {
          let hue2rgb = function hue2rgb(p, q, t){
              if(t < 0) t += 1;
              if(t > 1) t -= 1;
              if(t < 1/6) return p + (q - p) * 6 * t;
              if(t < 1/2) return q;
              if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
          }

          let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          let p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
      }
      r = Math.round(r * 255);
      g = Math.round(g * 255);
      b = Math.round(b * 255);
      let hex = "#" + r.toString(16) + g.toString(16) + b.toString(16);
      return hex;
    }
  })
}