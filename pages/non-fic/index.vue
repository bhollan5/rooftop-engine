<template>
  <div class="container" scoped>

    <!-- The "non-fic promo" is the banner spread at the top of the landing page. -->
    <div id="non-fic-promo">

    </div>

    <!-- -->
    <div id="media-suggestions" 
      :style="{background: $store.state.bg}">

      <h3 class="collection-label">Rooftop Policy</h3>
      <hr class="collection-underline">
      <div class="collection">

        <article-card v-for="(article, article_i) in articles" :article="article" :key="'article-' + article_i">
        </article-card>

      </div>
    </div>

    <router-link tag="button" to="/non-fic/new/edit" id="new-article-button">
      + New Article
    </router-link>
    
  </div>
</template>

<script>
import placeholderSpread from '@/components/landing_spreads/placeholder_spread.vue';
import articleCard from '@/components/non-fic/article-card.vue';
import editIcon from '@/components/icons/edit-icon.vue';

export default {
  name: 'non-fic',
  components: {
    placeholderSpread,
    articleCard,

    editIcon,
  },
  data() {
    return {
      
    }
  },

  computed: {
    // Getting the article array from the store. 
    articles() { 
      return this.$store.getters['articles/allArticles'];
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

<style lang="scss">
#non-fic-promo {
  width: 100%;
  height: 20vh;
  background: var(--bg);
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

// .collection is also styled in global.scss.
.collection, .collection-label, .collection-underline {
  margin-left: 50px;
}
.collection-underline {
  width: 40%;
  min-width: 250px;
  margin-bottom: 10px;
}
</style>
