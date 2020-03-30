<template>
<router-link class="article-thumb" :to="'/non-fic/' + article._id + '/edit/'"
  tag="div">

  <!-- The  header of the card. -->
  <div class="article-header">
    <div class="article-title">{{article.articleTitle}}</div>

    <!-- The thumbnail image. 
      It's inside the header because it's positioned relative to the bottom of the header. -->
    <div class="thumbnail" v-html="article.articleThumbnail" ></div>

  </div>

  <div class="article-card">
    <div class="byline">by <router-link to="/">Ben H</router-link></div>
    <div class="article-description">
      {{article.articleDescription}}
    </div>
  </div>
  <!-- Article description. -->
  

  

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

.article-thumb {
  width: 250px;
  min-width: 250px;
  height: 154px;
  position: relative;
  background: var(--card2);
  margin-right: 20px;
  box-shadow: 0px 0px 10px rgba(0,0,0,.5); // Set blur to 2 so we can animate it
  transition-duration: .5s;
  z-index: 2;
  overflow: hidden;
  cursor: pointer;

  .article-header {
    position: relative;
    padding: 5px 10px;
    cursor: pointer;
    height: 100%;
    width: 100%;
  }
  // The little card peeking up
  .article-card {
    position: absolute;
    bottom: -145px;
    width: 100%;
    height: 150px;
    background: var(--card);
    font-size: var(--small-font-size);
    padding: 5px 10px;
    transition-duration: .5s;
  }
  &:hover .article-card {
    bottom: -65px;
  }

  // The article title 
  .article-title {
    position: absolute;
    bottom: 35px;
    z-index: 11;
    font-size: var(--regular-font-size);
    color: var(--card-text);
    font-weight: bold;
    transition-duration: .5s;
  }
  // Move the title up when we hover over the card
  &:hover .article-title {
    bottom: 120px;
  }


  .byline {
    position: absolute;
    background: var(--card);
    top: -25px;
    right: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    width: 100px;
    text-align: left;
    color: var(--card-text2);
    // Size styled in global.scss
  }
  .article-description {
    font-size: var(--small-font-size);
    line-spacing: 0px;
    line-height: 1;
    color: var(--card-text2);
  }

  // Thumbnail image
  .thumbnail {
    width: 200px;
    height: 120px;
    position: absolute;
    background: var(--card2);
    left: 0px;
    top: 0px;
    transition-duration: .5s;
  }
  &:hover .thumbnail {
    top: 25px;
    height: 50px;
    width: 100px;
    opacity: .5;
  }

  // The container for the edit and delete buttons in the article cards
  .action-container {
    display: flex;
    position: absolute;  
    left: 0px;
    bottom: -50px;  
    padding: 5px 10px;
    transition-duration: .5s;
    .action-button {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 10px;
      svg {
        fill: var(--card-text2);
        &:hover {
          fill: var(--card-text);
        }
        height: var(--small-font-size);
        width: var(--small-font-size);
      }
    }
  }
}

.article-thumb:hover {
  .article-description {
    color:var(--card-text);
  }
  .action-container {
    bottom: 0px;  
  }
}
</style>