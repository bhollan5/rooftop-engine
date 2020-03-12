<template>
<router-link :to="'/non-fic/' + article._id + '/edit/'" tag="div" class="article-card">
  <div class="article-card-title">{{article.articleTitle}}</div>
  <div class="article-byline">by <router-link to="/">Ben H</router-link></div>

  <div class="article-description">
    &nbsp;
  </div>

  <div class="action-container">
    <router-link :to="'/non-fic/' + article._id + '/edit/'" tag="button" class="action-button">
      Edit<edit-icon class="small-icon"></edit-icon>
      </router-link>
    <button class="action-button" @click="deleteArticle(article)">
      Delete<trash-icon class="small-icon"></trash-icon>
    </button>
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
  height: 125px;
  cursor: pointer;
  background: var(--bg2);
  margin-right: 20px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0,0,0,.5);
  .article-card-title {
    font-size: var(--regular-font-size);
    font-weight: bold;
  }
  .article-byline {
    font-size: var(--small-font-size);
  }
  .article-description {

  }

  // The container for the edit and delete buttons in the article cards
  .action-container {
    display: flex;
    margin-top: 10px;
    .action-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bg2);
      color: var(--bg2-text2);
      border: solid 1px var(--bg2-text2);
      font-size: var(--small-font-size);
      margin-right: 10px;
      svg {
        fill: var(--bg2-text2);
      }
      &:hover {
        color: var(--bg2-text);
        border: solid 1px var(--bg2-text);
        svg {
          fill: var(--bg2-text);
        }
      }
    }
  }

}
</style>