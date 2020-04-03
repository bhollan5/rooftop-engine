<!-- /nonfic/edit, where users can edit their nonfic articles! -->
<template>
<div class="body flex-container">
  projectid: {{project_id}}
  <br>
  {{project}}
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

      // The ID of the article we're on -- loaded from the URL id.
      project_id: this.$route.params.projectId,
      project: {},

      articleData: [],

    }
  },

  mounted() {
    // When the page loads, get the project
    this.loadProj();
  },

  methods: {

    loadProj() {
      // Getting the article from the store, setting the current article to that article's data. 
      this.$store.dispatch("projects/read_project", { _id: this.project_id }).then(() => {
        // This gets an array containing a single object: the result based on that idea.
        let articleList = this.$store.getters['projects/project_by_id'](this.project_id);

        // // We need to do the json.parse thing to copy the article (since getters are immutable).
        // let articleObj = JSON.parse(JSON.stringify(articleList)); 
        // // The articleData object is local, and only updates the database when you save. 
        // this.articleDescription = articleObj.articleDescription;
        // this.articleThumbnail = articleObj.articleThumbnail;
        // this.articleData = articleObj.articleData;

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
