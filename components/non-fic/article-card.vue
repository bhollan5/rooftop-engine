<template>
<div class="article-card">

  <!-- The  header of the card. -->
  <router-link class="article-card-header" tag="div" router-link :to="'/non-fic/' + article._id + '/edit/'">
    <div class="article-card-title">{{article.articleTitle}}</div>
    <div class="byline">by <router-link to="/">Ben H</router-link></div>

    <!-- The thumbnail image. 
      It's inside the header because it's positioned relative to the bottom of the header. -->
    <div class="thumbnail" v-html="article.articleThumbnail"></div>

  </router-link>

  <!-- Article description. -->
  <div class="article-description">
    {{article.articleDescription}}
  </div>

  

  <!-- The action buttons on the bottom of the card. -->
  <div class="action-container">
    <router-link :to="'/non-fic/' + article._id + '/edit/'" tag="div" class="action-button">
      <edit-icon class="small-icon"></edit-icon>
      </router-link>
    <div class="action-button" @click="deleteArticle(article)">
      <trash-icon class="small-icon"></trash-icon>
    </div>
  </div>
  
</div>
</template>

<script>
import editIcon from '@/components/icons/edit-icon.vue';
import trashIcon from '@/components/icons/trash-icon.vue';


export default {
  data() {
    return {

    }
  }, 
  components: {
    editIcon,
    trashIcon
  },
  props: {
    article: Object
  },

  methods: {
    // Deleting an article
    deleteArticle(article) {
      if (confirm('Are you sure you want to delete "' + article.articleTitle + '"?')) {
        this.$store.dispatch("articles/deleteArticle", {
          _id: article._id
        })
      }
    },
  }
}
</script>

<style lang="scss">

.article-card {
  width: 275px;
  height: 150px;
  position: relative;
  background: var(--card);
  margin-right: 20px;
  box-shadow: 0px 0px 2px rgba(0,0,0,.5); // Set blur to 2 so we can animate it
  transition-duration: .5s;
  z-index: 2;

  .article-card-header {
    position: relative;
    padding: 5px 10px;
    background: var(--card2);
    cursor: pointer;
  }

  .article-card-title {
    font-size: var(--regular-font-size);
    color: var(--card-text);
    font-weight: bold;
  }
  .byline {
    color: var(--card-text2);
    // Styled in global.scss
  }
  .article-description {
    font-size: var(--small-font-size);
    padding: 5px 10px;
    width: calc(100% - 110px);
    line-spacing: 0px;
    line-height: 1;
    color: var(--card-text2);
  }

  // Thumbnail image
  .thumbnail {
    // Styled in global.scss
  }

  // The container for the edit and delete buttons in the article cards
  .action-container {
    display: flex;
    position: absolute;  
    left: 0px;
    bottom: 0px;  
    padding: 5px 10px;
    .action-button {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 10px;
      svg {
        display: none;
        height: var(--small-font-size);
        width: var(--small-font-size);
      }
    }
  }
}

.article-card:hover {
  transform: scale(1.1);
  // height: 200px;
  z-index: 3;
  box-shadow: 0px 0px 10px rgba(0,0,0,.5);
  .article-description {
    color:var(--card-text);
  }
  .action-button svg {
    display: block;
    fill: var(--card-text2);
    &:hover {
      fill: var(--card-text);
    }
  }
}
</style>