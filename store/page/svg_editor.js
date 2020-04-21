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

  svg_string: '',
  
  // This is an array indicating a path to our node in the tree:
  selected_layer_path: [],
  
})



//
// Getters, used to return our state in specific ways.
//      Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
//

export const getters = {

  xml_doc(state) {
    let parser = new DOMParser();
    let xml_doc = parser.parseFromString(state.svg_string, "text/xml");
    return xml_doc;
  },

  xml_node: (state) => (path) => {

    let parser = new DOMParser();
    let xml_doc = parser.parseFromString(state.svg_string, "text/xml");

    if (!path.length) {
      return xml_doc.documentElement;
    }

    let node_pointer = xml_doc;
    for (let i in path) {
      node_pointer = node_pointer.childNodes[path[i]];
    }
    return node_pointer;
  },

  // Returns the path to the currently selected node
  selected_layer_path(state) {
    return state.selected_layer_path;
  },

  // Returns the currently selected node
  selected_layer(state) {
    let parser = new DOMParser();
    let xml_doc = parser.parseFromString(state.svg_string, "text/xml");

    if (!state.selected_layer_path.length) {
      return xml_doc.documentElement;
    }
    let node_pointer = xml_doc;
    for (let i in state.selected_layer_path) {
      let path_index = state.selected_layer_path[i];
      node_pointer = node_pointer.childNodes[path_index];
    }
    return node_pointer;
  },

  // This gets the current draft of the string
  svg_string(state) {
    return state.svg_string;
  },

  // This edits the SVG string to show things like the selected layer
  edit_svg_string(state) {
    console.log("Called to update draft");

    let parser = new DOMParser();
    let xml_doc = parser.parseFromString(state.svg_string, "text/xml");

    let selected = xml_doc;
    for (let i in state.selected_layer_path) {
      let path_index = state.selected_layer_path[i];
      selected = selected.childNodes[path_index];
    }

    if (selected.attributes){
      let node_style = selected.getAttribute('style');
      if (!node_style) {
        node_style = "";
      }
      node_style += 'outline: dashed 2px white;';
      selected.setAttribute('style', node_style)
    }

    let serializer = new XMLSerializer();
    let str = serializer.serializeToString(xml_doc);

    return str;
  },

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {

  load_svg({ commit }, payload) {
    commit('load_svg_string', payload);
    commit('page/change_editor_state', 'svg-editor', {root: true});
  },

}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {

  // Loading a new string into the store:
  load_svg_string(state, payload) {
    state.svg_string = payload;
  },

  select_layer(state, payload) {
    state.selected_layer_path = payload;
  },

  // Updating the attributes of a layer:
  update_node(state, payload) {

    let parser = new DOMParser();
    let xml_doc = parser.parseFromString(state.svg_string, "text/xml");
    
    let path = payload.path;
    let field = payload.field;
    let value = payload.value;

    let node_pointer = xml_doc;

    for (let i in path) {
      node_pointer = node_pointer.childNodes[path[i]];
    }
    node_pointer.setAttribute(field, value);

    let serializer = new XMLSerializer();
    let str = serializer.serializeToString(xml_doc);
    state.svg_string = str;
  },
}