<template>
<div class="simple-palette">

    <!-- Background: -->
    <simple-scheme 
    :value="value"
    @input="$emit('input', $event)"
    bg="bg" 
    text="bg_text" 
    secondary="bg_text2"
    :colors="colors">
    </simple-scheme>
    
    <!-- Cards: -->
    <simple-scheme 
      :value="value"
      @input="$emit('input', $event)"
      bg="card" 
      text="card_text" 
      secondary="card_text2"
      :colors="colors"
    >
    </simple-scheme>

    <!-- Illustration colors: -->
    <div class="title">Illustration colors:</div>
    <color-palette
      :value="value"
      @input="$emit('input', $event)"
      :fields="['c1', 'c2', 'c3']"
      :colors="colors"
    ></color-palette>

    <!-- Action: -->
    <simple-scheme 
      :value="value"
      @input="$emit('input', $event)"
      bg="action" 
      text="action_text" 
      :colors="colors">
    </simple-scheme>

    <!-- Danger: -->
    <simple-scheme 
      :value="value"
      @input="$emit('input', $event)"
      bg="danger" 
      text="danger_text" 
      :colors="colors">
    </simple-scheme>

    <!-- Confirm: -->
    <simple-scheme 
      :value="value"
      @input="$emit('input', $event)"
      bg="confirm" 
      text="confirm_text" 
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
  .color-scheme {
    margin-bottom: 10px;
  }
}
</style>