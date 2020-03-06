// Info about modules: https://nuxtjs.org/guide/vuex-store/#modules-mode

// For database calls:
import axios from 'axios';


// Setting up our state variables:
export const state = () => ({

  // Article data:
  articles: [],
  
})



// Getters, used to return our state in specific ways.
// Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
export const getters = {

  // This notation is the same as 
  //  getterName() { return function (articleId) { ... } }
  articleById: (state) => (articleId) => {

    // This filter format is how we can query an array of objs. 
    return state.articles.filter( function(article) {
      return (article._id == articleId);
    });

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

  // Creating a new article:
  createArticle({commit}, payload) {

    axios.post("/api/create-article", {
      articleTitle: payload.articleTitle,
      articleData: payload.articleData
    })
    .then((response) => {
      console.log(" 💾 Successfully created an article titled " + payload.articleTitle + "!");
      console.log(" > The article's id is: " + response.data.insertedId);

      this.articleId = response.data.insertedId

      // Moving the user to the correct page.
      this.$router.push({
        path: '/non-fic/' + this.articleId + '/edit'
      })
    }, (error) => {
      console.warn(error);
    });

  },

  // Getting all articles:
  readArticles({commit}) {
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

  // Updating a set of articles, by query.
  updateArticle({commit}, payload) {

    // Getting the article from the database.
    axios.post("/api/update-article", {
        _id: payload._id,
        update: payload.update
      }).then((response) => {
        let queryKey = Object.keys(payload.query)[0];
        console.log(" 🖌 Updated the article with the " + queryKey + " of " + payload.query[queryKey]);
      }, (error) => {
        console.warn(error);
      });

  },
}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {
  
  // Setting article array:
  setArticles(state, payload) {
    console.log(" ✨ Articles updated in the Vuex store:", payload);
    state.articles = payload;
  },

}