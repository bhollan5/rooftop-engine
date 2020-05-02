<template>
<div class="container" 
  :style="get_material_string()"
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
    get_material_string() {
      if (typeof(this.material) == 'object') {
        return this.material.get_css_obj();
      } else {
        return {}
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.dark {
  background: var(--dark);
}
</style>