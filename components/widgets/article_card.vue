<!--
  When a new article card widget is made, it lets the creator make a new article,
  or load an existing article into the page.

  Once the collection is loaded, it displays all files in that collection.
-->


<template>
<!-- When this widget is first created, we open the new collection options: -->
<card title="New article" v-if="this.value && this.value.id == 'new'" flex twocolumn>
  <!-- Create collection: -->
  <div class="card-section">
    <text-field title="Article name:" v-model="article_draft.title"></text-field>
    <text-field title="Article id:" v-model="article_draft.id"></text-field>
    <text-field title="Description:" v-model="article_draft.description"></text-field>
    <button class="action" @click="create_article()">+ Add</button>
  </div>
  <!-- Pick an existing collection: -->
  <div class="card-section">
    <button class="card-button" v-if="!view_all_articles" @click="load_articles()">
      Pick an existing article
    </button>
    <picker :options="owner_articles" title="Pick an article you own:" v-else
    @input="update_data('id', $event)">
    </picker>
        {{article_draft}}

  </div>
</card>

<router-link class="article-thumb" 
v-else-if="article && article._id"
:to="'/project/' + article.owner + '/article/' + article._id"
tag="div">

  <!-- The  header of the card. -->
  <div class="article-header">
    <div class="article-title">{{article.title}}</div>
    <div class="byline">by <router-link to="/">Ben H</router-link></div>

    <!-- The thumbnail image. 
      It's inside the header because it's positioned relative to the bottom of the header. -->
    <div class="thumbnail" v-html="article.thumbnail" ></div>

  </div>

  <div class="article-card">
    <div class="article-description">
      {{article.description}}
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
<div class="article-thumb loading" v-else>
loading...
</div>
</template>

<script>
import editIcon from '@/components/icons/edit-icon.vue';
import trashIcon from '@/components/icons/trash-icon.vue';


export default {
  data() {
    return {
      // Indicates if we've loaded in all possible article options
      view_all_articles: false,
      article_draft: {
        title: '',
        id: '',
        description: '',
      },
    }
  }, 
  components: {
    editIcon,
    trashIcon
  },

  props: {
    value: Object,
    owner: {
      type: String,
    }
  },

  computed: {
    article() {
      return this.$store.getters['articles/article_query']('_id', this.value.id)[0]
    },
    owner_articles() {
      let owner_articles = this.$store.getters['articles/article_query']('owner', this.owner);
      let formatted_options = [];
      owner_articles.forEach((article) => {
        formatted_options.push({ 
          icon: 'col', 
          title: article.title,
          value: article._id,
          description: article.description,
        })
      })
      return formatted_options;
    }
  },

  mounted() {
    if (this.value.id && this.value.id != 'new') {
      console.log("Calling... with : " + this.value.id)
      this.$store.dispatch('articles/read_articles', { _id: this.value.id })
    } else {
      this.update_data('id', 'new');
    }
  },

  methods: {
    // Called when the user clicks 'new article'
    create_article() {
      let new_article = {
        title: this.article_draft.title,
        id: this.article_draft.id,
        description: this.article_draft.description,
        owner: this.owner,
        data: [{
          type: 'header',
          content: this.article_draft.title,
        }, {
          type: 'subheader',
          content: this.article_draft.description,
        }],
      };

      if (!new_article.id || !new_article.title || !new_article.owner) {
        alert("Missing id, title, or owner")
        return;
      }
      console.log("Adding a new article")
      console.log(new_article)
      this.$store.dispatch("articles/create_article", new_article)
      .then(() => {
        // If this is in a collection, this tells it to add the article.
        this.$emit('addarticle', new_article.id);
        this.update_data('id', new_article.id);
      })
    },

    load_articles() {
      this.view_all_articles = true;
      this.$store.dispatch('articles/read_articles', {
        owner: this.owner
      });
    },

    // Deleting an article
    deleteArticle(article) {
      if (confirm('Are you sure you want to delete "' + article.articleTitle + '"?')) {
        this.$store.dispatch("articles/deleteArticle", {
          _id: article._id
        })
      }
    },

    update_data(field, new_val) {
      let data_update = JSON.parse(JSON.stringify(this.value));
      data_update[field] = new_val;
      this.$emit('input', data_update);
    },
  }
}
</script>

<style lang="scss">

.article-thumb {
  width: 250px;
  min-width: 250px;
  margin-bottom: 15px;
  height: 154px;
  position: relative;
  border-top: solid 8px var(--card);
  background: var(--card2);
  margin-right: 20px;
  box-shadow: 0px 0px 10px rgba(0,0,0,.5); // Set blur to 2 so we can animate it
  transition-duration: .5s;
  z-index: 2;
  overflow: hidden;
  cursor: pointer;

// todo: i want to make a little tab at the top of the files, but overflow:hidden :(
  &::after {
    content: '';
    display: none;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0px;
    background: var(--card);
  }

  .article-header {
    position: relative;
    z-index: 11;
    top: 20px;
    padding: 0px 10px;
    cursor: pointer;
    height: 100%;
    width: 100%;
  }
  // The little card peeking up
  .article-card {
    position: absolute;
    z-index: 11;
    top: 80px;
    opacity: 0;
    width: 100%;
    height: 150px;
    font-size: var(--small-font-size);
    padding: 0px 10px;
    transition-duration: .5s;
  }
  &:hover .article-card {
    top: 70px;
    opacity: 1;
  }

  // The article title 
  .article-title {
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
    z-index: 11;
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
    right: 0px;
    bottom: 0px;
    transition-duration: .5s;
  }
  &:hover .thumbnail {
    bottom: 20px;
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