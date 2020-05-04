<template>
<div class="container" 
  :style="get_css()"
  :class="[ 'depth-' + depth, ]"
  @click="$emit('click', $event)"
>

  <div class="container-header dark">
    <slot name="header" />
  </div>
  
  <slot></slot>
</div>
</template>

<script>

import {Material, ColorScheme, Color, Container} from '~/modules/globals.js';

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
    display: {
      type: String,
      default: "block",
    },
    //
    height: {
      type: Number
    }, 
    width: {
      type: Number
    },
    w_unit: {
      type: String,
      default: 'px',
    },
    h_unit: {
      type: String,
      default: 'px',
    },
    display: {
      type: String,
      default: 'block',
    },
    overflowy: {
      type: String,
      default: 'visible',
    },
    overflowx: {
      type: String,
      default: 'visible',
    },
    //
    // A Material object
    _container: {
      default()  {
        return new Container('card');
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
  },

  methods: {
    get_css() {
      let css_obj = {
        padding: this.padding_css,
        'box-shadow': this.box_shadow_css,
        width: this.width + this.w_unit,
        height: this.height + this.h_unit,
        display: this.display,
        'overflow-x': this.overflowx,
        'overflow-y': this.overflowy,
      };
      return css_obj;
    }
  }
}

</script>

<style lang="scss" scoped>
.container {
  transition-duration: .5s;
}
.dark {
  background: var(--dark);
}
</style>