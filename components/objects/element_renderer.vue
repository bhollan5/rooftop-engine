<template>
<container class="element-renderer"
  @click="$emit('click')"
>

  El: {{element}}

    <!-- Utility (will not show up when the page is viewed )-->
    <new-element v-if="element.component_id == 'new'"
      :value="element" 
      @input="add_element($event)">
    </new-element>

    <!-- Text -->

    <text-field v-if="element.component_id == 'text-field'"
      :editable="editable"
      :value="element_props.value"
      
      :fontsize="element_props.fontsize"
      nobox
      @input="update_data( 'value', $event )"
    ></text-field>

    <element-editor v-if="selected && editTemplate"
      :value="element" 
      :propValues="element_props"
      @reset="reset_draft()"
      @updateDraft="update_draft($event)"
      @input="add_element($event)"
    ></element-editor>

</container>
</template>

<script>


// Widgets:
import newWidget from '@/components/containers/new_widget.vue';
import elementEditor from '@/components/_internal/element_editor.vue';




export default {
  name: 'widget-renderer',
  components: {
    elementEditor,
    newWidget,
  },

  props: {
    // Who owns this doc?
    owner: {
      type: String,
    },
    // Illuminate the lights next to this component?
    selected: {
      type: Boolean
    },
    // Whether we're editing the template of the current selection.
    editTemplate: {
      type: Boolean,
    },
    // editable content? 
    editable: {
      type: Boolean,
      default: false,
    },
    // Toggles visual boxes around inputs
    noboxes: {
      type: Boolean,
      default: true
    },
    index: Number,
  },

  data() {
    return {

      draftElement: {} // When editTemplate is true, we display this instead of the actual element.
      
    }
  },

  computed: {

    element() {
      if (this.editTemplate && this.selected){
        return this.draftElement;
      } else {
        return this.$store.getters['drafts/page/element'](this.index);
      }
    },

    element_style() {
      return this.$store.getters['draft_element/element_style'];
    },

    doc_data() {
      return this.$store.getters['drafts/pages/elements'];
    },

    // element_props() connects props with the values from various prop sources.
    /* Ex: If 'element.prop+config' looks like this: 
      { value: { connection_type: 'doc_data', field: 'display_name' }, ... }
      element_props will return this:
      { value: this.doc_data.display_name, ... }
    */
    element_props() {

      let element_props = {};
      let prop_config = this.element.prop_config; // For the shorter name

      for (let prop_field in prop_config) {
        
        if (typeof(prop_config[prop_field]) == 'string' || typeof(prop_config[prop_field]) == 'number') {
          element_props[prop_field] = prop_config[prop_field];

        } else if (typeof(prop_config[prop_field]) == 'object'){
        
          let connection_type = prop_config[prop_field].connection_type;
          let source_field = prop_config[prop_field].field;
          if (connection_type == 'doc_data') {
            //element_props[prop_field] = this.doc_data[source_field];
          }

        }
      }
      return element_props;

    },



    // We don't display the "add section" button if this page is a parent,
    // because the add section button will go in the child element:
    isParent() { 
      for (let i in this.data) {
        if (this.data[i].type == 'tabs') {
          return true;
        }
      }
      return false;
    }
  },

  


  methods: {

    //
    update_draft(new_draft) {
      this.draftElement = new_draft;
    },
    reset_draft() {
      let saved_element = this.$store.getters['draft_body/body_element'](this.index);
      this.draftElement = saved_element;
    },

    // When the user clicks on a element
    select_element(index) {
      this.$emit('elementselect', index);
    },

    // Updating an element's fields in the store. 
    update_data(prop_field, value) {

      let connection_type = this.element.prop_config[prop_field].connection_type;
      let source_field = this.element.prop_config[prop_field].field;

      let update_obj = {}
      update_obj[source_field] = value;

      if (connection_type == 'static_data') {
        // todo 
      } else if (connection_type == 'doc_data') {
        
        this.$store.commit('draft_document/update_doc_data', update_obj)
      }

      return;
      // Pass to the store
      this.$store.commit('draft_body/set_body_element', {
        index: this.index,
        element: new_element
      });
    },

    // Replaces the 'new-element' component with a truly new element. 
    add_element(element) {
      
      this.$store.commit('draft_body/set_body_element', {
        index: this.index,
        element: element
      });
    },



    // Called when a file is uploaded
    uploadFile(event, elementIndex) {
      let _file = event.target.files[0];
      console.log(_file);
      let fileName = _file.name;
      // Reading the file's contents
      this.readFileContent(_file).then(fileContent => {
        this.data[elementIndex].content = fileContent;
      }).catch(error => console.log(error))

    },

    // This function takes an svg file and returns the actual XML code of that SVG as a string.
    // It uses FileReader, a web API available by default in modern browsers.
    readFileContent(file) {
      const reader = new FileReader()
      // We're returning a promise, which  means you can use the .then(() => {}) function on this one!
      return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
      })
    },

    // Clicks on the hidden input so we can use our custom-styled input
    openSVGInput() {
      this.$refs['fileInput'][0].click()
    },


  },

  

}
</script>

<style lang="scss" scoped>
// Note that this style isn't scoped, since it needs to reach inside components?

// The v-for generated element containers
.element-container {
  position: relative;
  transition-duration: .2s;
  margin-bottom: 5px;
}

// The two selection light indicators to the sides of elements. 
// Styling:
.element-container.editable::before, .element-container.editable::after {
  content: '';
  height: 15px;
  width: 15px;
  top: calc(50% - 7px);
  border: solid 5px var(--bg); // invisible border makes it appear small, but be easy to grab
  border-radius: 50%;
  position: absolute;
  cursor: grab;
  transition-duration: .4s;
  background: var(--card);
}
.element-container.selected-element::after, .element-container.selected-element::before {
  background: var(--c1);
}
// Positions:
.element-container.editable::before {
  left: -20px;
}
.element-container.editable::after {
  right: -20px;
}



</style>