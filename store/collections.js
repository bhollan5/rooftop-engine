// Info about modules: https://nuxtjs.org/guide/vuex-store/#modules-mode

//   Contents:
// ==========================
//   - Imports
//   - State 
//   - Getters
//   - Actions   (called with "$store.dispatch()")
//   - Mutations (used in the store with "commit()")

// For database calls:
import axios from 'axios';

// For Vue.set()
import Vue from 'vue';

// Setting up our state variables:
export const state = () => ({

  // Loaded collections data:
  collections: [],
  
})



//
// Getters, used to return our state in specific ways.
//      Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
//

export const getters = {

  // This notation is the same as 
  //  getterName() { return function (articleId) { ... } }
  collectionById: (state) => (collectionId) => {
    // This filter format is how we can query an array of objs. 
    return state.collections.filter( function(collection) {
      return (collection._id == collectionId);
    });
  },

  // Todo: delete collectionById and replace it with this one
  collection_query: (state) => (field, value) => {
    return state.collections.filter( function(collection) {
      return (collection[field] == value);
    });
  },


  // Gets all loaded collections (probably just for debugging.)
  allCollections(state, getters, rootState, rootGetters) {
    let collections_with_data = JSON.parse(JSON.stringify(state.collections));
    
    collections_with_data.forEach((collection, col_i) => {
      collection.collectionData.forEach((item, item_i) => {
        
        let item_data = rootGetters['articles/articleById'](item);
        if (!item_data) {
          collection.loading = true;
        } else {
          collections_with_data[col_i].collectionData[item_i] = item_data
        }
      })
      collection.editable = true;
    })
    return collections_with_data;
  },

  collectionOfall_articles(state, getters, rootState, rootGetters) {
    let all_articles = rootGetters['articles/all_articles'];
    let allArticleCollection = {
      _id: 'all-articles',
      collectionDescription: "This displays all published articles",
      collectionTitle: "All Articles",
      collectionData: all_articles,
      editable: false,
    }
    return allArticleCollection;
  }

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {

  // Creating a new collection:
  create_collection({commit}, payload) {
    console.log("Creating new collection:")

    let new_collection = {
      title: payload.title,
      _id: payload.id,
      owner: payload.owner,
      description: payload.description,
      data: [],
    };
    console.log(new_collection)
    axios.post("/api/create-collection", new_collection)
    .then((response) => {
      console.log(" 💾 Successfully created a collection!");
      console.log(" > The collection's id is: " + response.data._id);
      commit('set_collection', response.data);

    }, (error) => {
      console.warn(error);
    });

  },

  // Reading a collection by query:
  read_collection({commit}, payload) {
    console.log(" 🗣 Called to read a collection by this query: ");
    console.log(payload);

    axios.get("/api/read-collection", { params: payload })
    .then((response) => {
      if (response.data.length) {
        console.log(" 💾 Successfully loaded a collection!");
        
        for (let i in response.data) {
          commit('set_collection', response.data[i]);
        }

      } else {
        console.log(" ⛔️ No projects loaded.")
      }
      console.log(response.data);
      
    }, (error) => {
      console.warn(error);
    });

  },

  // Getting all collections (DEPRECATED :P)
  readCollections({commit, rootGetters, dispatch}) {
    console.log(" 🗣 Calling the API to load all collections.")

    return axios.get("/api/read-all-collections")
      .then((response) => {
        console.log(" 📦 Loaded " + response.data.length + " collections.");

        // This is now an array of collection objects:
        let all_collections = response.data;
        // But the collectionData is loaded in as an array of article id's. 
        // We need to load in their corresponding articles!
        
        all_collections.forEach((collection) => {
          if (collection.collectionData.length){
            dispatch('articles/readArticlesByQuery', collection.collectionData, {root: true});
          }

          // dispatch('getCollectionArticle', collection);
        })

        commit('setCollections', response.data);

      }, (error) => {
        console.warn(error);
      });
  },

  // Takes a collection and loads in the data for it. 
  getCollectionArticle({dispatch}, payload) {
    let collection = payload;

    if (!collection.collectionData.length) return;

    // We're gonna set up a query to find all our articles at once. More info:
    //   https://docs.mongodb.com/manual/reference/operator/query/or/
    let articleQuery = { $or: [] };

    // Adding all those id's to our query
    collection.collectionData.forEach((item) => {
      articleQuery.$or.push({_id: item});
    })
    
    dispatch('articles/readArticlesByQuery', articleQuery, {root: true});
  },

  // Updating a collection by id.
  updateCollection({commit}, payload) {
    console.log(" 🗣 Calling the API to update collection %c" +  payload._id, "color:magenta;")

    // Making the API call
    axios.post("/api/update-collection", {
        _id: payload._id,
        update: payload.update
      }).then((response) => {
        console.log(" 🖌 Updated the collection %c" +  payload._id, "color:magenta;");
      }).catch ((error) => {
        console.warn(error);
      });

  },

  // Updating a collection by id.
  updateCollectionInfo({commit}, payload) {
    console.log(" 🗣 Calling the API to update collection %c" +  payload._id, "color:magenta;")

    // Making the API call
    axios.post("/api/update-collection", {
        _id: payload._id,
        update: payload.update
      }).then((response) => {
        console.log(" 🖌 Updated the collection %c" +  payload._id, "color:magenta;");
        commit('set_collection', {
          _id: payload._id,
          update: payload.update
        })
      }).catch ((error) => {
        console.warn(error);
      });

  },

  // Deletes an article by id.
  deleteArticle({commit}, payload) {
    console.log(" 🗣 Calling the api to delete article %c" +  payload._id, "color:magenta;")

    // Getting the article from the database.
    axios.delete("/api/delete-article/" + payload._id).then(() => {
      console.log(" ⛔️ Deleted the article with the id of " + payload._id);
      commit('deleteArticle', { _id: payload._id});
    }, (error) => {
      console.warn(error);
    });
  },

}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {
  
  // Setting article array.
  setCollections(state, payload) {
    state.collections = payload;
  },

  // Loading or updating a collection.
  set_collection(state, payload) {

    let collection_found = false;
    state.collections.forEach((collection, collection_i, coll_arr) => { 

      if (payload._id == collection._id) {
        coll_arr[collection_i] = payload;
        collection_found = true;
      }
    })
    if (!collection_found){
      state.collections.push(payload);
    }
  },

  // update a collection byID:
  updateCollectionInfo(state, payload) {
    state.collections.forEach((collection) => { 
      if (collection._id == payload._id) {
        collection.collectionTitle = payload.update.collectionTitle;
        collection.collectionDescription = payload.update.collectionDescription;
        console.log(" ✨ Updated the collection %c" +  payload._id + " in the Vuex store:", "color:magenta;");
        return; // End early, since we're just updating one
      }
    });
  },
  
  // Deleting an article by id: 
  deleteArticle(state, payload) {
    let updatedArticles = state.articles.filter((article) => { 
      // Keeping articles when this is true:
      return article._id != payload._id;
    });
    let difference = state.articles.length - updatedArticles.length;
    state.articles = updatedArticles;
    console.log(" ✨ " + difference + " article was deleted in the Vuex store.")
  },

  logMessage(state, payload) {
    console.log(payload.msg);
  }

}