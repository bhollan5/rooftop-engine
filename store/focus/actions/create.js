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

import * as object_dictionary from '~/modules/globals.js';

// Setting up our state variables:
export const state = () => ({

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

  // This gets called when you enter the cli command 'create arg1 arg2...' 
  //  The payload is an array of the arguments from the command: [arg1, arg2, ...]
  default({commit, dispatch}, payload) {

    let create_args = payload;
    let object_type = create_args.shift();

    // Checking if the command exists:
    if (['prototype'].indexOf(object_type) == -1) {
      dispatch('here/objects/cli/output', "That's not a command I know :/", {root: true}); 
      return;
    }
    dispatch(object_type, create_args)

  },

  // 
  prototype({commit, dispatch}, payload) {
    console.log('Creating new prototype');

    dispatch('here/objects/cli/input', 'Entity id?', {root: true} )
    .then((response) => {
      console.warn(response);
      dispatch('here/objects/cli/output', 'Entity id?', {root: true} )
    })
  },


}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {

}