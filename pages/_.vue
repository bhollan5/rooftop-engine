<template>
<!-- The 'content' is the body, side bar, and footer. -->
<div class="content">

  <transition name="left-popup">
  <side-bar :title="route[0] + '/' + route[1]" v-if="show_side_bar && body_data">
  
    <card title="Document data" class="small-font">
      <text-field class="small-font" title="Title:" 
      v-model="title"></text-field>
    </card>

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

  </side-bar>
  </transition>

  <!-- Page body & footer -->
  <div class="body-container">
  
    <div class="floating-icons">
      <div @click="show_side_bar = !show_side_bar">
        <left-arrow-icon v-if="show_side_bar"></left-arrow-icon>
        <right-arrow-icon v-else></right-arrow-icon>
      </div>
      
      <div @click="editable = !editable">
        <view-icon v-if="editable" ></view-icon>
        <edit-icon v-else></edit-icon>
      </div>

      <div @click="save_doc()">
        <save-icon :class="{ 'disabled': saving || !unsaved_changes }">
        </save-icon>
      </div>
    </div>

    <div class="body">
      

      <br><br>
      <widget-renderer v-for="(widget, widget_i) in body_data"
        :editable="editable"
        :selected="selected_widget == widget_i"
        @click="selected_widget = widget_i"

        :key="'body-widget' + widget_i"

        :collection="collection_name"
        :source="'body_data'"
        :index="widget_i"
      >
      </widget-renderer>
      <!-- Add widget button: -->
      <button v-if="editable" @click="add_widget()">+ Add section</button>
    <!--
      <page-body v-if="document_draft.body_data"
        :value="document_draft.body_data"
        @input="update_draft($event.path, 'body_data', $event.new_val)"
        :editable="editable" 
        @addwidget="add_widget()"
        @widgetselect="selected_widget = $event"
        owner="project_id"
      >
        

      </page-body>-->
    </div><!-- End body -->

    <div class="footer card flex-container" style="overflow-y: scroll;" v-if="show_footer">
      <div style="width: 400px">
        <object-display :object="body_data"
          title="document_draft"></object-display>
      </div>
      <div style="width: 400px">
        <object-display :object="sample_document"
          title="sample_document"></object-display>
        <text-field 
          title="sample_document.data[0].content"
          v-model="sample_document.data[0].content"
        ></text-field>
      </div>
    </div>

  </div>
  

</div>
</template>

<script>
import Vue from 'vue';

import pageBody from '~/components/body/page_body.vue';
import widgetRenderer from '~/components/widget_renderer.vue';


import objectDisplay from '~/components/widgets/debug/object_display.vue';


export default {
  name: 'page-render',

  components: {
    objectDisplay,
    widgetRenderer,
  },

  data() {
    return {
      title: 'hi',

      // key shortcut stuff:
      keys: {
        command: false,

      },

      editable: true,

      sample_document: {
        id: 'sample object!',
        data: [
          {
            type: 'paragraph',
            content: 'My paragraph!'
          }
        ]
      },


      // Lets us add fields to widgets
      new_field_name: '',

      // Show footer:
      show_footer: true,
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


    body_data() {
      let body_data = this.$store.getters['page/body_data'];
      return body_data;
    },


  },

  mounted() {

    //   - - - Route handling: - - -
    // If there's an even number of elements in the route, we're looking at a document.
    if (this.route.length % 2 == 0) {
      this.collection_name = this.route[this.route.length - 2];
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
      if (this.collection_name != 'project' && this.collection_name != 'article') {
        this.$router.push('/404');
        return;
      }
      // Loading in the page by page ID. 
      this.$store.dispatch('page/read_doc', {
        collection_name: this.collection_name,
        query: { 
          _id: this.doc_id 
        }
      }).then((docs) => {
        console.log("🌺")
      });
      
      console.log("load_page called. ")

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

.floating-icons {
  position: absolute;
  width: 20px;
  left: 10px;
  top: 10px;
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
.body {
  position: relative;
}

.footer {
  position: fixed;
  font-size: var(--small-font-size);
  width: 100%;
  bottom: 0px;
  height: 200px;
  background: var(--card2);
  padding: 10px;
}
.disabled {
  opacity: .5;
}
.body-container {
  position: relative;
  width: 100%;
}

</style>