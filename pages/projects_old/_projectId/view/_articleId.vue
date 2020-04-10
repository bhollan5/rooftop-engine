<!-- /nonfic/edit, where users can edit their nonfic articles! -->
<template>
<div class="body flex-container">

  <side-bar v-if="this.$auth.loggedIn && this.article">

    <card title="Article controls:">
      <checkbox title="editable?" v-model="edit_mode"></checkbox>
      <button @click="save()">Save!</button>
    </card>

    <card title="Edit widget fields:" v-if="article_draft.data && article_draft.data[selected_widget]">
      <text-field v-for="(value, field) in article_draft.data[selected_widget]" :key="field"
      v-if="typeof(value) == 'string'"
      :title="field + ':'" v-model="article_draft.data[selected_widget][field]">
      </text-field>
    </card>

  </side-bar>

  <page-content v-model="article_draft.data" v-if="article_draft.id" 
  :editable="edit_mode" @widgetselect="selected_widget = $event"
  :owner="project_id">
  </page-content>
  <article-loading v-else>
  </article-loading>
    
  <div id="article-loading" v-else>
  
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import articleLoading from '~/components/non-fic/non-fic-loading.vue';
import pageContent from '~/components/content/content.vue';

// For our db calls
import axios from 'axios';

export default {
  name: 'project-page',

  components: {
    pageContent,
    articleLoading,
  },

  computed: {
    article() {
      return this.$store.getters['articles/article_query']('_id', this.article_id)[0];
    },
  },

  data() {
    return {
      // The ID of the article we're on -- loaded from the URL id.
      article_id: this.$route.params.articleId,
      project_id: this.$route.params.projectId,

      edit_mode: true,


      article_draft: {},
      
      //
      selected_widget: -1,

    }
  },

  mounted() {
    // When the page loads, get the article
    this.load_article();
  },

  methods: {

    load_article() {
      // Getting the article from the store, setting the current article to that article's data. 
      this.$store.dispatch("articles/read_article", { _id: this.article_id }).then(() => {
        let article_copy = JSON.parse(JSON.stringify(this.article));
        Vue.set(this.article_draft, 'title', article_copy.title);
        Vue.set(this.article_draft, 'description', article_copy.description);
        Vue.set(this.article_draft, 'data', article_copy.data);
        Vue.set(this.article_draft, 'id', article_copy._id);
      })

    },

    // Saving the doc
    save() {
      let update = {
        data: this.article_draft.data,
        title: this.article_draft.title,
        description: this.article_draft.description,
        thumbnail: this.article_draft.thumbnail
      };
      console.log(update)
      this.$store.dispatch('articles/update_article', {
        _id: this.article_id,
        update: update,
      })   
    }

  }
}
</script>

<style lang="scss">

$desktop-bp: 1000px;
$tablet-bp: 400px;


</style>
