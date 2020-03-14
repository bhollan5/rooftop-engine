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

  // Gets all loaded collections (probably just for debugging.)
  allCollections(state) {
    return state.collections;
  },

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {

  // Creating a new collection:
  createCollection({commit}, payload) {

    axios.post("/api/create-collection", {
      collectionTitle: 'New Collection',
      collectionDescription: "Your collection description here!",
      collectionData: [],
    })
    .then((response) => {
      console.log(" 💾 Successfully created a collection!");
      console.log(" > The collection's id is: " + response.data._id);

    }, (error) => {
      console.warn(error);
    });

  },

  // Getting all articles:
  readArticles({commit}) {
    console.log(" 🗣 Calling the API to load all articles.")

    return axios.get("/api/articles")
      .then((response) => {
        console.log(" 📦 Loaded " + response.data.length + " articles.");
        commit('setArticles', response.data);
      }, (error) => {
        console.warn(error);
      });
  },

  // Getting a set of articles, by query.
  readArticle({commit}, payload) {

    // Getting the article from the database.
    axios.get("/api/read-article", payload.query)
      .then((response) => {
        console.log(" 📦 Loaded " + response.data.length + " articles based on this query:" + payload.query);
        commit('setArticles', response.data);
      }, (error) => {
        console.warn(error);
      });

  },

  // Updating an article by id.
  updateArticle({commit}, payload) {
    console.log(" 🗣 Calling the API to update article %c" +  payload._id, "color:magenta;")

    // Getting the article from the database.
    axios.post("/api/update-article", {
        _id: payload._id,
        update: payload.update
      }).then((response) => {
        console.log(" 🖌 Updated the article %c" +  payload._id, "color:magenta;");
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

  // Uploading an image for an article: 
  uploadImage({commit}, payload) {
    console.log(" 🗣 Calling the api to upload the image %c" +  payload.fileName, "color:magenta;")
    console.log(payload);

    // You should have a server side REST API 
    axios.post('/api/upload-article-image', {
      fileName: payload.fileName,
      fileValue: payload.fileValue
    }).then(function () {
        console.log('Success uploading file!');
      })
      .catch(function () {
        console.log('Failed to upload item!');
      });
  }
}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {
  
  // Setting article array:
  setArticles(state, payload) {
    state.articles = payload;
    console.log(" ✨ Articles updated in the Vuex store:", payload);
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