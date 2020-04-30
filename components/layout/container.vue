<template>
<div class="container" 
  :style="{
    padding: padding_css,
    'box-shadow': box_shadow_css,
  }"
  :class="[ 'depth-' + depth ]"
  @click="$emit('click', $event)"
>

  <slot></slot>

</div>
</template>

<script>

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
    material: {

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