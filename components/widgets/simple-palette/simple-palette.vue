<template>
<div class="simple-palette">
  
    <simple-scheme 
    :value="value"
    @input="$emit('input', $event)"
    bg="bg" 
    text="bg_text" 
    secondary="bg_text2"
    :colors="colors">
    </simple-scheme>
    <br>
    <simple-scheme 
    :value="value"
    @input="$emit('input', $event)"
    bg="card" 
    text="card_text" 
    secondary="card_text2"
    :colors="colors">
    </simple-scheme>

    <br>
</div>
</template>

<script>
import simpleScheme from '@/components/widgets/simple-palette/simple-scheme.vue';

export default {

  components: {
    simpleScheme,
  },

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

    //
    colors: {
      type: Object,
    },


    size: {
      type: Number,
      default: 15
    },
  },

  computed: {
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
.simple-palette {
  padding: none;
}
.color-selector {
  display: flex;
  flex-flow: row wrap;
  width: 450px;;
}
// Small selectable color options
.color-option {
  display: flex;
  width: 100%;
  min-width: 150px;
  height: 70px;
  transition: .1s;
  box-shadow: 0px 0px 3px black;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 5px white;
  }
  &.selected {
    box-shadow: 0px 0px 5px white;
  }
  .shade {
    width: 10%;
    height: 100%;
  }
  .main-color {
    width: 60%;
    min-width: 100px;
    height: 100%;
  }
}
</style>