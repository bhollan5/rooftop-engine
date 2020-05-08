// Info about modules: https://nuxtjs.org/guide/vuex-store/#modules-mode

/*   Contents:
============================
     > Imports:
      - Axios (API calls)
      - Vue   ()
     > State 
      - 
//   - Getters
//   - Actions   (called with "$store.dispatch()")
//   - Mutations (used in the store with "commit()")

*/

// For database calls:
import axios from 'axios';

import {Page} from '~/modules/globals';

// Setting up our state variables:
export const state = () => ({

  name: '',
  id: '', 
  elements: [],
  
})



//
// Getters, used to return our state in specific ways.
//      Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
//

export const getters = {

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {

  // Loads a page in from the database, then copies a draft. 
  load({commit, dispatch}, payload) {
    let new_page = new Page();
    console.warn("ooo here's new page");
    console.log(new_page);
  },

  save({commit}, payload) {

    return axios.post("/api/pages/create", payload)
    .then((response) => {
      console.log(" 🖌 Updated the user %c" +  payload._id, "color:magenta;");
    }).catch ((error) => {
      console.warn(error);
    });
  },

}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {

}