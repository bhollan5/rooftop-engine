<template>
<div class="article-card">
  <div class="article-card-title">{{article.articleTitle}}</div>
  <div class="article-byline">by <router-link to="/">Ben H</router-link></div>

  <div class=""

  <div class="action-container">
    <router-link :to="'/non-fic/' + article._id + '/edit/'" tag="button" class="action-button">
      Edit<edit-icon class="small-icon"></edit-icon>
      </router-link>
    <button class="action-button" @click="deleteArticle(article)">Delete</button>
  </div>
</div>
</template>

<script>
import editIcon from '@/components/icons/edit-icon.vue';

export default {
  data() {
    return {

    }
  }, 
  components: {
    editIcon
  },
  props: {
    article: Object
  }
}
</script>