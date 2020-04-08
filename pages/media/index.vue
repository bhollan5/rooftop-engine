<template>
  <div class="body" id="media">

    <h2>Media </h2>
    <h3 class="color-bg-text2 centered">This page is still under construction.</h3>

    <router-link tag="button" to="/non-fic/new/edit" id="new-article-button">
      + New Article
    </router-link>
    
  </div>
</template>

<script>

// Icons: 


export default {
  name: 'non-fic',
  components: {

  },
  data() {
    return {
      
    }
  },

  computed: {
    // Getting the article array from the store. 
    articles() { 
      return this.$store.getters['articles/all_articles'];
    }
  },

  mounted() {
    // When the page loads, we load in the articles. 
    this.getArticles();
  },

  methods: {
    // Deploy this to refresh the articles. 
    getArticles() {
      this.$store.dispatch("articles/readArticles")
    },

    //
    deleteArticle(article) {
      if (confirm('Are you sure you want to delete "' + article.articleTitle + '"?')) {
        this.$store.dispatch("articles/deleteArticle", {
          _id: article._id
        })
      }
    }

  }
}
</script>

<style lang="scss" >
#media {
  padding-top: 100px;
  padding-left: 10%;
}

#media-suggestions {
  padding-top: 50px;
  width: 100%;
  min-height: 500px;
  box-shadow: var(--box-shading);
  color: var(--bg-text);
}

#new-article-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: solid 2px var(--c1);
  color: var(--c1);
  font-size: var(--small-font-size);
  padding: 5px 15px;
  &:hover {
    color: var(--c1-light);
    border: solid 2px var(--c1-light);
  }
}

</style>
