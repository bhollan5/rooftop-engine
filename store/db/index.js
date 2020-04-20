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
  
})



//
// Getters, used to return our state in specific ways.
//      Use:
//   this.$store.getters.getter_name
//   this.$store.getters.getter_with_param(param_data)
//

export const getters = {

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {


  // Reading documents from a collection by query.
  read_docs({commit}, payload) {

    // setting these variables just for clearer names
    let collection_name = payload.collection_name;
    let query = payload.query;
    this.$console.log("page", " 🗣 Called to read docs from " + collection_name);

    // Getting the api route -
    //   Ex: if collection_name is 'project', this will get '/api/read-projects'
    let api_url = '/api/read-' + collection_name + 's';

    // Getting it from the DB:
    return axios.get(api_url, { params: query })
    .then((response) => {

      // If we got 1 or more responses:
      if (response.data.length) {

        console.log(" 📦 Loaded " + response.data.length + " page(s) from " + collection_name + "!");
        
        let loaded_docs = response.data;

        loaded_docs.forEach((doc, index) => {
          // Ex: If collection_name == 'project', this commits to 'db/projects/load_project'
          let commit_path = 'db/' + collection_name + 's/load_' + collection_name;
          commit(commit_path, doc, {root: true});
        });
        
        return loaded_docs;

      // If our query loaded more than one doc:
      } else {
        this.$console.log("projects", " ⛔️ No docs loaded.")
      }
      this.$console.log("projects", response.data);
      
    }, (error) => {
      console.warn(error);
    });

  },
}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {

}