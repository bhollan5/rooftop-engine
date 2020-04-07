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

  // Loaded projects data:
  projects: [],
  
})



//
// Getters, used to return our state in specific ways.
//      Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
//

export const getters = {

  // This notation is the same as 
  //  getterName() { return function (id) { ... } }
  project_by_id: (state) => (project_id) => {
    // This filter format is how we can query an array of objs. 
    let filtered_projects = state.projects.filter( function(proj) {
      return (proj._id == project_id);
    });
    if (filtered_projects.length > 1) {
      console.warn("Multiple projects with the same id found")
    }
    return filtered_projects[0];
  },


  get_user_projects: (state) => (user_id) => {
    // This filter format is how we can query an array of objs. 
    let filtered_projects = state.projects.filter( function(proj) {
      return (proj.owner == user_id);
    });
    return filtered_projects;
  },

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {

  // Creating a new project:
  create_project({commit}, payload) {
    console.log(" 🗣 Called to create a new project ")

    axios.post("/api/create-project", {
      title: payload.title,
      _id: payload._id,
      owner: payload.owner,
      description: payload.description,
      type: payload.type,
    })
    .then((response) => {
      console.log(" 💾 Successfully created a project!");
      console.log(" > The project's id is: " + response.data._id);

    }, (error) => {
      console.warn(error);
    });

  },

  // Reading a project, probably by  id::
  read_project({commit}, payload) {
    console.log(" 🗣 Called to read a project ");
    console.log(payload);

    axios.get("/api/read-project", { params: payload })
    .then((response) => {
      if (response.data.length) {
        console.log(" 💾 Successfully loaded a project!");
        commit('load_project', response.data[0]);

      } else {
        console.log(" ⛔️ No projects loaded.")
      }
      console.log(response.data);
      
    }, (error) => {
      console.warn(error);
    });

  },

  // Getting all collections:
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
        commit('updateCollectionInfo', {
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
  
  // Adding or updating project in the projects array.
  load_project(state, payload) {

    let proj_found = false;
    state.projects.forEach((project, proj_i, proj_arr) => { 

      if (payload._id == project._id) {
        proj_arr[proj_i] = payload;
        proj_found = true;
      }
    })
    if (!proj_found){
      state.projects.push(payload);
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