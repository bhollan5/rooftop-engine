<template>
<div class="content">

  <slot></slot>

  <!-- A widget container is created for each node in our data. -->
  <div class="widget-container" 
  v-for="(widget, widget_i) in data"
  :class="{
    'expanded-container': editElement == widget_i,
    'selected-widget': selected_widget == widget_i
  }"
  @click="select_widget(widget_i)">

    <!-- No gear icon for article headers or subheaders. -->
    <!-- TODO: Add options for tabs -->
    <div class="floating-element-icons" @click="editSelect(widget_i)"
    v-if="editable" 
    :class="{'floating-icons-selected': editElement == widget_i,
    'selected-widget': selected_widget == widget_i}">
      <gear-icon></gear-icon>
    </div>

    <!-- Popup shown when the gear button is clicked: -->
    <div class="edit-element-interface" v-if="editElement == widget_i">

      <!-- Input type selector: -->
      <div class="element-type-selector">
        <h5>Section type:</h5>
        <!-- v-for list of the section type options: -->
        <div class="element-type-option" v-for="widgetType in widgetTypes"
          :class="{'selected-element-type': 
            data[editElement].type == widgetType.type}"
          @click="selectElementType(widgetType.type)">
          <div class="element-type-icon"
          :class="{bold: widgetType.bold}">
            <image-icon v-if="widgetType.type == 'image'"></image-icon>
            <span v-else>{{widgetType.icon}}</span>
          </div>
          <div class="option-description">
            <p class="bold">{{widgetType.title}}</p>
            <p class="small-font">{{widgetType.description}}</p>
          </div>
        </div>
      </div>

      <div class="element-size-selector">
        <h5>Size:</h5>
      </div>

    </div>




    <!-- Various input types: -->




    <!-- Article header: -->
    <text-field id="article-header" 
      v-if="widget.type == 'header'"
      v-model="widget.content" 
      :nobox="noboxes"
      placeholder="Article Title" 
      nounderline></text-field>

    <!-- Article subheader: -->
    <text-field id="article-subheader" 
      v-else-if="widget.type == 'subheader'"
      v-model="widget.content" 
      :nobox="noboxes" 
      nounderline
      placeholder="Article Subheader (optional)"></text-field>

    <!-- Tabs: -->
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
    </div>

    <!-- section title: -->
    <section-title v-else-if="widget.type == 'section-title'" :editable="editable"
    :value="widget" @input="update_data(widget_i, $event)">
    </section-title>

    <!-- subsection title: -->
    <subsection-title v-else-if="widget.type == 'subsection-title'" :editable="editable"
    :value="widget" @input="update_data(widget_i, $event)">
    </subsection-title>
    
    <!-- Paragraphs: -->
    <paragraph v-else-if="widget.type == 'paragraph'" :editable="editable"
    :value="widget" @input="update_data(widget_i, $event)">
    </paragraph>

    <collection v-else-if="widget.type == 'collection'" 
    :id="widget.content"
    :editable="editable"></collection>

    <!-- Images: -->
    <!--
    <div class="image-section" v-else-if="widget.type == 'image'" @change="uploadFile($event, widget_i)" enctype="multipart/form-data"
          @click="openSVGInput(widget_i)">
        
      <input type="file" accept="image/svg" ref="fileInput" style="display: none;">
      <p v-if="!widget.content">+ Upload an Image</p>
      <div v-html="widget.content" v-else></div>

    </div>-->
    
    <div class="image-section" v-else-if="widget.type == 'image'">
      <svg-uploader v-model="widget.content" :ref="'svg_uploader_'"></svg-uploader>
    </div>

  </div>

  <!-- Add section button: -->
  <button id="add-section-button" v-if="editable"
    @click="addSection()">+ Add section</button>
</div>
</template>

<script>
// Widgets:
import sectionTitle from '@/components/content/widgets/section_title.vue';
import subsectionTitle from '@/components/content/widgets/subsection_title.vue';
import paragraph from '@/components/content/widgets/paragraph.vue';

