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

  // This has data for the locally rendered page! 
  //    This is NOT in sync with any database. 

  // Body widgets:
  body_data: [],
  
})



//
// Getters, used to return our state in specific ways.
//      Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
//

export const getters = {

  // Gets all body widgets:
  body_data(state) {
    return state.body_data;
  },

  // Gets a body widget by index:
  body_widget: (state) => (widget_index) => {
    return state.body_data[widget_index];
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

  clear_body_data(state, payload) {
    state.body_data = [];
  },
  
  // Adding or updating a body widget, with an index num and widget obj.
  set_body_widget(state, payload) {

    // shorter var names:
    let index = payload.index;
    let widget_update = payload.widget;

    // If the widget's index is in the array, we update it, leaving unmentioned fields alone:
    if (index < state.body_data.length) {
      for (let key in widget_update) {
        if (widget_update.hasOwnProperty(key)) {
          Vue.set(state.body_data[index], key, widget_update[key])
        }
      }
    } 
    // if the widget's index is equal to the length, we add it:
    else if (index == state.body_data.length) {
      state.body_data.push(widget_update);
    }
  },

  add_body_widget(state, payload) {
    state.body_data.push(payload);
  },

  load_page_data(state, payload) {
    state.page_data.owner = payload.owner;
    state.page_data.id = payload._id;
  }

}