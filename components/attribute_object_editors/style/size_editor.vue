<template>
<container class="small-font" :width="300" v-if="size">
  
  <length-unit-editor 
    :lengthUnit="size.width"
    @input="update($event)">
  </length-unit-editor>

  <div>Draft el size: {{size}}</div>
  <br><br>

</container>
</template>

<script>

import {Size} from '~/modules/globals';

export default {
  name: 'sizeEditor',

  computed: {
    size() {
      return this.$store.getters['drafts/element/box_size'];
    },
  },

  data() {
    return {

    }
  },

  methods: {
    update(new_val) {
      console.log(new_val);
      this.$store.commit('drafts/element/update_size', {
        width: new_val,
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>