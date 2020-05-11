<template>
<div v-if="lengthUnit">
  <slider :value="lengthUnit.value" 
    :title="lengthUnit.name"
    @input="$emit('input', $event)">
  </slider>
</div>
</template>

<script>

import {LengthUnit} from '~/modules/globals';

export default {
  name: 'LengthUnitEditor',
  
  props: {
    lengthUnit: {
      type: Object,
      default() {
        return new LengthUnit();
      }
    }
  },

  data() {
    return {
      
    }
  },

  methods: {
    
  }
}
</script>

<style lang="scss" scoped>

</style>