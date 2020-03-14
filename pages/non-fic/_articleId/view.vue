<template>
  <div class="page-content flex-container">

    <div id="side-bar">
      <h3 v-if="articleData[0].content">
        {{articleData[0].content}}
      </h3>
      <h3 v-else class="card-text2">
        Article Title
      </h3>

      <div class="id-container">
        <h4 id="id-label" class="card-text2">Article ID: {{articleId}}</h4>
      </div>

      <br>
      <h4>Tab:</h4>
      <hr>
    </div>

    <!-- The content container, which holds the entire editor -->
    <div id="content">
      <non-fic-display :data="articleData"></non-fic-display>
    </div>
    
  </div>
</template>

<script>
// Inputs:
import textField from '@/components/inputs/text-field.vue';

// Icons:
import gearIcon from '@/components/icons/gear-icon.vue';
import editIcon from '@/components/icons/edit-icon.vue';

// Display pages:
import nonFicInputEditor from '@/components/non-fic/non-fic-input-editor.vue';
import nonFicDisplay from '@/components/non-fic/non-fic-display.vue';

// For our db calls
import axios from 'axios';


export default {
  name: 'article-viewer',

  components: {

    textField,

    gearIcon,
    editIcon,

    nonFicInputEditor,
    nonFicDisplay
  },

  data() {
    return {
      editElement: -1, // This indicates the index of the element being edited

      // The ID of the article we're on -- initially, the URL id.
      articleId: this.$route.params.articleId,

      articleData: [
        {
          type: 'header',
          content: 'My Article Title',
        },
        {
          type: 'subheader',
          content: 'This is a subheader, too!',
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

  mounted() {
    // When the page loads, get the articles, then load them in. 
    if (this.articleId != 'new') {
      this.loadDoc();
    }
  },

  methods: {

    loadDoc() {
      // Getting the article from the store, setting the current article to that article's data. 
      this.$store.dispatch("articles/readArticles").then(() => {

        // This gets an array containing a single object: the result based on that idea.
        let articleList = this.$store.getters['articles/articleById'](this.articleId);
        // We need to do the json.parse thing to copy the article (since getters are immutable).
        let articleObj = JSON.parse(JSON.stringify(articleList[0])); 
        // The articleData object is local, and only updates the database when you save. 
        this.articleData = articleObj.articleData;

      })

    },

    // Saving the doc
    saveChanges() {

      // Note that we don't need to use 'var vm = this' or anything for Axios callbacks. 

      // If it's a new article, we need to make a new doc. 
      if (this.articleId == 'new'){

        this.$store.dispatch('articles/createArticle', {
          articleTitle: this.articleData[0].content,
          articleData: this.articleData
        })

      // Handling when the ID isn't the string "new".
      } else {
        
        this.$store.dispatch('articles/updateArticle', {
          _id: this.articleId,
          update: {
            articleData: this.articleData,
            articleTitle: this.articleData[0].content
          }
        })
        
      }
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
  .card-text2 {
    color: var(--card-text2);
  }
}

#content-options {
  text-align: right;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  button {
    font-size: var(--small-font-size);
    padding: 2px 15px;
    margin-left: 10px;
    svg {
      width: var(--small-font-size);
      height: var(--small-font-size);
    }
  }
}

#content {
  width: 100%;
  max-width: 600px;
  align-content:flex-start;
}

.id-container {
  display: flex;
  align-items: center;
  h4 {
    font-size: var(--small-font-size);
    width: 70px;
  }
  .text-field, .text-field input {
    font-size: var(--small-font-size);
    padding: 2px;
  }
}
</style>
