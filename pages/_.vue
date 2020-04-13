<template>
<!-- The 'content' is the body, side bar, and footer. -->
<div class="content">

  <side-bar :title="route[0] + '/' + route[1]" v-if="document_draft && document_draft.body_data">
  
    <card title="Document data" class="small-font">
      <text-field class="small-font" title="Title:" 
      v-model="document_draft.title"></text-field>
    </card>

    <card title="Edit widget fields:" v-if="document_draft.body_data[selected_widget]">
      <text-field v-for="(value, field) in document_draft.body_data[selected_widget]" 
        :key="field"
        v-if="typeof(value) == 'string'"
        :title="field + ':'" 
        v-model="document_draft.body_data[selected_widget][field]">
      </text-field>
      <br>
      <text-field title="New field name" v-model="new_field_name"></text-field>
      <button @click="add_field()">Add Field</button>

    </card>

  </side-bar>

  <!-- Page body & footer -->
  <div style="width: 100%; position: relative;">
    <page-body v-if="document_draft.body_data"
      :value="document_draft.body_data"
      @input="update_draft($event.path, 'body_data', $event.new_val)"
      :editable="editable" 
      @addwidget="add_widget()"
      @widgetselect="selected_widget = $event"
      owner="project_id"
    >
      <div class="floating-icons">
        <div @click="save_doc()">
          <save-icon :class="{ 'disabled': saving || !unsaved_changes }">
          </save-icon>
        </div>
        
        <div @click="editable = !editable">
          <view-icon v-if="editable" ></view-icon>
          <edit-icon v-else></edit-icon>
        </div>
      </div>

    </page-body>

    <div class="footer card flex-container" style="overflow-y: scroll;">
      <div style="width: 400px">
        <object-display :object="document_draft"
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

import objectDisplay from '~/components/widgets/debug/object_display.vue';


export default {
  name: 'page-render',

  data() {
    return {

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

      document_draft: {
        _id: '',
        body_data: [],
      },

      // Lets us add fields to widgets
      new_field_name: '',

      // An array of strings for each element in the route.
      // So '/projects/rooftop-website' will return ['projects', 'rooftop-website']
      route: this.$route.params.pathMatch.split('/'),

      // This will hold the collection of the document we're looking at
      collection_name: '',
      // And the id of that document:
      doc_id: '',

      selected_widget: false,

      // If the document has unsaved changes
      unsaved_changes: false,
      // True while saving:
      saving: false,

    }
  },

  components: {
    pageBody,
    objectDisplay,
  },

  computed: {

    // Pulling the document from the VueX store corresponding to it's collection:
    document() {
      if (this.collection_name && this.doc_id) {
        if (this.collection_name == 'project' || this.collection_name == 'article') {
          // Ex: if collection_name == 'project', this calls the getter "projects/project_query"
          let getter_name = this.collection_name + 's/' + this.collection_name + '_query';
          let query_result = this.$store.getters[getter_name]('_id', this.doc_id);
          return query_result[0];
        }
      }
      return {};
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
      this.$store.dispatch(this.collection_name + 's/update_' + this.collection_name, {
        _id: this.doc_id,
        update: {
          body_data: this.document_draft.body_data,
        }
      }).then(() => {
        this.unsaved_changes = false;
        this.saving = false;
      })
    },

    load_page() {
      // If the collection isn't one of the queryable tables, go to 404. 
      if (this.collection_name != 'project' && this.collection_name != 'article') {
        this.$router.push('/404');
        return;
      }

      // Getting the document from the DB.
      //  So, if collection_name == 'project', this will dispatch "projects/read_projects""
      let action_name = this.collection_name + "s/read_" + this.collection_name + 's'

      this.$store.dispatch(action_name, 
      { _id: this.doc_id }).then((docs) => {
        
        if (!docs[0]) {
          console.warn("No doc found.")
          return;
        }

        let our_doc = docs[0];

        our_doc.body_data.forEach((widget_data) => {
          let fresh_copy = JSON.parse(JSON.stringify(widget_data))
          this.document_draft.body_data.push(fresh_copy);
        })

      })

    },

    add_widget() {
      this.document_draft.body_data.push({
        type: 'new',
        content: ''
      });
      this.editElement = this.document_draft.length - 1;
    },

    // Making any updates to the article's JSON.
    update_draft(path, new_index, new_val) {

      path.unshift(new_index);
      let attribute_pointer = this.document_draft;

      for (let i = 0; i < (path.length - 1); i++) {
        attribute_pointer = attribute_pointer[path[i]];
      }
      attribute_pointer[path[path.length - 1]] = new_val;
      // Vue.set(attribute_pointer, path[path.length - 1], new_val);
      
      this.unsaved_changes = true;

    }

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

</style>