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

  /*
    Called like:
    $ run create arg1 arg2... 
  //  The payload is an array of the arguments from the command: [arg1, arg2, ...]
  */
  default({commit, dispatch}, payload) {

    // Splitting the input string into an array that looks like this: [command, arg1, arg2, ... ]
    let command_args = payload.split( ' ' );

    // Getting rid of the first 'command' string in the array, and moving it to a new variable. 
    let command = command_args.shift();

    // Checking if the command is known:
    if (['create', 'load'].indexOf(command) == -1) {
      dispatch('output', "That's not a command I know :/"); 
      return;
    }

    console.log(" %c⍀ local/actions/run - %cRunning: %c" + command + " %c " + command_args.toString(),
      "color: #70FFFF",
      "color: white",
      "color: #EAD686",
      "color: #C3A2FF",
    );
    

    // Calling the action:
    dispatch(
      'local/actions/' + command + '/default', 
      command_args,
      { root: true }
    );

  },


}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {

}