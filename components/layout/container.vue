<template>
<div class="container" 
  :style="{
    padding: padding_css,
    'box-shadow': box_shadow_css,
    background: material.color_scheme.bg.get_css_string(offset)
  }"
  :class="[ 'depth-' + depth ]"
  @click="$emit('click', $event)"
>

  <div class="container-header">
    <slot name="container-header" />
  </div>
  
  <slot></slot>
</div>
</template>

<script>

import {Material, ColorScheme, Color} from '~/modules/globals.js';

export default {
  name: 'container',

  props: {
    startDepth: {
      type: Number,
      default: 0,
    },
    padding: {
      type: Array,
      default() {
        return [10, 0, 10, 0]
      }
    },
    // A Material object
    material: {
      default()  {
        let bg_color = new Color('darkgray');
        let light_color = new Color('white');
        let color_scheme = new ColorScheme(bg_color, light_color);
        console.log(color_scheme);
        return new Material(color_scheme);
      }
    },
    // An array indicating color offset
    offset: {
      type: Array,
      default() {
        return [0,0,0];
      }
    }
  },

  data() {
    return {
      depth: this.startDepth
    }
  },

  computed: {
    padding_css() {
      let padding_string = this.padding[0] + 'px ';
      padding_string += this.padding[1] + 'px ';
      padding_string += this.padding[2] + 'px ';
      padding_string += this.padding[3] + 'px';
      return padding_string;
    },
    box_shadow_css() {
      let box_string = '0px 0px ' + this.depth * 5 + 'px black';
      return box_string;
    }
  }
}

</script>

<style lang="scss" scoped>

</style>