export default {
  name: 'content-display',
  components: {
    sectionTitle,
    subsectionTitle,
    paragraph
  },

  props: {
    //
    value: {
      type: Array,
      default() {
        return [
          { "type": "section-title",  "content": "" },
          { "type": "subsection-title", "index": "1.1", "content": "" },
          { "type": "paragraph", "content": "" },
          { "type": "collection", "content": "" },
        ]
      }
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
    }  
  },

  computed: {

    data() {
      if (this.value) {
        return JSON.parse(JSON.stringify(this.value));
      } else {
        return [];
      }
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

      selected_widget: -1, // 
      editElement: -1, // This indicates the index of the element being edited
      

      // Storing data for different section types.
      // This is mostly just to save html space w/ a v-for
      widgetTypes: [
        {
          type: 'section-title',
          icon: '1.',
          bold: true,
          title: 'Section Title',
          description: 'Describes bigger sections.'
        },
        {
          type: 'subsection-title',
          icon: '1.1.',
          bold: true,
          title: 'Subsection Title',
          description: 'Segments ideas.'
        },
        {
          type: 'paragraph',
          icon: 'Aa',
          bold: true,
          title: 'Paragraph',
          description: 'For writing text.'
        },
        {
          type: 'image',
          icon: 'image-icon',
          bold: false,
          title: 'Image',
          description: 'Add an image!'
        },
        {
          type: 'collection',
          icon: 'col',
          bold: false,
          title: 'Collection',
          description: 'A collection of documents.'
        },
      ]
    }
  },


  methods: {
    // When the user clicks on a widget
    select_widget(index) {
      this.selected_widget = index;
      this.$emit('widgetselect', index);
    },


    update_data(field, new_val) {
      let data_update = JSON.parse(JSON.stringify(this.value));
      data_update[field] = new_val;
      this.$emit('input', data_update);
    },

    // Clicking on the gear icon:
    editSelect(i) {
      if (this.editElement == i) {
        this.editElement = -1;
      } else {
        this.editElement = i;
      }
    },

    // Selecting an element type (Changes that element's type, then closes the editor).
    selectElementType(type) {
      this.data[this.editElement].type = type;
      this.editElement = -1;
    },
    addSection() {
      this.data.push({
        type: 'paragraph',
        content: ''
      });
      this.editElement = this.data.length - 1;
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

<style lang="scss">
// Note that this style isn't scoped, since it needs to reach inside components?

// Content contains all the inputs:
.content {
  width: 100%;
  max-width: 600px;
  align-content:flex-start;
}


.floating-element-icons {
  transition-duration: .2s;
  margin-top: -1px;
  margin-right: -2px;
}
// The v-for generated widget containers
.widget-container {
  position: relative;
  transition-duration: .2s;
  margin-bottom: 5px;
  &.expanded-container {
    min-height: 200px;
  }
}
.widget-container.selected-widget::after {
  content: '';
  height: 3px;
  width: 3px;
  left: -50px;
  top: 10px;
  position: absolute;
  background: var(--c1);
}

// This is for the interface that pops up when you press the gear icon. 
.edit-element-interface {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  animation: fadein linear .2s;
  background: var(--card);
  z-index: 11;
  h5 {
    padding: 5px;
  }
}
@keyframes fadein {
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
}

// Styling for different element types:
#article-header input{
  margin-bottom: -10px;
  margin-top: 25px;
  font-weight: bold;
  font-size: var(--h1-font-size);
}
#article-subheader input {
  font-size: var(--regular-font-size);
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



// Section Type selector
.element-type-selector {
  width: 250px;
  overflow-y: scroll;
  height: 100%;
  border-right: solid 1px var(--card-text2);
  min-height: 100px;
}
// Each individual section type option, w/ icon:
.element-type-option {
  width: 100%;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  background: var(--card);
  cursor: pointer;
  .element-type-icon {
    width: 35px;
    height: 35px;
    border-radius: 5px;
    border: 1px solid var(--input-text2);
    background: var(--input);
    display: flex; 
    align-items: center;
    justify-content: space-around;
    svg {
      padding: 0px;
      fill: var(--input-text);
      width: var(--regular-font-size);
      height: var(--regular-font-size);
    }
  }
  .option-description {
    padding: 0px 10px;
    color: var(--card-text2);
    // Scooting the description closer to the label
    .bold {
      margin-bottom: -5px;
    }
  }

  &:hover {
    filter: brightness(130%);
    .option-description {
      color: var(--card-text);
    }
  }
  // For the currently selected element option:
  &.selected-element-type {
    filter: brightness(120%);
    color: var(--card-text);
    .option-description {
      color: var(--card-text);
    }
    .element-type-icon {
      border: 1px solid var(--input-text);
    }
  }
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