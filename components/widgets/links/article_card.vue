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
    <button v-if="!view_all_articles" 
      class="card-button" 
      @click="load_articles()"
    >
      Pick an existing article
    </button>
    <picker v-else
      :options="owner_articles" 
      title="Pick an article you own:" 
      @input="$emit('input', { id: $event })">
    </picker>

  </div>
</card>

<router-link class="article-card" 
v-else-if="article && article._id"
:to="'/project/' + article.owner + '/article/' + article._id"
tag="div">

  <!-- The  header of the card. -->
  <div class="article-header">
    <text-field v-model="article_draft.title"
      fontsize="h2"
      nobox
      :editable="editable"
    ></text-field>
    <hr class="article-title-underline">
    <text-field v-model="article_draft.description"
      textarea
      fontsize="small"
      nobox
      :editable="editable"
    ></text-field>
    <div class="byline" v-if="0">by <router-link to="/">Ben H</router-link></div>

  </div>

  <div class="article-popup" v-if="0">
    <div class="article-description">
      {{article.description}}
    </div>
  </div>
  <!-- Article description. -->
  <div class="thumbnail" @click.stop >
    <svg-uploader v-model="article_draft.thumbnail"></svg-uploader>
  </div> 
  

  <!-- The action buttons on the bottom of the card. -->
  <div class="action-container" v-if="editable">
    <div class="icon-button" @click.stop="update_article()">
      <save-icon class="small-icon"></save-icon>
    </div>
    <div class="icon-button" @click.stop="deleteArticle(article)">
      <trash-icon class="small-icon"></trash-icon>
    </div>
  </div>
  
</router-link>
<div class="article-card loading" v-else>
loading...
</div>
</template>

<script>


export default {
  data() {
    return {
      // Indicates if we've loaded in all possible article options
      view_all_articles: false,
      article_draft: {
        title: '',
        id: '',
        description: '',
        thumbnail: '',
      },
    }
  }, 
  props: {
    value: Object,
    owner: {
      type: String,
    },
    editable: Boolean,
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
      .then((articles) => {
        let article = articles[0];
        this.article_draft.title = article.title;
        this.article_draft.description = article.description;
        this.article_draft.id = article.id;
        this.article_draft.thumbnail = article.thumbnail;
      })
    } else {
      console.log("Setting id to new")
      this.$emit('input', { id: 'new' });
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
        console.log()
        return;
      }
      console.log("Adding a new article")
      console.log(new_article)
      this.$store.dispatch("articles/create_article", new_article)
      .then(() => {
        // If this is in a collection, this tells it to add the article.
        this.$emit('addarticle', new_article.id);
        this.$emit('input', { id: new_article.id});
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

    update_article() {
      this.$store.dispatch('articles/update_article', {
        _id: this.article._id,
        update: this.article_draft
      })
    },

  }
}
</script>

<style lang="scss">

.article-card {
  width: 100%;
  min-width: 250px;
  margin-bottom: 15px;
  height: 170px;
  position: relative;
  background: var(--card);
  margin-right: 20px;
  transition-duration: .5s;
  z-index: 2;
  overflow: hidden;
  cursor: pointer;
  padding-right: 200px;

  box-shadow: 0px 0px 0px rgba(0,0,0,.5); // Set blur to 2 so we can animate it
  &:hover {
    box-shadow: 0px 0px 10px rgba(0,0,0,.5); // Set blur to 2 so we can animate it
  }

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
    padding: 0px 30px;
    cursor: pointer;
    width: 100%;
  }
  // The little card peeking up
  .article-popup {
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
  &:hover .article-popup {
    top: 70px;
    opacity: 1;
  }

  // The article title 
  .article-title {
    z-index: 11;
    font-size: var(--h2-font-size);
    color: var(--card-text);
    font-weight: bold;
    transition-duration: .5s;
  }

  .article-title-underline {
    border: solid .5px var(--card-text);
    width: 200px;
    margin-bottom: 12px;
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
    transition-duration: .1s;
  }

  // Thumbnail image
  .thumbnail {
    width: 200px;
    height: 100%;
    position: absolute;
    background: var(--card-dark);
    right: 0px;
    bottom: 0px;
    transition-duration: .5s;
  }

  // The container for the edit and delete buttons in the article cards
  .action-container {
    display: flex;
    position: absolute;  
    left: 0px;
    bottom: -50px;  
    padding: 5px 10px;
    transition-duration: .5s;
    .icon-button {
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

.article-card:hover {
  .article-description {
    color:var(--card-text);
  }
  .action-container {
    bottom: 0px;  
  }
}
</style>