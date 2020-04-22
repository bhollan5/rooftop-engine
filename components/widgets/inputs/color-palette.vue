<template>
<div class="color-palette flex-container row-wrap" >
  <div class="color-option" v-for="field in fields" 
    v-if="colors[field]"
    :class="{'selected': value == field}"
    @click="$emit('input', field)"
    :style="{ 
      background: $theme.hsl_to_css(colors[field]),
      height: size + 'px', 
      width: size + 'px',
      margin: margin + 'px',
    }"
  ></div>
  
  <br>
</div>
</template>

<script>
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

    // an array of strings, for which colors we should show
    fields: {
      type: Array,
    },

    colors: {
      type: Object,
    },


    size: {
      type: Number,
      default: 15
    },
    margin: {
      type: Number,
      default: 5
    }
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
.color-selector {
  display: flex;
  flex-flow: row wrap;
  width: 450px;;
}
// Small selectable color options
.color-option {
  margin: 5px;
  transition: .1s;
  box-shadow: 0px 0px 3px black;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 5px white;
  }
  &.selected {
    box-shadow: 0px 0px 5px white;
  }
}
</style>