// Info about modules: https://nuxtjs.org/guide/vuex-store/#modules-mode

//   Contents:
// ==========================
//   - Imports
//   - State 
//   - Getters
//   - Actions   (called with "$store.dispatch()")
//   - Mutations (used in the store with "commit()")

// For database calls - we may not need this!
import axios from 'axios';

// We need this for Vue.set()
import Vue from 'vue';

// Setting up our state variables:
export const state = () => ({

  // A list of all console messages
  console_log: [],
  
})



//
// Getters, used to return our state in specific ways.
//      Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
//

export const getters = {

  console_log(state) {
    return state.console_log;
  },

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {


  // // Updating an article by id.
  // update_article({commit}, payload) {
  //   console.log(" 🗣 Calling the API to update article %c" +  payload._id, "color:magenta;")

  //   // Getting the article from the database.
  //   axios.post("/api/update-article", {
  //       _id: payload._id,
  //       update: payload.update
  //     }).then((response) => {
  //       console.log(" 🖌 Updated the article %c" +  payload._id, "color:magenta;");
  //     }).catch ((error) => {
  //       console.warn(error);
  //     });

  // },

}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {

  // Setting the currently logged in user:
  log(state, payload) {
    state.console_log.push(payload);
    console.log("  Sending user back to the home page.");
  },

}