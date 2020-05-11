<template>
<container class="small-font" :width="300" v-if="size">
  
  <option-picker
    :options="attributes"
    v-model="selected_attribute"
    title="Modifying:"
  />
  <br><br>
  <slider :title="selected_attribute + ':'"
    :value="size[selected_attribute].value"
    @input="update($event)">
  </slider>
  <br>
  <div class="size-display sample-container">
    <div class="sample-element">
      <div class="inner-outline"></div>
    </div>
  </div>
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
      attributes: ['width', 'height', 'padding', 'margins'],
      selected_attribute: 'width'
    }
  },

  methods: {
    update(new_val) {
      let update_obj = {};
      console.log("🐻 update obj")
      update_obj[this.selected_attribute] = new_val;
      console.log(update_obj);
      this.$store.commit('drafts/element/update_size', update_obj)
    }
  }
}
</script>

<style lang="scss" scoped>

.sample-container {
  width: 200px;
  border: dashed 2px var(--bg-light);
}
.sample-element {
  width: 150px;
  height: 75px;
  background: var(--bg);
  padding: 25px;
  margin: 25px;
  box-shadow: 0px 2px 5px black;
}

.inner-outline {
  width: 100px;
  height: 25px;
  border: dashed 2px var(--bg-light);
}


</style>