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
      <div id="content-options">
        <button @click="editMode = false" v-if="editMode">Preview</button>
        <button @click="editMode = true" v-else>Edit</button>

      </div>
      <non-fic-input-editor :data="articleData" v-if="editMode"></non-fic-input-editor>
      <non-fic-display :data="articleData" v-else></non-fic-display>
    </div>
    
  </div>
</template>

<script>
import textField from '@/components/inputs/text-field.vue';
import gearIcon from '@/components/icons/gear-icon.vue';

import nonFicInputEditor from '@/components/non-fic/non-fic-input-editor.vue';
import nonFicDisplay from '@/components/non-fic/non-fic-display.vue';


export default {
  components: {
    textField,
    gearIcon,
    nonFicInputEditor,
    nonFicDisplay
  },
  data() {
    return {
      editMode: false,
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
          selectedTab: 0,
          tabs: [
            {
              name: 'Main Paper',
              content: [
                {
                  type: 'section-title',
                  content: '',
                },
                {
                  type: 'subsection-title',
                  index: '1.1',
                  content: ''
                },
                {
                  type: 'paragraph',
                  content: ''
                },
              ]
            },
            {
              name: 'Definitions',
              content: [
                {
                  type: 'paragraph',
                  content: 'def',
                },
                {
                  type: 'subsection-title',
                  content: ''
                },
                {
                  type: 'paragraph',
                  content: ''
                },
              ]
            }
          ]
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

#content-options {
  text-align: right;
  button {
    font-size: var(--small-font-size);
    padding: 2px 15px;
  }
}

#content {
  width: 100%;
  max-width: 600px;
  align-content:flex-start;
}
</style>
