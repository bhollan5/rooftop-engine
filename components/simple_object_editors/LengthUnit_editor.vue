<template>
<div>
  <slider></slider>
</div>
</template>

<script>

import {LengthUnit} from '~/modules/globals';

export default {
  name: 'LengthUnitEditor',
  
  props: {
    value: {
      type: Object,
      default() {
        return new LengthUnit();
      }
    }
  },

  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>

</style>