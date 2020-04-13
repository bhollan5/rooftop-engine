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

  // Project query
  project_query: (state) => (field, value) => {
    return state.projects.filter( function(project) {
      return (project[field] == value);
    });
  },

  // Gets all loaded projects (probably just for debugging.)
  all_projects(state) {
    return state.projects;
  },








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
    this.$console.log("projects", " 🗣 Called to create a new project ")
    console.warn(payload._id)
    return axios.post("/api/create-project", {
      title: payload.title,
      _id: payload._id,
      owner: payload.owner,
      description: payload.description,
      type: payload.type,
    })
    .then((response) => {
      this.$console.log("projects", " 💾 Successfully created a project!");
      this.$console.log("projects", " > The project's id is: " + response.data._id);

    }, (error) => {
      console.warn(error);
    });

  },

  // Reading a project, probably by  id::
  read_projects({commit}, payload) {
    this.$console.log("projects", " 🗣 Called to read a project ");
    this.$console.log("projects", payload);
    console.log("hi")
    console.log(payload);

    return axios.get("/api/read-projects", { params: payload })
    .then((response) => {
      console.log(response);
      if (response.data.length) {

        let projects = response.data;
        console.log(" 📦 Loaded " + projects + " projects!");
        projects.forEach((project) => {
          commit('load_project', project);
        })
        return projects;

      } else {
        this.$console.log("projects", " ⛔️ No projects loaded.")
      }
      this.$console.log("projects", response.data);
      
    }, (error) => {
      console.warn(error);
    });

  },

  // Updating a project by id.
  update_project({commit}, payload) {
    console.log(" 🗣 Calling the API to update project %c" +  payload._id, "color:magenta;")
    console.log(payload)
    // Getting the article from the database.
    return axios.post("/api/update-project", {
      _id: payload._id,
      update: payload.update
    }).then((response) => {
      console.log(" 🖌 Updated the project %c" +  payload._id, "color:magenta;");
    }).catch ((error) => {
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
        this.$console.log("projects", " ✨ Updated the collection %c" +  payload._id + " in the Vuex store:", "color:magenta;");
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
    this.$console.log("projects", " ✨ " + difference + " article was deleted in the Vuex store.")
  },


}