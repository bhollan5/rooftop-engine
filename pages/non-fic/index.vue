<template>
  <div class="container" scoped>

    <!-- The "non-fic promo" is the banner spread at the top of the landing page. -->
    <div id="non-fic-promo">
    </div>

    <!-- -->
    <div id="media-suggestions" 
      :style="{background: $store.state.bg}">

      <div class="collection-display">

        <div v-for="article in articles" class="article-card">
          <div class="article-card-title">{{article.articleTitle}}</div>
          <div class="article-byline">by <router-link to="/">Ben H</router-link></div>
          <router-link :to="'/non-fic/' + article._id + '/edit/'" tag="button" class="edit-button">Edit</router-link>
        </div>

      </div>
    </div>

    <router-link tag="button" to="/non-fic/new/edit" id="new-article-button">
      + New Article
    </router-link>
    
  </div>
</template>

<script>
import placeholderSpread from '@/components/landing_spreads/placeholder_spread.vue';

export default {
  name: 'non-fic',
  components: {
    placeholderSpread
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

  }
}
</script>

<style lang="scss">
#non-fic-promo {
  width: 100%;
  height: 60vh;
  background: #4E5264;
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

// .collection-display is also styled in global.scss.
.collection-display {
  margin-left: 50px;
}
.article-card {
  width: 275px;
  height: 125px;
  background: var(--bg2);
  margin: 0px 10px;
  padding: 10px;
  .article-card-title {
    font-size: var(--regular-font-size);
    font-weight: bold;
  }
  .article-byline {
    font-size: var(--small-font-size);
  }
  .edit-button {
    background: var(--bg2);
    color: var(--bg2-text2);
    border: solid 1px var(--bg2-text2);
    font-size: var(--small-font-size);
    &:hover {
      color: var(--bg2-text);
      border: solid 1px var(--bg2-text);
    }
  }
}
</style>
