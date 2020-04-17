// This document doesn't interface w the DB or anything, it's just here to help SVG-uploader components
// talk to the svg-editor component 

// Info about this layout: https://nuxtjs.org/guide/vuex-store/

import Vue from 'vue';

// Setting up our state variables:
export const state = () => ({
  svgEditorOpen: false,
  raw_svg_string: '',
  svg_json: {},
})



// Getters, used to return our state in specific ways.
// Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
export const getters = {
  svgEditorOpen(state) {
    return state.svgEditorOpen;
  },

  raw_svg_string(state) {
    return state.raw_svg_string;
  },

  svg_string(state) {
    return state.raw_svg_string;
  },

  svg_json(state) {
    return state.svg_json;
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
  closeEditor(state) {
    state.svgEditorOpen = false;
  },

  // Loads a string in, parses json, opens editor
  load_svg_from_string(state, payload) {
    // Opening the editor!
    state.svgEditorOpen = true ;
    // Saving the raw string!
    state.raw_svg_string = payload;
    // Parsing the string to xml
    let parsed_xml = this.$svg.string_to_xml(payload);
    // Parsing THAT xml into JSON.
    let svg_json = this.$svg.xml_to_json(parsed_xml, "  ");
    state.svg_json = JSON.parse(svg_json);
  },

  set_raw_svg_string(state, payload) {
    state.raw_svg_string = payload;
  }

}