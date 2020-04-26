<template>
<!-- The 'content' is the body, side bar, and footer. -->
<the-content>

  <!--                                                                      -->
  <!-- First up: The side bar, which pops up from the left when it's shown! -->
  <!--                                                                      -->
  <template #sidebar>
  
    <!-- Always-present document details: -->
    <document-details></document-details>

    <!-- Dynamic card widgets for different modes: -->
    <card title="Edit widget fields:" v-if="body_data && body_data[selected_widget]">
      <text-field v-for="(value, field) in body_data[selected_widget]" 
        :key="field"
        v-if="typeof(value) == 'string'"
        :title="field + ':'" 
        :value="body_data[selected_widget][field]"
        @input="update_widget_data(field, $event)">
      </text-field>
      <br>
      <text-field title="New field name" v-model="new_field_name"></text-field>
      <button @click="update_widget_data(new_field_name, '')">Add Field</button>
    </card>

  </template>

  
  <!-- Floating top left icons: -->
  <template #floatingicons>

    <!-- Collapse the side bar: -->
    <div @click="show_side_bar = !show_side_bar">
      <left-arrow-icon v-if="show_side_bar"></left-arrow-icon>
      <right-arrow-icon v-else></right-arrow-icon>
    </div>
    
    <!-- Toggle edit mode:      -->
    <div @click="editable = !editable">
      <view-icon v-if="editable" ></view-icon>
      <edit-icon v-else></edit-icon>
    </div>

    <!-- Save the document:     -->
    <div @click="save_doc()">
      <save-icon :class="{ 'disabled': saving || !unsaved_changes }">
      </save-icon>
    </div>

  </template>  <!-- End floating icons -->

  <!-- Content body: -->
  <template #body>

    

    <!-- Rendering all body widgets:  -->
    <widget-renderer v-for="(widget, widget_i) in body_data"
      :editable="editable"
      :selected="selected_widget == widget_i"
      @click="selected_widget = widget_i"
      :owner="page_data.id"

      :key="'body-widget' + widget_i"

      :collection="collection_name"
      :source="'body_data'"
      :index="widget_i"
    >
    </widget-renderer>

    <!-- Add widget button: -->
    <button v-if="editable" @click="add_widget()">+ Add section</button>

    <!-- Padding at the bottom of the page, for more intuitive scrolling: -->
    <div class="body-content-padding" style="height: 200px;"></div>
      
  </template><!-- End body -->


    <!--               -->
    <!-- Footer stuff: -->
    <!--               -->

    <!-- The floating icons, to toggle the footer: -->
    <div class="footer-floating-icons" @click="toggle_footer()"
      v-if="0"
      :style="{ bottom: footer_height + 'px'}">
      <div @click="toggle_footer()">
        <up-arrow-icon v-if="footer_height < 10"></up-arrow-icon>
        <down-arrow-icon v-else></down-arrow-icon>
      </div>
    </div>

    <!-- Footer: -->
    <div class="footer card flex-container" 
      :style="{ height: footer_height + 'px'}">

      <div style="width: 400px;padding:5px;">
        <object-display :object="body_data"
          title="body_data"></object-display>
      </div>
      <div style="width: 400px;padding:5px;">
        <object-display :object="body_data"
          title="body_data"></object-display>
      </div>
    </div>

  

</the-content>
</template>

<script>

import Vue from 'vue';
import widgetRenderer from '~/components/widget_renderer.vue';
import objectDisplay from '~/components/widgets/debug/object_display.vue';

import documentDetails from '~/components/widgets/side_bar/document_details.vue';

import {PageTemplate} from '~/modules/globals.js';

export default {
  name: 'page-render',

  components: {
    objectDisplay,
    widgetRenderer,
    documentDetails,
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

      selected_widget: -1,

      // If the document has unsaved changes
      unsaved_changes: false,
      // True while saving:
      saving: false,
    }
  },

  

  computed: {

    page_data() {
      let page_data = this.$store.getters['page/page_data'];
      return page_data;
    },

    body_data() {
      let body_data = this.$store.getters['page/body/body_data'];
      return body_data;
    },

    side_bar_data() {
      let side_bar_data = this.$store.getters['page/side_bar_data'];
      return body_data;
    },


  },

  mounted() {

    console.warn("Called mount")
    console.log(PageTemplate.get_page_template({ id: 'user' }));

    //        - - - Route handling: - - -
    
    // TODO: Handle aliases here

    // TODO: Handle quick links here

    // If there's just one argument + it isn't an alias or quick link, it's nothin'. l
    if (this.route.length == 1) {
      this.$router.push('/404');
    }


    // For routes with more than one parameter, the expected structure is this:
    // rooftop-media.org / state / collection / document / folder_1 / … / folder_n / document 
    else if (this.route.length > 1) {

      this.page_state = this.route[0];
      let valid_page_states = ['view', 'edit', 'svg-editor', 'space-editor', 'metaedit'];
      if (valid_page_states.indexOf(this.page_state) == -1) {
        console.warn("Not a valid page state!")
      }

      this.collection_name = this.route[1];
      this.doc_id = this.route[this.route.length - 1];
      this.load_page()

    // If there's an odd number of elements in the route, we're looking at a collection. 
    } else {
      this.collection_name = this.route[this.route.length - 1];
    }


    //   - - - Keyboard shortcuts: - - - 
    // 
    window.addEventListener("keydown", event => {
      // Holding command?
      if (event.keyCode === 91 || event.metaKey) {
        this.keys.command = true;
      }
      
      // Shortcuts when you hold down "command"
      if (this.keys.command) {
        // "S": Save doc
        if (event.keyCode === 83) {
          this.save_doc();
          event.preventDefault();
        // "D": Toggle view display
        } else if (event.keyCode == 68) {
          this.editable = !this.editable;
          event.preventDefault();
        }
      }
      
      // do something
    });
    
    window.addEventListener("keyup", event => {
      // No longer holding command
      if (event.keyCode === 91 || event.metaKey) {
        this.keys.command = false;
      }
    });
  },

  destroyed() {
  },

  methods: {
    // Adding a field to a widget
    add_field() {
      Vue.set(this.document_draft.body_data[this.selected_widget], this.new_field_name, "Value")
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
      this.$store.dispatch('page/update_doc', {
        doc_id: this.doc_id,
        collection_name: this.collection_name,
        update: {
          body_data: this.body_data
        }
      })
      return;
      // this.$store.dispatch(this.collection_name + 's/update_' + this.collection_name, {
      //   _id: this.doc_id,
      //   update: {
      //     body_data: this.document_draft.body_data,
      //   }
      // }).then(() => {
      //   this.unsaved_changes = false;
      //   this.saving = false;
      // })
    },

    load_page() {

      // If the collection isn't one of the queryable tables, go to 404. 
      let valid_collection_names = ['project', 'article', 'user'];
      if (valid_collection_names.indexOf(this.collection_name) == -1) {
        this.$router.push('/404');
        return;
      }


      this.$store.dispatch('page/read_page', {
        collection_name: this.collection_name,
        doc_id: this.doc_id
      })
      
    },

    // Updating a widget's field in the store.
    update_widget_data(field, new_value) {
      let widget_update = {};
      widget_update[field] = new_value;
      // Pass to the store
      this.$store.commit('page/set_body_widget', {
        index: this.selected_widget,
        widget: widget_update
      });
    },

    add_widget() {
      this.$store.commit('page/add_body_widget', {
        component: 'new',
        content: ''
      });
      this.selected_widget = this.body_data.length - 1;
    },

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