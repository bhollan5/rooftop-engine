<template>
<div class="widget-container" 
  :class="{
    'editable': editable,
    'selected-widget': selected
  }"
  v-if="widget"
  :style="{
    'margin-top': (widget.top || 0) + 'px',
    'margin-bottom': (widget.bottom || 0) + 'px',
  }"
  @click="$emit('click')"
>

    <!--                                    -->
    <!-- Header/card widget components:     -->
    <!--                                    -->

    <object-editor v-if="widget.component == 'object-editor'"
      :value="widget"
      @input="update_data($event)">
    </object-editor>


    <!--                                    -->
    <!-- Body widget components:            -->
    <!--                                    -->

    <!-- Utility (will not show up when the page is viewed )-->
    <new-widget v-else-if="widget.component == 'new'"
      :value="widget" 
      @input="update_data($event)">
    </new-widget>


    <!-- Decorative -->

    <line-break v-if="widget.component_id == 'line-break'" color="var(--bg-text2)"></line-break>
    <hr v-if="widget.component == 'hr'" style="border: solid 1px var(--bg-text2);"></hr>
    

    <!-- Text -->

    <text-field v-if="widget.component_id == 'text-field'"
      :editable="editable"
      :value="widget_props.value"
      
      :fontsize="widget_props.fontsize"
      nobox
      @input="update_data( 'value', $event )"
    ></text-field>

    <!-- Tabs: 
    <div class="tab-container" v-else-if="widget.type == 'tabs'">
      <div class="tabs" >
        <text-field class="tab" 
          v-for="(tab, tabindex) in widget.tabs" 
          :class="{ 'bold': widget.selectedTab == tabindex}" 
          nobox 
          @click="widget.selectedTab = tabindex" 
          v-model="tab.name" 
          :key="'tab-' + tabindex">
        </text-field>
        <div class="tab add-tab" @click="addTab(widget)">+ Add Tab</div>
      </div>
    </div> -->


    <article-card v-else-if="widget.component == 'article-card'" 
      :editable="editable"
      :owner="owner"
      :value="widget" 
      @input="update_data($event)">
    </article-card>

    <collection v-else-if="widget.type == 'collection'" :editable="editable"
    :owner="id"
    :value="widget" @input="emit_update($event.path, index, $event.new_val)">
    </collection>

    <!-- Images: -->
    <!--
    <div class="image-section" v-else-if="widget.type == 'image'" @change="uploadFile($event, index)" enctype="multipart/form-data"
          @click="openSVGInput(index)">
        
      <input type="file" accept="image/svg" ref="fileInput" style="display: none;">
      <p v-if="!widget.content">+ Upload an Image</p>
      <div v-html="widget.content" v-else></div>

    </div>-->
    
    <div class="image-section" v-else-if="widget.type == 'image'">
      <svg-uploader v-model="widget.content" :ref="'svg_uploader_'"></svg-uploader>
    </div>
</div>
</template>

<script>


// Widgets:
import newWidget from '@/components/widgets/new_widget.vue';

import objectEditor from '@/components/widgets/side_bar/object_editor.vue';

export default {
  name: 'widget-renderer',
  components: {

    newWidget,
    objectEditor,
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

  computed: {

    widget() {
      return this.$store.getters['page/body/body_widget'](this.index);
    },

    doc_data() {
      return this.$store.getters['page/doc_data'];
    },

    // widget_props() connects props with the values from various prop sources.
    /* Ex: If 'widget.prop+config' looks like this: 
      { value: { connection_type: 'doc_data', field: 'display_name' }, ... }
      widget_props will return this:
      { value: this.doc_data.display_name, ... }
    */
    widget_props() {

      let widget_props = {};
      let prop_config = this.widget.prop_config; // For the shorter name

      for (let prop_field in prop_config) {
        
        let connection_type = prop_config[prop_field].connection_type;
        let source_field = prop_config[prop_field].field;

        if (connection_type == 'static_data') {
          widget_props[prop_field] = this.widget.static_data[source_field];

        } else if (connection_type == 'doc_data') {
          widget_props[prop_field] = this.doc_data[source_field];
        }
      }
      return widget_props;

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

  data() {
    return {

      selected_widget: -1, // the widget clicked on last
      editElement: -1, // This indicates the index of the element being edited
      
    }
  },


  methods: {
    // When the user clicks on a widget
    select_widget(index) {
      this.selected_widget = index;
      this.$emit('widgetselect', index);
    },

    // Updating the widget's fields in the store
    update_data(prop_field, value) {

      let connection_type = this.widget.prop_config[prop_field].connection_type;
      let source_field = this.widget.prop_config[prop_field].field;

      let update_obj = {}
      update_obj[source_field] = value;

      if (connection_type == 'static_data') {
        // todo 
      } else if (connection_type == 'doc_data') {
        
        this.$store.commit('page/update_doc_data', update_obj)
      }

      return;
      // Pass to the store
      this.$store.commit('page/body/set_body_widget', {
        index: this.index,
        widget: new_widget
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

    // Adds a tab section
    addTab(tabElement) {
      
      tabElement.tabs.push({
        "name": "New Tab",
        "content": [
            {
                "type": "section-title",
                "content": ""
            },
            {
                "type": "subsection-title",
                "index": "1.1",
                "content": ""
            },
            {
                "type": "paragraph",
                "content": ""
            }
        ]
      });
    }

  },

  

}
</script>

<style lang="scss" scoped>
// Note that this style isn't scoped, since it needs to reach inside components?

// Content contains all the inputs:
.body {
  width: 100%;
  max-width: 600px;
  align-content:flex-start;
}

// The v-for generated widget containers
.widget-container {
  position: relative;
  transition-duration: .2s;
  margin-bottom: 5px;
}

// The two selection light indicators to the sides of widgets. 
// Styling:
.widget-container.editable::before, .widget-container.editable::after {
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
.widget-container.selected-widget::after, .widget-container.selected-widget::before {
  background: var(--c1);
}
// Positions:
.widget-container.editable::before {
  left: -20px;
}
.widget-container.editable::after {
  right: -20px;
}




.tab-container {

}
.tabs {
  display: flex;
  margin-top: 50px;
  border-bottom: solid 2px var(--bg-text2);
  margin-bottom: 20px;

  .tab {
    font-size: var(--small-font-size);
    width: 150px;
    padding: 0px;
    text-align: center;
    position: relative;
    cursor: pointer;
    margin-top: -2px;
    transform: translatey(2px); // This offset lets the border-bottoms line up
    input {
      text-align: center;
      padding: 10px 0px;
      margin: 0px;
    }
  }
  .add-tab {
    color: var(--bg-text2);
    font-size: var(--small-font-size);
    &:hover {
      
      color: var(--bg-text);
    }
  }
}
.tab-content {

}




// For sections containing images:
.image-section {
  cursor: pointer;
  width: 100%;
  min-height: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  p {
    cursor: pointer;
  }
  &:hover {
    background: var(--input);
  }
  .image-uploader {
    width: 100%;
    height: 100%;
  }
}

// Add section button:
#add-section-button {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
}

input:active, input:hover {
  background: var(--input);
}
</style>