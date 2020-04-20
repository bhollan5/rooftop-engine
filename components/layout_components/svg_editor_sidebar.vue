<template>
<div id="side-bar">

  <div id="side-bar-content">

    <card title="Layer details:">
      <div class="small-font">
        {{selected_layer}}
        <br>
        {{selected_layer.style}}
      </div>
    </card>

    <card title="Layer picker:" nopadding>
      <svg-layer v-for="(node, node_i) in xml_doc.documentElement.childNodes" 
        v-if="node.nodeName != '#text'" :layer="node" 
        :key="'layer' + node_i" @layerselect="selected_layer = $event" >
      </svg-layer>
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
import svgLayer from '~/components/layout_components/svg-layer.vue';

export default {
  name: 'svg-editor-side-bar',
  mounted() {

  },
  data() {
    return {
      selected_layer: 0,
    }
  },
  components: {
    svgLayer,
  },
  computed: {
    selected_element() {
      return [];//this.$store.getters['svg/element_by_path'](this.selected_layer);
    },

    xml_doc() {
      return this.$store.getters['page/svg_editor/xml_doc'];
    },

    all_elements() {
      let all_elements = this.xml_doc.documentElement.childNodes;
    }
  }
}
</script>