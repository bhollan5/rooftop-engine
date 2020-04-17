<template>
<div id="side-bar">
  <div id="side-bar-header">
    <div id="side-bar-title" class="small-font">SVG editor</div>
  </div>

  <div id="side-bar-content">
    <card title="Layer picker:">
      <layer-picker :layers="all_elements" v-model="selected_layer"></layer-picker>
      <object-display :object="all_elements" v-if="0"></object-display>
    </card>
    <card title="Layer attributes:">
      {{selected_layer}}
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
    // JSON of the SVG's XML
    svg_json() {
      return this.$store.getters['svg/svg_json'];
    },

    /* Composes elements like this:
      [
        {
          key: String,
          attributes: Object,
          children: Array of objects
        }, 
        ...
      ]
    */
    all_elements() {
      return this.$store.getters['svg/element_tree'];
      //return this.$svg.get_node_elements(this.svg_json);
    },
  }
}
</script>