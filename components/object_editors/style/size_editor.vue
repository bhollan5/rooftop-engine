<template>
<container class="small-font" :width="300">
  
  <slider title="Width:" 
    :min="0" 
    :max="100" 
    :value="8">
  </slider>

  <div>Draft el size: {{draft_el_size}}</div>
  <br><br>

</container>
</template>

<script>

import {Size} from '~/modules/globals';

export default {
  name: 'sizeEditor',

  computed: {
    size() {
      return new Size()
    },
    draft_el_style() {
      return this.$store.getters['draft_element/element_style'];
    },
    draft_el_size() {
      return this.$store.getters['draft_element/element_size'];
    }
  },

  data() {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>

</style>