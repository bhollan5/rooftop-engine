<!-- /nonfic/edit, where users can edit their nonfic articles! -->
<template>
<div class="body flex-container">

  <!-- The side bar, with the outline and stuff -->
  <div id="side-bar">
  
    <!-- The header of the side bar is colored differently. -->
    <div id="side-bar-header" >
      <!-- This flex container holds the title, id, and thumb. -->
      <div class="flex-container">

        <!-- Thumbnail/uploader -->
        <svg-uploader v-model="articleThumbnail" class="thumbnail" v-if="articleData.length"></svg-uploader>
        <div class="thumbnail" v-else></div>

        <!-- title and id: -->
        <div style="margin-top:10px;">
          <text-field nobox class="h3-input" v-if="articleData.length" 
            v-model="articleData[0].content" nounderline></text-field>
          <div v-else style="height: 45px;"></div>

          <div class="id-container">
            <h4 id="id-label" class="card-text2">id:</h4>
            <text-field v-model="articleId" nobox nounderline
              nopadding></text-field>
          </div>
        </div>

      </div>

      <div class="byline" v-if="articleData.length" >by <router-link to="/">Ben H</router-link></div>
      <div v-else style="height: 25px"></div>
  
      
      

    </div>

    <div id="side-bar-content" v-if="articleData.length">
      <!-- Article description. -->
      <text-field textarea nobox class="article-description" nounderline
        v-model="articleDescription">
      </text-field>

      <div class="tab-container">
        <h4>Tab:</h4><dropdown :options="articleData[2].tabs" property="name" v-if="0"></dropdown>
      </div>
      <hr>

    </div>
  </div>

  <!-- The content container, which holds the entire editor -->
  <div class="content">
    <div id="content-options">
      <button @click="editMode = false" v-if="editMode">Preview</button>
      <button @click="editMode = true" v-else>Edit <edit-icon class="small-icon"></edit-icon></button>

      <button @click="saveChanges()">Save</button>

    </div>

    <non-fic-loading v-if="!articleData.length"></non-fic-loading>
    <non-fic-input-editor :data="articleData" :articleId="articleId" v-else-if="editMode"></non-fic-input-editor>
    <non-fic-display :data="articleData" v-else></non-fic-display>
  </div>
  
</div>
</template>

<script>
// Inputs:
import textField from '@/components/inputs/text-field.vue';
import svgUploader from '@/components/inputs/svg-uploader.vue';
import dropdown from '@/components/inputs/dropdown.vue';

// Icons:
import gearIcon from '@/components/icons/gear-icon.vue';
import editIcon from '@/components/icons/edit-icon.vue';

// Display pages:
import nonFicInputEditor from '@/components/non-fic/non-fic-input-editor.vue';
import nonFicDisplay from '@/components/non-fic/non-fic-display.vue';
import nonFicLoading from '@/components/non-fic/non-fic-loading.vue';


// For our db calls
import axios from 'axios';

export default {
  name: 'article-editor',

  components: {

    textField,
    svgUploader,
    dropdown,

    gearIcon,
    editIcon,

    nonFicInputEditor,
    nonFicDisplay,
    nonFicLoading
  },

  data() {
    return {
      editMode: true,
      editElement: -1, // This indicates the index of the element being edited

      // The ID of the article we're on -- initially, the URL id.
      articleId: this.$route.params.articleId,
      articleDescription: 'Add a description here.',
      articleThumbnail: '',

      articleData: [],
      newArticleTemplate: [
        {
          type: 'header',
          content: '',
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
    } else {
      this.articleData = this.newArticleTemplate;
    }
  },

  methods: {

    loadDoc() {
      // Getting the article from the store, setting the current article to that article's data. 
      this.$store.dispatch("articles/readArticlesByQuery", [this.articleId]).then(() => {
        // This gets an array containing a single object: the result based on that idea.
        let articleList = this.$store.getters['articles/articleById'](this.articleId);

        // We need to do the json.parse thing to copy the article (since getters are immutable).
        let articleObj = JSON.parse(JSON.stringify(articleList)); 
        // The articleData object is local, and only updates the database when you save. 
        this.articleDescription = articleObj.articleDescription;
        this.articleThumbnail = articleObj.articleThumbnail;
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
          articleDescription: this.articleDescription,
          articleData: this.articleData,
          articleThumbnail: this.articleThumbnail
        })

      // Handling when the ID isn't the string "new".
      } else {
        
        this.$store.dispatch('articles/updateArticle', {
          _id: this.articleId,
          update: {
            articleData: this.articleData,
            articleTitle: this.articleData[0].content,
            articleDescription: this.articleDescription,
            articleThumbnail: this.articleThumbnail
          }
        })
        
      }
    }
  }
}
</script>

<style lang="scss">

$desktop-bp: 1000px;
$tablet-bp: 400px;

// The side bar with the table of contents:
#side-bar {
  grid-column: 1 / 2;
  background: var(--card);
  height: 100vh;
  width: 360px;
  position: sticky;
  box-shadow: 0px 0px 5px rgba(0,0,0,.5);

  @media only screen and (max-width: $desktop-bp) {
    display: none;
  }
  
  // The sidebar header has the title and article ID
  #side-bar-header {
    padding: 10px;
    background: var(--card2);
    position: relative;

    // Contains the article ID
    .id-container {
      display: flex;
      align-items: center;
      h4 {
        font-size: var(--small-font-size);
        width: 25px;
      }
      .text-field, .text-field input {
        font-size: var(--small-font-size);
        // padding: 2px;
      }
    }

    .thumbnail {
      width: 100px;
    }
  }
  
  #side-bar-content {
    padding: 10px 10px;
    .article-description {
      width: 100%;
      line-height: 1;
      color: var(--card-text2);
      height: 80px;
      textarea {
        font-size: var(--small-font-size);
        height: 100%;
      }
    }
    .tab-container {
      h4 {
        margin-right: 10px;
      }
      display: flex;
      align-items: center;
    }
  }
  
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


</style>
