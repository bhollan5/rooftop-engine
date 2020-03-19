<template>
  <div class="container" scoped>

    <!-- The "non-fic promo" is the banner spread at the top of the landing page. -->
    <div id="non-fic-banner">
      <non-fic-header></non-fic-header>
      <p>Our non-fiction articles focus on <span class="highlight">communicating clearly</span>!</p>
      <p>
        If you disagree with something written in one of these articles, click on it to open
        <span class="highlight">Clarity</span>, our feedback system. 
      </p>
    </div>

    <!-- List of collections -->
    <collection v-for="(collection, collection_i) in collections"
      :collection="collection" :key="'collection' + collection_i" >
    </collection>
      <br><br><hr>
    <collection :collection="collectionOfAllArticles">
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
import nonFicHeader from '@/components/non-fic/non-fic-header.vue';

export default {
  name: 'non-fic',
  components: {
    placeholderSpread,

    nonFicHeader,
  },
  data() {
    return {
      editCollection: -1, // Indicates which index of the collection we're editing
    }
  },

  computed: {
    // Getting arrays of collections, containing art from the store. 
    collections() { 
      return this.$store.getters['collections/allCollections'];
    },
    collectionOfAllArticles() {
      return this.$store.getters['collections/collectionOfAllArticles']
    }
  },

  mounted() {
    // When the page loads, we load in the articles. 

    // Uncomment this to make sure you're loading in all the articles in the bottom collection
    // this.getArticles(); 
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
  color: var(--bg-text);
  transform-style: preserve3d;
  perspective: 300px;
  text-align: center;
  p {
    font-size: var(--small-font-size);
  }
  svg {
    margin-top: 40px;
    margin-bottom: 20px;
    width: 350px;
  }
}

#new-article-button, #new-collection-button {
  z-index: 5;
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
