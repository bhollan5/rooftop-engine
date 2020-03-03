<template>
  <div class="page-content flex-container">

    <div id="side-bar">
      <h3 v-if="articleData[0].content">
        {{articleData[0].content}}
      </h3>
      <h3 v-else class="bg2-text2">
        Article Title
      </h3>
      <br>
      <h4>Tab:</h4>
      <hr>
    </div>

    <!-- The content container, which holds the entire editor -->
    <div id="content">

      <!-- An input container is created for each node in our data. -->
      <div class="input-container" v-for="(data, i) in articleData"
        :class="{'expanded-container': editElement == i}">

          <!-- No gear icon for article headers or subheaders. -->
        <div class="gear-icon" @click="editSelect(i)"
          v-if="data.type != 'header' && data.type != 'subheader'"
          :class="{'gear-icon-selected': editElement == i}">
          <gear-icon></gear-icon>
        </div>

        <!-- Popup shown when the gear button is clicked: -->
        <div class="edit-element-interface" v-if="editElement == i">

          <!-- Input type selector: -->
          <div class="element-type-selector">
            <h5>Section type:</h5>
            <!-- v-for list of the section type options: -->
            <div class="element-type-option" v-for="sectionType in sectionTypes"
              :class="{'selected-element-type': 
                articleData[editElement].type == sectionType.type}"
              @click="selectElementType(sectionType.type)">
              <div class="element-type-icon"
              :class="{bold: sectionType.bold}">
                {{sectionType.icon}}
              </div>
              <div class="option-description">
                <p class="bold">{{sectionType.title}}</p>
                <p class="small-font">{{sectionType.description}}</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Various input types: -->

        <!-- Article header: -->
        <text-field id="article-header" v-if="data.type == 'header'"
          v-model="data.content"
          placeholder="Article Title"></text-field>

        <!-- Article subheader: -->
        <text-field id="article-subheader" v-else-if="data.type == 'subheader'"
          placeholder="Article Subheader (optional)"></text-field>

        <!-- Tabs: -->
        <div id="tabs" v-else-if="data.type == 'tabs'">
          <div class="tab">Main Paper</div>
          <div class="tab">Definitions</div>
          <div class="tab add-tab">+ Add Tab</div>
        </div>

        <!-- Section titles: -->
        <text-field class="section-title" v-else-if="data.type =='section-title'"
          placeholder="1. Section Title">
        </text-field>

        <!-- Subsection title, with bullet:  -->
        <div class="subsection-title-container" v-else-if="data.type =='subsection-title'">
          <text-field class="subsection-number" placeholder="1.1"></text-field>
          <text-field class="subsection-title" placeholder="Subsection Header"></text-field>
        </div>
        
        <!-- Paragraphs: -->
        <div class="paragraph-section" v-else-if="data.type == 'paragraph'">
          <text-field placeholder="Regular paragraphs go here!" textarea></text-field>
        </div>

      </div>

      <!-- Add section button: -->
      <button id="add-section-button"
        @click="addSection()">+ Add section</button>

    </div>
    
  </div>
</template>

<script>
import textField from '@/components/inputs/text-field.vue';
import gearIcon from '@/components/icons/gear-icon.vue';

export default {
  components: {
    textField,
    gearIcon
  },
  data() {
    return {
      editElement: -1, // This indicates the index of the element being edited
      articleData: [
        {
          type: 'header',
          content: 'hey',
        },
        {
          type: 'subheader',
          content: '',
        },
        {
          type: 'tabs',
          content: '',
        },
        {
          type: 'section-title',
          content: '',
        },
        {
          type: 'subsection-title',
          content: ''
        },
        {
          type: 'paragraph',
          content: ''
        },
      ],

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
      ]
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
      this.articleData[this.editElement].type = type;
      this.editElement = -1;
    },
    addSection() {
      this.articleData.push({
        type: 'paragraph',
        content: ''
      });
      this.editElement = this.articleData.length - 1;
    }
  }
}
</script>

<style lang="scss">

// The side bar with the table of contents:
#side-bar {
  width: 25%;
  background: var(--bg2);
  height: 400px;
  padding: 15px;
  .bg2-text2 {
    color: var(--bg2-text2);
  }
}

// Content contains all the inputs:
#content {
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
}

.gear-icon {
  position: absolute;
  height: 30px;
  width: 35px;
  left: -33px;
  padding: 5px;
  border-radius: 5px 0px 0px 5px;
  top: 0px;
  fill: var(--bg2);
  &.gear-icon-selected {
    background: var(--bg2);
    fill: var(--bg2-text);
  }
  cursor: pointer;
  &:hover {
    fill: var(--bg2-text);
  }
}

// This is for the interface that pops up when you press the gear icon. 
.edit-element-interface {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--bg2);
  z-index: 2;
}

// Styling for different element types:
#article-header input{
  font-weight: bold;
  font-size: var(--h1-font-size);
}

#tabs {
  display: flex;
  margin-top: 50px;
  margin-bottom: 40px;
  border-bottom: solid 2px var(--bg-text2);

  .tab {
    font-size: var(--small-font-size);
    min-width: 100px;
    text-align: center;
    padding: 5px;
    cursor: pointer;
  }
  .add-tab {
    color: var(--bg-text2);
    &:hover {
      color: var(--bg-text);
    }
  }
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
  }
}

.paragraph-section {

}

// Section Type selector
.element-type-selector {
  width: 250px;
  overflow-y: scroll;
  height: 100%;
  border-right: solid 1px var(--bg2-text2);
  min-height: 100px;
  h5 {
    padding: 5px;
  }
}
// Each individual section type option, w/ icon:
.element-type-option {
  width: 100%;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  background: var(--bg2);
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
  }
  .option-description {
    padding: 0px 10px;
    color: var(--bg2-text2);
    // Scooting the description closer to the label
    .bold {
      margin-bottom: -5px;
    }
  }

  &:hover {
    filter: brightness(130%);
    .option-description {
      color: var(--bg2-text);
    }
  }
  // For the currently selected element option:
  &.selected-element-type {
    filter: brightness(120%);
    color: var(--bg2-text);
    .option-description {
      color: var(--bg2-text);
    }
    .element-type-icon {
      border: 1px solid var(--input-text);
    }
  }
}

// Add section button:
#add-section-button {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
}
</style>
