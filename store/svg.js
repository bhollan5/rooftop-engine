// This document doesn't interface w the DB or anything, it's just here to help SVG-uploader components
// talk to the svg-editor component 

// Info about this layout: https://nuxtjs.org/guide/vuex-store/

import Vue from 'vue';

// Setting up our state variables:
export const state = () => ({
  svg_editor_open: false,
  raw_svg_string: '',
  svg_json: {},
  element_tree: {
    key: 'svg',
    attributes: {},
    children: [],
  }
})



// Getters, used to return our state in specific ways.
// Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
export const getters = {
  svg_editor_open(state) {
    return state.svg_editor_open;
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

  element_tree(state) {
    return state.element_tree;
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
    state.svg_editor_open = false;
  },

  // Loads a string in, parses json, opens editor
  load_svg_from_string(state, payload) {
    // Opening the editor!
    state.svg_editor_open = true ;
    // Saving the raw string!
    state.raw_svg_string = payload;
    // Parsing the string to xml
    let parsed_xml = this.$svg.string_to_xml(payload);
    // Parsing THAT xml into JSON.
    let svg_json = this.$svg.xml_to_json(parsed_xml, "  ");
    state.svg_json = JSON.parse(svg_json);

    state.element_tree = this.$svg.get_node_elements(state.svg_json);
  },

  set_element_tree(state, payload) {

  },

  set_raw_svg_string(state, payload) {
    state.raw_svg_string = payload;
  }

}