<template>
<div class="input-container"
  :class="{'expanded-container': widget.type == 'edit'}">

  
  <div class="floating-element-icons" @click="editSelect()"
  v-if="editable"
  :class="{'floating-icons-selected': widget.type == 'edit'}">
    <gear-icon></gear-icon>
  </div>


  <!-- Popup shown when the gear button is clicked: -->
  <div class="edit-element-interface" v-if="widget.type == 'edit'">

    <!-- Input type selector: -->
    <div class="element-type-selector">
      <h5>widget type:</h5>
      <!-- v-for list of the widget type options: -->
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

  <!-- Section titles: -->
  <div class="section-title" v-else-if="widget.type =='section-title'">
    <text-field v-model="widget.content" 
      :nobox="noboxes"
      nounderline
      placeholder="1. Section Title">
    </text-field>
  </div>

  <!-- Subsection title, with bullet:  -->
  <div class="subsection-title-container" v-else-if="widget.type =='subsection-title'">
    <text-field class="subsection-number" 
      placeholder="1.1" 
      nounderline
      v-model="widget.num" 
      :nobox="noboxes"></text-field>
    <text-field class="subsection-title" 
      placeholder="Subsection Header"
      v-model="widget.content" 
      :nobox="noboxes"
      nounderline></text-field>
  </div>
  
  <!-- Paragraphs: -->
  <paragraph v-else-if="widget.type == 'paragraph'" 
  v-model="widget" :editable="editable"></paragraph>

  <!-- Images: -->
  <!--
  <div class="image-widget" v-else-if="widget.type == 'image'" @change="uploadFile($event, widget_i)" enctype="multipart/form-data"
        @click="openSVGInput(widget_i)">
      
    <input type="file" accept="image/svg" ref="fileInput" style="display: none;">
    <p v-if="!widget.content">+ Upload an Image</p>
    <div v-html="widget.content" v-else></div>

  </div>-->
  
  <div class="image-widget" v-else-if="widget.type == 'image'">
    <svg-uploader v-model="widget.content" :ref="articleId + 'svg_uploader'"></svg-uploader>
  </div>

</div>
</template>

<script>
import paragraph from '@/components/widgets/paragraph.vue';
import gearIcon from '@/components/icons/gear-icon.vue';
import trashIcon from '@/components/icons/trash-icon.vue';
import imageIcon from '@/components/icons/image-icon.vue';


import nonFicInputEditor from '@/components/non-fic/non-fic-input-editor.vue';

export default {
  name: 'non-fic-input-editor',
  components: {
    paragraph,
    gearIcon,
    trashIcon,
    imageIcon,

    nonFicInputEditor
  },

  props: {
    // Widget object
    widget: {
      type: Object,
      default() {
        return {
          // Options: 'p'
          type: 'paragraph', 
          content: 'hi!'
        }
      }
    },
    // Is it editable?
    editable: {
      type: Boolean,
      default: false
    },
    // Toggles visual boxes around inputs
    noboxes: {
      type: Boolean,
      default: true
    }  
  },

  data() {
    return {
      editElement: -1, // This indicates the index of the element being edited
      

      // Storing data for different widget types.
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
      ]
    }
  },

  computed: {
    // We don't display the "add widget" button if this page is a parent,
    // because the add widget button will go in the child element:
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

    // Adds a tab widget
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


// v-for generated
.input-container {
  position: relative;
  transition-duration: .5s;
  &.expanded-container {
    min-height: 200px;
  }
  input:hover, input:active, textarea:hover, textarea:active {
    // background: var(--input); // todo: I want to uncomment this but the padding/margins would need changed
  }
}

// This is for the interface that pops up when you press the gear icon. 
.edit-element-interface {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background: var(--card);
  z-index: 2;
  h5 {
    padding: 5px;
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


.section-title {
  input {
    font-weight: bold;
    text-align: center;
    font-size: var(--h2-font-size);
  }
}

// TODO: The subsection should be closer to the paragraphs.
.subsection-title-container {
  display: flex;
  width: 100%;
  justify-content: space-between;

  .subsection-number {
    width: 50px;
    margin: 0px;
  }
  .subsection-title {
    margin: 0px;
    width: calc(100% - 70px);
  }
  input {
    font-weight: bold;
    font-size: var(--regular-font-size);
  }
}

.paragraph-widget input, .paragraph-widget textarea {
  font-size: var(--regular-font-size);
  margin-bottom: 10px;
}

// widget Type selector
.element-type-selector {
  width: 250px;
  overflow-y: scroll;
  height: 100%;
  border-right: solid 1px var(--card-text2);
  min-height: 100px;
}
// Each individual widget type option, w/ icon:
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

// For widgets containing images:
.image-widget {
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

// Add widget button:
#add-widget-button {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
}

input:active, input:hover {
  background: var(--input);
}
</style>