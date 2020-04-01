<template>
<div class="content">
  
      <!-- An input container is created for each node in our data. -->
      <div class="input-container" v-for="(dataEl, dataEl_i) in data"
        :class="{'expanded-container': editElement == dataEl_i}">

          <!-- No gear icon for article headers or subheaders. -->
          <!-- TODO: Add options for tabs -->
        <div class="floating-element-icons" @click="editSelect(dataEl_i)"
          v-if="dataEl.type != 'header' && dataEl.type != 'subheader' && dataEl.type != 'tabs'" 
          :class="{'floating-icons-selected': editElement == dataEl_i}">
          <gear-icon></gear-icon>
        </div>

        <!-- Popup shown when the gear button is clicked: -->
        <div class="edit-element-interface" v-if="editElement == dataEl_i">

          <!-- Input type selector: -->
          <div class="element-type-selector">
            <h5>Section type:</h5>
            <!-- v-for list of the section type options: -->
            <div class="element-type-option" v-for="sectionType in sectionTypes"
              :class="{'selected-element-type': 
                data[editElement].type == sectionType.type}"
              @click="selectElementType(sectionType.type)">
              <div class="element-type-icon"
              :class="{bold: sectionType.bold}">
                <image-icon v-if="sectionType.type == 'image'"></image-icon>
                <span v-else>{{sectionType.icon}}</span>
              </div>
              <div class="option-description">
                <p class="bold">{{sectionType.title}}</p>
                <p class="small-font">{{sectionType.description}}</p>
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
          v-if="dataEl.type == 'header'"
          v-model="dataEl.content" 
          :nobox="noboxes"
          placeholder="Article Title" 
          nounderline></text-field>

        <!-- Article subheader: -->
        <text-field id="article-subheader" 
          v-else-if="dataEl.type == 'subheader'"
          v-model="dataEl.content" 
          :nobox="noboxes" 
          nounderline
          placeholder="Article Subheader (optional)"></text-field>

        <!-- Tabs: -->
        <div class="tab-container" v-else-if="dataEl.type == 'tabs'">
          <div class="tabs" >
            <text-field class="tab" 
              v-for="(tab, tabindex) in dataEl.tabs" 
              :class="{ 'bold': dataEl.selectedTab == tabindex}" 
              nobox 
              @click="dataEl.selectedTab = tabindex" 
              v-model="tab.name" 
              :key="'tab-' + tabindex">
            </text-field>
            <div class="tab add-tab" @click="addTab(dataEl)">+ Add Tab</div>
          </div>
          <non-fic-input-editor :data="dataEl.tabs[dataEl.selectedTab].content" 
            :articleId="articleId + '_' + dataEl.selectedTab">
          </non-fic-input-editor>
        </div>

        <!-- Section titles: -->
        <div class="section-title" v-else-if="dataEl.type =='section-title'">
          <text-field v-model="dataEl.content" 
            :nobox="noboxes"
            nounderline
            placeholder="1. Section Title">
          </text-field>
        </div>

        <!-- Subsection title, with bullet:  -->
        <div class="subsection-title-container" v-else-if="dataEl.type =='subsection-title'">
          <text-field class="subsection-number" 
            placeholder="1.1" 
            nounderline
            v-model="dataEl.num" 
            :nobox="noboxes"></text-field>
          <text-field class="subsection-title" 
            placeholder="Subsection Header"
            v-model="dataEl.content" 
            :nobox="noboxes"
            nounderline></text-field>
        </div>
        
        <!-- Paragraphs: -->
        <div class="paragraph-section" v-else-if="dataEl.type == 'paragraph'">
          <text-field placeholder="Regular paragraphs go here!" 
            textarea 
            nounderline
            v-model="dataEl.content" 
            :nobox="noboxes"></text-field>
        </div>

        <!-- Images: -->
        <!--
        <div class="image-section" v-else-if="dataEl.type == 'image'" @change="uploadFile($event, dataEl_i)" enctype="multipart/form-data"
              @click="openSVGInput(dataEl_i)">
            
          <input type="file" accept="image/svg" ref="fileInput" style="display: none;">
          <p v-if="!dataEl.content">+ Upload an Image</p>
          <div v-html="dataEl.content" v-else></div>

        </div>-->
        <div class="image-section" v-else-if="dataEl.type == 'image'">
          <svg-uploader v-model="dataEl.content" :ref="articleId + 'svg_uploader_' + dataEl_i"></svg-uploader>
        </div>

      </div>

      <!-- Add section button: -->
      <button id="add-section-button" v-if="!isParent"
        @click="addSection()">+ Add section</button>
</div>
</template>

<script>
import textField from '@/components/inputs/text-field.vue';
import gearIcon from '@/components/icons/gear-icon.vue';
import trashIcon from '@/components/icons/trash-icon.vue';
import imageIcon from '@/components/icons/image-icon.vue';


import nonFicInputEditor from '@/components/non-fic/non-fic-input-editor.vue';

export default {
  name: 'non-fic-input-editor',
  components: {
    textField,
    gearIcon,
    trashIcon,
    imageIcon,

    nonFicInputEditor
  },

  props: {
    data: {
      type: Array,
    },
    articleId: {
      type: String
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
      

      // Storing data for different section types.
      // This is mostly just to save html space w/ a v-for
      sectionTypes: [
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
  margin-bottom: 0px;

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
  margin-top: 20px;
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

.paragraph-section input, .paragraph-section textarea {
  font-size: var(--regular-font-size);
  margin-bottom: 10px;
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