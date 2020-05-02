<template>
<div class="color-thumbnail"
  :style="{
      background: color.get_css_string(),
      width: width + 'px',
      height: height + 'px',
    }">

</div>
</template>

<script>
import {Color} from '~/modules/globals.js';

export default {
  name: 'colorThumbnail',

  props: {
    color: {
      default() {
        return new Color();
      }
    },
    width: {
      type: Number,
      default: 20,
    },
    height: {
      type: Number,
      default: 20,
    }
  },

  mounted() {
  }

}

</script>

<style lang="scss" scoped>

.color-thumbnail {

}

</style>