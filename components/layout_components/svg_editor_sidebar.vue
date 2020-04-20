<template>
<div id="side-bar">

  <div id="side-bar-content">

    <card title="Layer details:">
      <div class="small-font">
        {{selected_layer}}
        <br>
        {{selected_element.attributes}}
      </div>
    </card>

    <card title="Layer picker:" nopadding>
      <layer-picker :layers="all_elements" v-model="selected_layer"></layer-picker>
      <object-display :object="all_elements" v-if="0"></object-display>
    </card>
    
  </div>
  <!-- Cards here -->

  <div id="side-bar-hover">
    <slot name="hovering" >
      <!-- More cards here -->
    </slot>
  </div>

</div>
</template>

<script>
export default {
  name: 'svg-editor-side-bar',
  mounted() {

  },
  data() {
    return {
      selected_layer: [0]
    }
  },
  computed: {
    selected_element() {
      return [];//this.$store.getters['svg/element_by_path'](this.selected_layer);
    },

    // all_elements looks like this:
    //    [ { key: String, attributes: Object, children: Array of objects }, {...} ]
    all_elements() {
      return [];//this.$store.getters['svg/element_tree'];
      //return this.$svg.get_node_elements(this.svg_json);
    },
  }
}
</script>