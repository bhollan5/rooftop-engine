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

/* Setting up our state variables: */
export const state = () => ({

  /* Properties: */
  name: '',
  id: '', 

  /* Link to the root, containing paths to all elements: */
  root_element: null,

  /* Route properties: */
  context: '',          // view | edit | etc. 
  type: '',             // An id for an entity prototype
  page_id: '',          // An id for a specific entity
  focus_element: '',    // A path to whatever element is currently selected
  
})


//
// Getters, used to return our state in specific ways. Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)

export const getters = {
  context(state) { return state.context; },
  type(state) {return state.type; },
  page_id(state) { return state.page_id; },
  focus_element(state) {return state.focus_element; },
}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {

  // Payload should be a route array, of four strings:
  // [context, prototype_id, doc_id, el_path]
  load_route({commit, dispatch}, payload) {

    let _context = payload[0];
    let prototype_id = payload[1];
    let doc_id = payload[2];
    let _el_path = payload[3];

    dispatch('db/read_doc', {
      prototype_id: prototype_id,
      doc_id: doc_id,
    }, { root: true })
    

    commit('set_context', payload[0]);
    commit('set_type', payload[1]);
    commit('set_page_id', payload[2]);
    commit('set_focus_element', payload[3]);
  },



}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {

  set_context(state, payload) {
    state.context = payload;
  },
  set_type(state, payload) {
    state.type = payload;
  },
  set_page_id(state, payload) {
    state.page_id = payload;
  },
  set_focus_element(state, payload) {
    state.focus_element = payload;
  },



  load_element(state, payload) {
    state.elements.push(payload);
  },

  add_element(state, payload) {
    state.elements.push(payload);
  },

}