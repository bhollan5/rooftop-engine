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

// We need this for Vue.set()
import Vue from 'vue';

// Setting up our state variables:
export const state = () => ({

  // The user currently logged  in
  current_user: {},

  // User data:
  users: {},
  
})



//
// Getters, used to return our state in specific ways.
//      Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
//

export const getters = {

  current_user(state) {
    return state.current_user;
  },

  // This notation is the same as 
  //  getterName() { return function (articleId) { ... } }
  articleById: (state) => (articleId) => {
    // This filter format is how we can query an array of objs. 
    return state.articles[articleId];

  },

  // Gets all loaded articles (probably just for debugging.)
  allArticles(state) {
    return state.articles;
  },

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {

  // Creating a new user:
  createUser({commit}, payload) {

    axios.post("/api/create-user", {
      display_name: payload.display_name,
      username: payload.username,
      email: payload.email,
      password: payload.password
    })
    .then((response) => {
      console.log(" 💾 Successfully created a user: " + payload.username + "!");

      this.$auth.loginWith('local', {
        data: {
          username: payload.username,
          password: payload.password,
        }
      })

      // Moving the user to the correct page.
      this.$router.push({
        path: '/'
      });
    }, (error) => {
      console.warn("Error creating user:")
      console.warn(error.response.data);
    });

  },

  // Creating a new user:
  authenticate_user({commit}, payload) {
    console.log(payload);
    axios.get("/api/read-user-auth", {
      params: {
        username: payload.username,
        password: payload.password
      }
    })
    .then((response) => {

      if (!response.data.length) {
        console.log(" Couldn't find user!");
        return;
      }
      console.log(" 📦 Loaded " + response.data.length + " user.");
  
      commit('set_current_user', {
        display_name: payload.display_name,
        username: payload.username,
        email: payload.email,
      })

      
    }, (error) => {
      console.warn("Error logging in:")
      console.warn(error.response.data);
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
  readArticlesByQuery({commit}, payload) {
    console.log(" 🗣 Calling the API to load articles based on this query: ", payload);

    // Getting the article from the database.
    return axios.get("/api/read-articles", { params: payload})
      .then((response) => {
        let articles = response.data;
        console.log(" 📦 Loaded " + articles.length + " articles!");
        articles.forEach((article) => {
          commit('setArticle', article);
        })
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

    // We just put SVGS as normal datafields now instead of this
  // // Uploading an image for an article: 
  // uploadImage({commit}, payload) {
  //   console.log(" 🗣 Calling the api to upload the image %c" +  payload.fileName, "color:magenta;")
  //   console.log(payload);

  //   // You should have a server side REST API 
  //   axios.post('/api/upload-article-image', {
  //     fileName: payload.fileName,
  //     fileValue: payload.fileValue
  //   }).then(function () {
  //       console.log('Success uploading file!');
  //     })
  //     .catch(function () {
  //       console.log('Failed to upload item!');
  //     });
  // }
}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {

  // Setting the currently logged in user:
  set_current_user(state, payload) {
    state.current_user = payload;
    console.log(" ✨ Set the current user in the Vuex store");
    console.log("  Sending user back to the home page.");
    // Moving the user to the correct page.
    this.$router.push({
      path: '/'
    });
  },
  
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