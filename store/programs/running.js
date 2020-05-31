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

  programs: [],

  sample_program: {
    data: [],
    instructions: [],
    state: 0, // 0 == dead, 1 == running, 2 == paused 
  },
})



//
// Getters, used to return our state in specific ways.
//      Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
//

export const getters = {
  // The list of output lines. 
  lines(state) {
    return state.lines;
  },
  // Whether the CLI is in write mode. 
  input_mode(state) {
    return state.input_mode;
  },
  // The drafted user input. 
  user_input(state) {
    return state.user_input;
  }

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {

  //    ⍿  Actions:

  // 
  do_instruction({ commit, dispatch }, payload) {

    commit('add_line', 'guest@~/dustzone$ ' + payload); // logging the command

    // Splitting the input string into an array that looks like this: [command, arg1, arg2, ... ]
    let command_args = payload.split( ' ' );

    // Getting rid of the first 'command' string in the array, and moving it to a new variable. 
    let command = command_args.shift();

    // Checking if the command is known:
    if (['create'].indexOf(command) == -1) {
      dispatch('output', "That's not a command I know :/"); 
      return;
    }

    // Calling the action:
    dispatch(
      'here/actions/' + command + '/default', 
      command_args,
      { root: true }
    );

  },

  //    ◎ Outputs:

  // Displays text on the screen. 
  output({commit, dispatch}, payload) {
    commit('add_line', payload); // logging the output
  },



  //    ⍿ Inputs:

  // Displays text on the screen. 
  input({commit, getters}, payload) {
    commit('input_mode', true);

    // This waits for user input, and then returns that input value. 
    return new Promise((resolve, reject) => {
      // This loops until we switch out of write mode. 
      setInterval(() => {
        if (!getters['input_mode']) {
          let user_input = getters['user_input'];
          resolve(user_input);
          return;
        }
      }, 10)
    })

  },

  // When a user enters text into an input
  enter_input({commit}, payload) {
    commit('set_user_input', payload);
    commit('input_mode', false);
    commit('add_line', '? ' + payload); // logging the input
  },




 

}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {
  add_line(state, payload) {
    state.lines.push( payload );
  },

  input_mode(state, payload) {
    state.input_mode = payload;
  },

  set_user_input(state, payload) {
    state.user_input = payload;
  }
}