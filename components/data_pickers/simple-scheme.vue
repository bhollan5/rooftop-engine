<!--
  The simple-scheme component is used in the simple-palette.
  It displays a background color, shades for that color, and text colors.
  All these colors are selectable.
-->

<template>
<div class="color-scheme" v-if="colors[bg]"
@click="$emit('input', bg)"
:class="{
  selected: value == bg,
  short: !secondary
}"
:style="{ background: $theme.hsl_to_css(colors[bg]) }">

  <!-- Darker shades -->

  <div class="shade" 
  :style="{ background: $theme.hsl_to_css(colors[bg], [0,0,-10]) }">
  </div>
  <div class="shade" 
  :style="{ background: $theme.hsl_to_css(colors[bg], [0,0,-5]), }">
  </div>

  <!-- The main color, and labels -->
  <div class="main-color">
    <!-- Label and color selector for the main text -->
    <div class="label p"
    :style="{ color: $theme.hsl_to_css(colors[text]) }">
      <div class="color-label">{{bg}}</div>
      <div class="text-color" 
      :class="{ selected: value == text }"
      :style="{ background: $theme.hsl_to_css(colors[text]) }"
      @click.stop="$emit('input', text)">
      </div>
    </div>

    <!-- Label and color selector for secondary text -->
    <div class="label secondary small-font" v-if="secondary">
      <div class="color-label">{{$theme.hsl_to_hex(colors[bg])}}</div>
      <div class="text-color" 
      :class="{ selected: value == secondary }"
      :style="{ background: $theme.hsl_to_css(colors[secondary]) }"
      @click.stop="$emit('input', secondary)">
      </div>
    </div>
  </div>

  <!-- Lighter shades -->
  <div class="shade" 
  :style="{ background: $theme.hsl_to_css(colors[bg], [0,0,5]) }">
  </div>
  <div class="shade" 
  :style="{ background: $theme.hsl_to_css(colors[bg], [0,0,10]) }">
  </div>

</div>
</template>


<script>
import simpleScheme from '@/components/data_pickers/simple-scheme.vue';

export default {

  data() { 
    return {
      variableColor: '',
    }
  },

  props: {
    // Pass a string corresponding to a key for a given color var!
    value: {
      type: String,
      default: 'bg'
    },

    // Color object to pull from
    colors: {
      type: Object,
    },

    // bg color to display
    bg: {
      type: String,
      default: 'bg',
    },
    // text color to display
    text: {
      type: String,
      default: 'bg_text',
    },
    // text2 color to display 
    secondary: {
      type: String,
    },



  },
  
  mounted() {
    // We don't need to dispatch to the store to get the color schemes,
    // since the default page loads them in. 
  },

  methods: {
    same_color(color_to_compare) {
      // if if if
      // deprecated until we do absolute colors

      if (color_to_compare[0] == this.value[0]) {
        if (color_to_compare[1] == this.value[1]) {
          if (color_to_compare[2] == this.value[2]) {
            return true;
          }
        }
      }
      return false
    },
  },
  
}
</script>

<style lang="scss" scoped>

.color-scheme {
  display: flex;
  width: 100%;
  min-width: 150px;
  height: 50px;
  transition: .1s;
  box-shadow: 0px 0px 3px black;
  cursor: pointer;

  &.selected {
    box-shadow: 0px 0px 5px white;
  }
  &.short {
    height: 30px;
  }

  .shade {
    width: 10%;
    height: 100%;
  }

  .main-color {
    width: 60%;
    min-width: 100px;
    height: 100%;
    .label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0px 5px;
      .text-color {
        width: 30px;
        height: 15px;
        box-shadow: 0px 0px 5px rgba(0,0,0,.5);
        &.selected {
          box-shadow: 0px 0px 5px white;
        }
      }
    }
  }
}
</style>