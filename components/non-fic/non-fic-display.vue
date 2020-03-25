<template>
<div class="content">
  
      <!-- An element container is created for each node in our data. -->
      <div class="element-container" v-for="(dataEl, i) in data">

        <!-- Various element types: -->

        <!-- Article header: -->
        <h1 v-if="dataEl.type == 'header'" id="article-header">{{dataEl.content}}</h1>

        <!-- Article subheader: -->
        <h4 id="article-subheader" v-else-if="dataEl.type == 'subheader'">{{dataEl.content}}</h4>

        <!-- Tabs: -->
        <div class="tab-container" v-else-if="dataEl.type == 'tabs'">
          <div class="tabs" >
            <div class="tab" v-for="(tab, tabindex) in dataEl.tabs" 
              :class="{ 'bold': dataEl.selectedTab == tabindex}"
              @click="dataEl.selectedTab = tabindex">
              {{tab.name}}
            </div>
          </div>
          <non-fic-input-editor :data="dataEl.tabs[dataEl.selectedTab].content">
          </non-fic-input-editor>
        </div>

        <!-- Section titles: -->
        <h2 class="section-title" v-else-if="dataEl.type =='section-title'">
          {{dataEl.content}}
        </h2>

        <!-- Subsection title, with bullet:  -->
        <div class="subsection-title-container" v-else-if="dataEl.type =='subsection-title'">
          <p class="subsection-number">{{dataEl.num}}</p>
          <p class="subsection-title">{{dataEl.content}}</p>
        </div>
        
        <!-- Paragraphs: -->
        <div class="paragraph-section" v-else-if="dataEl.type == 'paragraph'">
          <p>{{dataEl.content}}</p>
        </div>

        <!-- Images: -->
        <div class="image-section" v-else-if="dataEl.type == 'image'">
          <div v-html="dataEl.content"></div>
        </div>

      </div>
</div>
</template>

<script>
import textField from '@/components/inputs/text-field.vue';
import gearIcon from '@/components/icons/gear-icon.vue';
import trashIcon from '@/components/icons/trash-icon.vue';


import nonFicInputEditor from '@/components/non-fic/non-fic-input-editor.vue';

export default {
  name: 'non-fic-input-editor',
  components: {
    textField,
    gearIcon,
    trashIcon,
    nonFicInputEditor,
  },

  props: {
    data: {
      type: Array,
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
    }
  },

}
</script>

<style lang="scss" scoped>
h1 {
  text-align: left;
}

// Content contains all the inputs:
.content {
  width: 100%;
  max-width: 600px;
  align-content:flex-start;
}

.subsection-title-container {
  font-weight: bold;
}

#article-header {
  margin-bottom: -10px;
}
#article-subheader {
  font-weight: normal;
}
.section-title {
  margin-bottom: 20px;
  font-size: var(--h2-font-size);
}
.subsection-title {
  margin-bottom: 10px;
}
.paragraph-section {
  margin-bottom: 10px;
  font-size: var(--regular-font-size);
}
.image-section {
  width: 100%;
  display: flex;
  min-height: 100px;
  cursor: default;
  &:hover {
    background: var(--bg);
  }
  svg {
    height: 100%;
    width: 100%;
  }
}

</style>