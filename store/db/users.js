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
  users: [],
  
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

  all_users(state) {
    return state.users;
  },

  // This notation is the same as 
  //  getterName() { return function (articleId) { ... } }
  articleById: (state) => (articleId) => {
    // This filter format is how we can query an array of objs. 
    return state.articles[articleId];

  },

  // Gets all loaded articles (probably just for debugging.)
  all_articles(state) {
    return state.articles;
  },

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {

  // Creating a new user:
  create_user({commit}, payload) {

    axios.post("/api/create-user", {
      display_name: payload.display_name,
      username: payload.username,
      current_theme: payload.current_theme,
      email: payload.email,
      password: payload.password,
      page: this.$page.new_page()
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

  // Reading users by query:
  read_users({commit}, payload) {
    console.log(" 🗣 Called to read a user by this query: ");
    console.log(payload);

    axios.get("/api/query-users", { params: payload })
    .then((response) => {
      if (response.data.length) {
        console.log(" 💾 Successfully loaded a user!");
        
        for (let i in response.data) {
          commit('set_user', response.data[i]);
        }

      } else {
        console.log(" ⛔️ No users loaded.")
      }
      console.log(response.data);
      
    }, (error) => {
      console.warn(error);
    });

  },

  // Updating a user by id.
  update_user({commit}, payload) {
    console.log(" 🗣 Calling the API to update user %c" +  payload._id, "color:magenta;")
    console.log(payload)
    // Calling to the DB.
    return axios.post("/api/update-user", {
      _id: payload._id,
      update: payload.update
    }).then((response) => {
      console.log(" 🖌 Updated the user %c" +  payload._id, "color:magenta;");
    }).catch ((error) => {
      console.warn(error);
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

  set_user(state, payload) {
    // Loading or updating a collection.

    let user_found = false;
    state.users.forEach((user, user_i, user_arr) => { 

      if (payload._id == user._id) {
        user_arr[user_i] = payload;
        user_found = true;
      }
    })
    if (!user_found){
      state.users.push(payload);
    }
  }

}