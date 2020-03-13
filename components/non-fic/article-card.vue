<template>
<router-link :to="'/non-fic/' + article._id + '/edit/'" tag="div" class="article-card">

  <!-- The  header of the card. -->
  <div class="article-card-header">
    <div class="article-card-title">{{article.articleTitle}}</div>
    <div class="article-byline">by <router-link to="/">Ben H</router-link></div>

    <!-- The thumbnail image. 
      It's inside the header because it's positioned relative to the bottom of the header. -->
    <div class="thumbnail"></div>

  </div>

  <!-- Article description. -->
  <div class="article-description">
    A non-technical explanation of the design plans for...
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
  
</router-link>
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
  }
}
</script>

<style lang="scss">

.article-card {
  width: 275px;
  height: 150px;
  cursor: pointer;
  position: relative;
  background: var(--bg2);
  margin-right: 20px;
  box-shadow: 0px 0px 10px rgba(0,0,0,.5);

  .article-card-header {
    position: relative;
    padding: 5px 10px;
    background: var(--card2);
  }

  .article-card-title {
    font-size: var(--regular-font-size);
    font-weight: bold;
  }
  .article-byline {
    font-size: var(--small-font-size);
  }
  .article-description {
    font-size: var(--regular-font-size);
    padding: 5px 10px;
    width: calc(100% - 110px);
    line-spacing: 0px;
    line-height: 1;
    color: var(--card-text2);
  }

  // Thumbnail image
  .thumbnail {
    width: 100px;
    height: 100px;
    position: absolute;
    background: var(--bg);
    right: 10px;
    bottom: -85px;
  }

  // The container for the edit and delete buttons in the article cards
  .action-container {
    display: flex;
    position: absolute;  
    left: 0px;
    bottom: 0px;  
    padding: 5px 10px;
    .action-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 10px;
      svg {
        height: var(--small-font-size);
        width: var(--small-font-size);
        fill: var(--bg2-text2);
      }
      &:hover {
        svg {
          fill: var(--bg2-text);
        }
      }
    }
  }
}
</style>