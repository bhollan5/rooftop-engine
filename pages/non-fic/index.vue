<template>
  <div class="container" scoped>

    <!-- The "non-fic promo" is the banner spread at the top of the landing page. -->
    <div id="non-fic-banner">

    </div>

    <!-- Model coll (delete)
    <div id="collection-container" 
      :style="{background: $store.state.bg}">

      <h3 class="collection-label">Rooftop Policy</h3>
      <hr class="collection-underline">
      <div class="collection">

        <article-card v-for="(article, article_i) in articles" :article="article" :key="'article-' + article_i">
        </article-card>

      </div>
    </div>-->

    <collection v-for="(collection, collection_i) in collections"
      :collection="collection" :key="'collection' + collection_i" :articles="articles">
    </collection>

    

    <button @click="addCollection()" id="new-collection-button">
      + New Collection
    </button>
    <router-link tag="button" to="/non-fic/new/edit" id="new-article-button">
      + New Article
    </router-link>
    
  </div>
</template>

<script>
import placeholderSpread from '@/components/landing_spreads/placeholder_spread.vue';
import collection from '@/components/misc/collection.vue';

export default {
  name: 'non-fic',
  components: {
    placeholderSpread,
    collection,

  },
  data() {
    return {
      editCollection: -1, // Indicates which index of the collection we're editing
    }
  },

  computed: {
    // Getting arrays of collections, containing art from the store. 
    articles() { 
      return this.$store.getters['articles/allArticles'];
    },
    collections() { 
      return this.$store.getters['collections/allCollections'];
    }
  },

  mounted() {
    // When the page loads, we load in the articles. 
    this.getArticles();
    this.getCollections();
  },

  methods: {
    // Deploy this to refresh the articles. 
    getArticles() {
      this.$store.dispatch("articles/readArticles")
    },
    // And this refreshes the collections
    getCollections() {
      this.$store.dispatch("collections/readCollections")
    },

    // Deleting an article
    deleteArticle(article) {
      if (confirm('Are you sure you want to delete "' + article.articleTitle + '"?')) {
        this.$store.dispatch("articles/deleteArticle", {
          _id: article._id
        })
      }
    },

    // Adding a collection
    addCollection() {
      this.$store.dispatch("collections/createCollection")
    },

    editSelect(collection_i) {
      if (this.editCollection == collection_i) {
        this.editCollection = -1;
      } else {
        this.editCollection = collection_i
      }
    }

  }
}
</script>

<style lang="scss">
// The banner image
#non-fic-banner {
  width: 100%;
  height: 20vh;
  background: var(--bg);
}

// All collections
#collection-container {
  padding-top: 50px;
  width: 100%;
  box-shadow: var(--box-shading);
  color: var(--bg-text);
}

#new-article-button, #new-collection-button {
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
#new-collection-button {
  right: 150px;

}

</style>
