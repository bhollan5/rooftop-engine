<template>
<!-- Container for all collections-->
<div id="collection-container"
  :style="{background: $store.state.bg}">

  <!-- collection info/header -->
  <div class="collection-header" :class="{'collection-header-selected': editCollection }">
    <!-- Edit icons, floating to the left -->
    <div class="floating-element-icons" @click="editCollection = !editCollection"
      :class="{'floating-icons-selected': editCollection}">
      <check-icon v-if="editCollection"></check-icon>
      <edit-icon v-else></edit-icon>
    </div>

    <h3 class="collection-title" v-if="!editCollection">{{collection.collectionTitle}}</h3>
    <text-field v-else v-model="collection.collectionTitle" nobox class="collection-title h3-input"></text-field>
    <p class="collection-description" v-if="!editCollection">{{collection.collectionDescription}}</p>
    <text-field v-else v-model="collection.collectionDescription" nobox class="collection-description"></text-field>

    <hr class="collection-underline" >
  </div>

  <div class="collection">
    <article-card v-for="(article, article_i) in articles" :article="article" :key="'article-' + article_i">
    </article-card>
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
    articles: Array
  },
  components: {
    editIcon,
    textField,
    articleCard,
    checkIcon
  },
  data() {
    return {
      editCollection: false
    }
  }
}
</script>

<style lang="scss">

// Container for collections of media.
.collection {
  display: flex;
  margin-left: 50px;
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
  max-width: 350px;
  font-size: var(--small-font-size);
  input {
    font-size: var(--small-font-size);
  }
}
.collection-underline {
  width: 40%;
  min-width: 250px;
  margin-bottom: 10px;
}
</style>