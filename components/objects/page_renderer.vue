<template>
<div>
  <!-- Rendering all body widgets:  -->
  <element-renderer v-for="(widget, widget_i) in elements"
    :editable="editable"
    :editTemplate="edit_template"
    :selected="selected_element == widget_i"
    @click="select_element(widget_i)"

    :key="'body-widget' + widget_i"

    :collection="collection_name"
    :source="'body_data'"
    :index="widget_i"
  >
  </element-renderer>

  <!-- Add widget button: -->
  <button v-if="editable && edit_template" @click="add_element()">+ Add element</button>

  <!-- Popup element editor: -->
  <element-editor v-if="edit_template"
    :value="elements[selected_element]" 
    @updateDraft="update_draft($event)"
    @input="add_element($event)"
  ></element-editor>


  
</div>
</template>

<script>
import elementEditor from '@/components/objects/editors/element_editor.vue';

import {Element} from '~/modules/globals.js';

export default {
  name: 'page-render',

  components: {
    elementEditor,
  },

  data() {
    return {
      // - Local page data: - 

      // key shortcut stuff:
      keys: {
        command: false,
      },


      editable: true,

      // Lets us add fields to widgets
      new_field_name: '',

      // Show footer:
      footer_height: 0,
      show_side_bar: true,

      // An array of strings for each element in the route.
      // So '/projects/rooftop-website' will return ['projects', 'rooftop-website']
      route: this.$route.params.pathMatch.split('/'),

      // This will hold the collection of the document we're looking at
      collection_name: '',
      // And the id of that document:
      doc_id: '',

      selected_element: 0,   // The index of the currently selected el.
      edit_template: true,   // Whether we have the template editor open

      // If the document has unsaved changes
      unsaved_changes: false,
      // True while saving:
      saving: false,
    }
  },

  

  computed: {

    elements() {
      let elements = this.$store.getters['drafts/page/elements'];
      return elements;
    },

    side_bar_data() {
      let side_bar_data = this.$store.getters['draft_document/side_bar_data'];
      return body_data;
    },


  },

  mounted() {
    this.$store.dispatch('drafts/page/load');
    // this.custom_routing();
  },

  destroyed() {
  },

  methods: {

    custom_routing() {

      // If there's just one argument + it isn't an alias or quick link, it's nothin'. 
      if (this.route.length == 0) {
        this.$router.push('/404');
      }


      // For routes with more than one parameter, the expected structure is this:
      // rooftop-media.org / page_state / collection / document / folder_1 / … / folder_n / document 
      else if (this.route.length == 1) {

        let collection_name = this.route[0];
        let page_template_id = '@' + collection_name;
        this.dispatch('drafts/page/load', { id: page_template_id });

      // If there's an odd number of elements in the route, we're looking at a collection. 
      } else {
        let collection_name = this.route[0];
        let doc_id = this.route[1]
      }

    },

    // Adding a field to a widget
    add_field() {
      Vue.set(this.document_draft.body_data[this.selected_element], this.new_field_name, "Value")
      this.new_field_name = '';
    },

    toggle_footer() {
      if (this.footer_height < 10) {
        this.footer_height = 300;
      } else {
        this.footer_height = 0;
      }
    },

    save_doc() {
      this.saving = true;

      let update_object = {
        body_data: this.body_data,
        ...this.doc_data
      }


      this.$store.dispatch('draft_document/update_doc', {
        doc_id: this.doc_id,
        collection_name: this.collection_name,
        update: update_object,
      })
    },

    load_page(collection_name, doc_id) {
      this.collection_name = collection_name;
      this.doc_id = doc_id;

      // If the collection isn't one of the queryable tables, go to 404. 
      let valid_collection_names = ['project', 'article', 'user'];
      if (valid_collection_names.indexOf(this.collection_name) == -1) {
        this.$router.push('/404');
        return;
      }


      this.$store.dispatch('draft_document/read_page_doc', {
        collection_name: this.collection_name,
        doc_id: this.doc_id
      })
      
    },

    // Updating a widget's field in the store.
    update_widget_data(field, new_value) {
      let widget_update = {};
      widget_update[field] = new_value;
      // Pass to the store
      this.$store.commit('draft_document/set_body_widget', {
        index: this.selected_element,
        widget: widget_update
      });
    },

    add_element() {
      this.$store.commit('drafts/page/add_element', new Element());
      this.selected_element = this.elements.length - 1;
    },

    select_element(index) {
      let selected_el = this.$store.getters['drafts/page/element'](index);
      this.$store.commit('drafts/element/load_element', 
        selected_el,
      )
      this.selected_element = index;
      this.edit_template = true;
    }

  }
}
</script>

<style lang="scss">


.body-floating-icons, .footer-floating-icons {
  position: sticky;
  width: 30px;
  padding-left: 10px;
  padding-top: 10px;
  svg {
    fill: var(--bg-text2);
    --icon: var(--bg-text2);
    cursor: pointer;
    &:hover:not(.disabled) {
      fill: var(--bg-text);
      --icon: var(--bg-text);
    }
  }
}
.body-floating-icons {
  left: 10px;
  top: 0px;
}
.footer-floating-icons {
  left: 10px;
  transition-duration: .1s;
}
.body {
  position: relative;
}

.footer {
  position: fixed;
  font-size: var(--small-font-size);
  width: 100%;
  bottom: 0px;
  height: 100px;
  background: var(--card2);
  z-index: 50;
}
.disabled {
  opacity: .5;
}
.body-container {
  position: relative;
  width: 100%;
}



</style>