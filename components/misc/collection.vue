<template>
<!-- Container for all collections-->
<div class="collection-container"
  :style="{background: $store.state.bg}">

  <!-- collection info/header -->
  <div class="collection-header" :class="{'collection-header-selected': editCollection }">

    <!-- Edit icons, floating to the left -->
    <div class="floating-element-icons" @click="floatingIconAction()"
      :class="{'floating-icons-selected': editCollection}" v-if="collection.editable">
      <check-icon v-if="editCollection"></check-icon>
      <edit-icon v-else></edit-icon>
    </div>

    <!-- The title of the collection. -->
    <h3 class="collection-title" v-if="!editCollection">{{collection.collectionTitle}}</h3>
    <text-field v-else v-model="collectionTitleDraft" nobox class="collection-title h3-input"
      @enter="floatingIconAction()"></text-field>

    <!-- Collection descriptions. -->
    <p class="collection-description" v-if="!editCollection">{{collection.collectionDescription}}</p>
    <text-field v-else v-model="collectionDescriptionDraft" nobox class="collection-description"
      @enter="floatingIconAction()"></text-field>

  </div>

  <!-- Area displaying the content of the collection. -->
  <div class="collection-display">
    <article-card v-for="(article, article_i) in collection.collectionData" :article="article" 
      :key="'article-' + article_i" v-if="!collection.loading">
    </article-card>

    <div class="add-a-file" v-if="editCollection">
      <text-field v-model="articleIdToAdd"></text-field>
      <button @click="addArticleToCollection()">Add</button>
    </div>
  </div>

</div>
</template>

<script>
import editIcon from '@/components/icons/edit-icon.vue';
import checkIcon from '@/components/icons/check-icon.vue';

import articleCard from '@/components/non-fic/article-card.vue';

import textField from '@/components/inputs/text-field.vue';


export default {
  props: {
    collection: Object,
  },
  components: {
    editIcon,
    textField,
    articleCard,
    checkIcon
  },
  data() {
    return {
      editCollection: false,
      collectionTitleDraft: '',
      collectionDescriptionDraft: '',

      articleIdToAdd: '', // For adding articles to collections
    }
  },
  methods: {
    // Called when the user clicks the gear/check icon
    floatingIconAction() {
      if (!this.editCollection) {
        this.collectionTitleDraft = this.collection.collectionTitle;
        this.collectionDescriptionDraft = this.collection.collectionDescription;
        this.editCollection = true;
      } else {
        this.editCollection = false;
        this.$store.dispatch('collections/updateCollectionInfo', {
          _id: this.collection._id,
          update: {
            collectionTitle: this.collectionTitleDraft,
            collectionDescription: this.collectionDescriptionDraft
          },
        }) 
      }
    },

    // Adds an article ID to a collection
    addArticleToCollection() {
      this.$store.dispatch('collections/updateCollection', {
        _id: this.collection._id,
        update: { $addToSet: { collectionData: this.articleIdToAdd } }
      })
    }

  }
}
</script>

<style lang="scss">
// All collections
.collection-container {
  padding-top: 25px;
  width: 100%;
  box-shadow: var(--box-shading);
  color: var(--bg-text);
}

// Container for collections of media.
.collection-display {
  display: flex;
  min-width: 100%;
  height: 180px; // Setting this to the same height as the cards, plus 30px for padding
  padding: 15px 0px 0px 50px;
  overflow: hidden;
  background: var(--bg2);
  box-shadow: inset 0px 0px 4px rgba(0,0,0,.4);
}
.collection-header {
  margin: 0px 45px;
  padding: 5px 5px 5px 5px;
  margin-bottom: 5px;
  position: relative;
}
.collection-header-selected {
  background: var(--card);
}
.collection-title {
  max-width: 350px;
}
.collection-description {
  margin-bottom: 5px;
  
  max-width: 50%;
  color: var(--bg-text2);
  font-size: var(--small-font-size);
  input {
    font-size: var(--small-font-size);
  }
}
.collection-container:hover .collection-description {
  color: var(--bg-text);
}
</style>