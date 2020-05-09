<template>
<div v-if="length_unit">
  {{length_unit}}
  <slider :value="length_unit.value" 
    :title="length_unit.name"
    @input="update($event)">
  </slider>
</div>
</template>

<script>

import {LengthUnit} from '~/modules/globals';

export default {
  name: 'LengthUnitEditor',
  
  props: {
    _length_unit: {
      type: Object,
      default() {
        return new LengthUnit();
      }
    }
  },

  computed: {
    length_unit() {
      let el_size = this.$store.getters['drafts/element/size'];
      if (el_size){
        return el_size.width;
      }
    }
    

  },

  data() {
    return {
      
    }
  },

  methods: {
    update(new_val) {
      console.log(new_val);
      this.$store.commit('drafts/element/update', {
        width: new_val,
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>