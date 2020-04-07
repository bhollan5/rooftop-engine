<!--
  When the collection widget is made, it lets the creator make a new collection,
  or load an existing collection into the page.

  Once the collection is loaded, it displays all files in that collection.
-->

<template>
<!-- When this widget is first created, we open the new collection options: -->
<card title="New collection" v-if="this.value &&  this.value.id == 'new'" flex twocolumn>
  <!-- Create collection: -->
  <div class="card-section">
    <text-field title="Collection name:" v-model="collection_draft.title"></text-field>
    <text-field title="Collection id:" v-model="collection_draft.id"></text-field>
    <text-field title="Description:" v-model="collection_draft.description"></text-field>
    <button class="action" @click="create_collection()">+ Add</button>
  </div>
  <!-- Pick an existing collection: -->
  <div class="card-section">
    <button class="card-button" v-if="!view_collections" @click="load_collections()">
      Pick an existing collection
    </button>
    <picker :options="owner_collections" title="Pick a collection:" v-else
    @input="update_data('id', $event)">
    </picker>
  </div>
</card>

<!-- Collection container: -->
<div class="collection-container"
  :style="{background: $store.state.bg}" v-else-if="collection && collection._id"> 
  
  <!-- collection info/header -->
  <div class="collection-header">

    <!-- Save icon, floating to the left -->
    <div class="floating-element-icons" @click="update_collection()" v-if="editable">
      <check-icon></check-icon>
    </div>

    <!-- The title of the collection. -->
    <h3 class="collection-title" v-if="!editable">{{collection.title}}</h3>
    <text-field v-else v-model="collection_draft.title" nobox class="collection-title h3-input"
      @enter="floatingIconAction()"></text-field>

    <!-- Collection descriptions. -->
    <p class="collection-description" v-if="!editable">{{collection.description}}</p>
    <text-field v-else v-model="collection_draft.description" nobox class="collection-description"
      @enter="floatingIconAction()"></text-field>

  </div>

  <!-- Area displaying the content of the collection. -->
  <div class="collection-display">
    <!-- The cards in the collection -->
    <article-card v-for="(article_id, index) in collection.data" 
    :value="{ id: article_id }" 
    :key="article_id" v-if="!collection.loading">
    </article-card>

    <!-- a crd to let users add articles -->
    <article-card :value="{id: 'new'}" v-if="editable" :owner="owner"
    @addarticle="add_article($event)"></article-card>

    <card title="Add a file" class="add-a-file" v-if="editable && 0">
      <text-field v-model="articleIdToAdd"></text-field>
      <button @click="addArticleToCollection()" class="card-button">Add</button>
    </card>
  </div>

</div>
<div class="collection-loading collection-container" v-else>
  Loading {{value.id}}...
</div>
</template>

<script>
import editIcon from '@/components/icons/edit-icon.vue';
import checkIcon from '@/components/icons/check-icon.vue';

import articleCard from '@/components/content/widgets/article_card.vue';



export default {
  props: {
    value: Object,
    editable: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: String,
    }
  },
  components: {
    editIcon,
    articleCard,
    checkIcon,
    
  },
  data() {
    return {
      // Local copy of collection details, so we can edit & save

      // This lets us browse a list of collections we have
      view_collections: false,


      articleIdToAdd: '', // For adding articles to collections
    }
  },
  computed: {
    // The collection being displayed
    collection() {
      return this.$store.getters['collections/collectionById'](this.value.id)[0];
    },
    // The local copy of the collection's details, so we can edit & save
    collection_draft() {
      if (this.collection) {
        return {
          title: this.collection.title,
          id: this.collection._id,
          description: this.collection.description,
        };
      } else {
        return {
          title: '',
          id: '',
          description: '',
        };
      }
    },
    owner_collections() {
      let owner_collections = this.$store.getters['collections/collection_query']('owner', this.owner);
      let formatted_options = [];
      owner_collections.forEach((collection) => {
        formatted_options.push({ 
          icon: 'col', 
          title: collection.title,
          value: collection._id,
          description: collection.description,
        })
      })
      return formatted_options;
    }
  },
  mounted() {
    if (this.value.id && this.value.id != 'new') {
      this.$store.dispatch('collections/read_collection', { _id: this.value.id })
    } else {
      this.update_data('id', 'new');
    }
  },
  methods: {
    // Called when the user clicks 'new collection'
    create_collection() {
      if (!this.collection_draft.id || !this.collection_draft.title) {
        alert("Add id and name")
        return;
      }
      this.$store.dispatch("collections/create_collection", {
        title: this.collection_draft.title,
        id: this.collection_draft.id,
        description: this.collection_draft.description,
        owner: this.owner
      })
      .then(() => {
        this.update_data('id', this.collection_draft.id);
      })
    },

    load_collections() {
      this.view_collections = true;
      this.$store.dispatch('collections/read_collection', {
        owner: this.owner
      });
    },

    // Saves the collection info
    update_collection() {
      this.$store.dispatch('collections/updateCollectionInfo', {
        _id: this.collection._id,
        update: {
          title: this.collection_draft.title,
          description: this.collection_draft.description
        },
      }) 
    },

    add_article(id) {
      let article_list = JSON.parse(JSON.stringify(this.collection.data));
      article_list.push(id);
      this.$store.dispatch('collections/updateCollectionInfo', {
        _id: this.collection._id,
        update: {
          data: article_list,
        },
      })
    },

    // Adds an article ID to a collection
    addArticleToCollection() {
      this.$store.dispatch('collections/updateCollection', {
        _id: this.collection._id,
        update: { $addToSet: { collectionData: this.articleIdToAdd } }
      })
    },

    update_data(field, new_val) {
      let data_update = JSON.parse(JSON.stringify(this.value));
      data_update[field] = new_val;
      console.warn("Updating parent:")
      console.log(data_update)
      this.$emit('input', data_update);
    },

  }
}
</script>

<style lang="scss">

.pick-a-collection {
  min-width: 250px;
}


// All collections
.collection-container {
  padding-top: 25px;
  padding-bottom: 25px;
  width: 100%;
  box-shadow: var(--box-shading);
  color: var(--bg-text);
}

// Container for collections of media. 
.collection-display {
  display: flex;
  flex-flow: row wrap;
  min-width: 100%;
  padding: 10px 0px 10px 20px; 
  // background: var(--bg2);
  // box-shadow: inset 0px 0px 4px rgba(0,0,0,.4);
}
.collection-header {
  margin: 0px;
  padding: 5px 5px 5px 5px;
  margin-bottom: 5px;
  position: relative;
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

.floating-element-icons {
  width: 10px;
  height: 10px;
  position: absolute;
  left: -20px;
  cursor: pointer;
  svg {
    fill: var(--c1);
    width: 100%;
    height: 100%;
  }
}
</style>