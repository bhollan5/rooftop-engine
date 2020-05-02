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

import {Element, Container} from '~/modules/globals.js';

// For Vue.set()
import Vue from 'vue';

// Setting up our state variables:
export const state = () => ({

  template_id: '',
  prop_config: {},
  container: {},
  
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
  
  select_element({commit}, payload) {
    
  }

}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {
  load_selected_element(state, payload) {

    state.template_id = payload.template_id;
    state.prop_config = payload.prop_config;
    state.container = payload.container
  }
}