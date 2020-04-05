<!-- /nonfic/edit, where users can edit their nonfic articles! -->
<template>
<div class="body flex-container">

  <side-bar v-if="this.$auth.loggedIn && this.project 
  && this.$auth.user.username == this.project.owner">

    <card title="My card:">
      <p>Card content here</p>
    </card>

  </side-bar>

  <div class="content" v-if="project">
    <br><br>
    <h1>{{project.title}}</h1>
    <p>{{project.description}}</p>
    <p class="byline">Owned by @{{project.owner}}</p>
    <br>
    
  </div>
  <div id="project-page-loading" v-else>
  
  </div>
</div>
</template>

<script>


// For our db calls
import axios from 'axios';

export default {
  name: 'project-page',

  components: {

  },

  computed: {
    project() {
      return this.$store.getters['projects/project_by_id'](this.project_id);
    }
  },

  data() {
    return {
      // The ID of the article we're on -- loaded from the URL id.
      project_id: this.$route.params.projectId,

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


</style>
