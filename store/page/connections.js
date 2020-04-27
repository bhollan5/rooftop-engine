

// For Vue.set()
import Vue from 'vue';

// Setting up our state variables:
export const state = () => ({

  prop_config: {}
  
})



//
// Getters, used to return our state in specific ways.
//      Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
//

export const getters = {

  prop_config(state) {
    return state.prop_config;
  },

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {
  
  set_prop_config({commit}, payload) {
    console.warn("payload for page/connections/set_prop_config:")
    console.log(payload)
    commit('set_prop_config', payload);
  }

}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {

  set_prop_config(state, payload) {
    state.prop_config = payload;
  },

}