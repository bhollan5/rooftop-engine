<template>
<div id="side-bar">

  <div id="side-bar-content">

    <!-- Always-present document details: -->
    <document-details></document-details>

    <card title="Replace colors:">
      <color-palette :colors="svg_colors" :fields="svg_color_fields"></color-palette>
    </card>

    <!-- Layer details:       -->
    <card title="Layer details:" v-if="selected_layer">
      <div class="small-font">
        Selected layer: {{selected_layer.nodeName}}
        <br>
        <object-editor 
          :object="selected_layer_attributes" 
          @input="update_attr($event.value, $event.field)"
          @click="new_attr = $event">
        </object-editor>

        <div class="flex-container space-between">
          <text-field v-model="new_attr" title="new attribute"></text-field>
          <text-field v-model="new_val" title="new val"></text-field>
        </div>
        <button @click="update_attr(new_val, new_attr)">Update attributes</button>
      </div>
    </card>

    <!-- Layer picker: -->
    <card title="Layer picker:" nopadding>
      <svg-layer v-for="(node, node_i) in xml_doc.documentElement.childNodes" 
        v-if="node.nodeName != '#text'" 
        :path="[node_i]" 
        :selected="selected_layer_path"
        :key="'layer' + node_i" 
        @layerselect="select_layer($event)" >
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
import documentDetails from '~/components/editor_cards/document_details.vue';
import svgLayer from '~/components/_the_layout/svg-layer.vue';

export default {
  name: 'svg-editor-side-bar',
  mounted() {

  },
  data() {
    return {
      new_attr: '',
      new_val: '',
    }
  },
  components: {
    svgLayer,
    documentDetails
  },
  computed: {
    svg_colors() {
      return this.$store.getters['draft_doc/svg_editor/svg_colors'];
    },
    svg_color_fields() {
      let fields = [];
      for (let field in this.svg_colors) {
        fields.push(field);
      }
      return fields;
    },

    selected_layer() {
      return this.$store.getters['draft_doc/svg_editor/selected_layer'];
    },

    selected_layer_path() {
      return this.$store.getters['draft_doc/svg_editor/selected_layer_path'];
    },

    selected_layer_attributes() {
      let selected_layer_attributes = {};
      for (let i in this.selected_layer.attributes) {
        let field = this.selected_layer.attributes[i].name;
        let value = this.selected_layer.attributes[i].value;
        selected_layer_attributes[field] = value;
      }
      return selected_layer_attributes;
    },

    selected_element() {
      return [];//this.$store.getters['svg/element_by_path'](this.selected_layer);
    },

    xml_doc() {
      return this.$store.getters['draft_doc/svg_editor/xml_doc'];
    },

    all_elements() {
      let all_elements = this.xml_doc.documentElement.childNodes;
    },


  },
  methods: {
    update_attr(value, field) {
      this.$store.commit('draft_doc/svg_editor/update_node', {
        path: this.selected_layer_path,
        field: field,
        value: value
      });
    },

    select_layer(path) {
      this.$store.commit('draft_doc/svg_editor/select_layer', path);
    }
  },
}
</script>