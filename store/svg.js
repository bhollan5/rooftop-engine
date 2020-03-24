// Info about this layout: https://nuxtjs.org/guide/vuex-store/

import Vue from 'vue';

// Setting up our state variables:
export const state = () => ({
  svgEditorOpen: false,
  rawSvgData: {},
})



// Getters, used to return our state in specific ways.
// Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
export const getters = {
  svgEditorOpen(state) {
    return state.svgEditorOpen;
  },

  rawSvgData(state) {
    return state.rawSvgData;
  },



}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {
  
}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {
  toggleSvgEditor(state) {
    state.svgEditorOpen = !state.svgEditorOpen;
  },

  openEditor(state, payload) {
    state.svgEditorOpen = true;
    state.rawSvgData = payload;
  }

}