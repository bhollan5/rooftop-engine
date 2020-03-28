<template>
<div class="color-palette flex-container row-wrap">
  <div class="color-option" v-for="(color, color_i) in colors" 
    :class="{'selected': same_color(color)}"
    @click="$emit('input', color)"
    :style="{ 
      background: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)',
      height: size + 'px', 
      width: size + 'px',
      margin: margin + 'px',
       }"></div>
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
      type: Array,
      default: 'bg'
    },


    size: {
      type: Number,
      default: 15
    },
    margin: {
      type: Number,
      default: 15
    }
  },

  computed: {
    colors() {
      let theme_obj = this.$store.getters['themes/theme_object'];
      return theme_obj.colors;
    }
  },
  
  mounted() {
    // We don't need to dispatch to the store to get the color schemes,
    // since the default page loads them in. 
  },

  methods: {
    same_color(color_to_compare) {
      // if if if

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

<style lang="scss">
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