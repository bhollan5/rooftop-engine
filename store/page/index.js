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

  doc_data: {
    owner: '',
    id: '', 
  },

  manifest: {
    collection_name: '',
    doc_id: '',
    owner: '',
  },

  local_data: {
    editor_state: 'body-editor',   // Other states: 'view', 'svg-editor', 'space-canvas', 'custom'
  },

  
  
})



//
// Getters, used to return our state in specific ways.
//      Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
//

export const getters = {

  // Gets the page data
  doc_data(state) {
    return state.doc_data;
  },

  editor_state(state) {
    return state.local_data.editor_state;
  },

  // Gets the body widgets
  body_data(state) {
    return state.body_data;
  },

  // Gets the side bar widgets
  side_bar_data(state) {
    return state.side_bar_data;
  },

  body_widget: (state) => (widget_index) => {
    return state.body_data[widget_index];
  },

  widget_templates(state) {
    return state.widget_templates;
  }

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {

  // This function calls /db/read_[collection]s in the store
  // Then, it dispatches /copy_page_draft to snag a fresh, editable copy.
  read_page_doc({dispatch, commit}, payload) {

    commit('set_current_collection_name', payload.collection_name);
    commit('set_current_doc_id', payload.doc_id);

    // Ex: If payload.collection_name == 'user', the path is 'db/users/read_user'
    let action_name = 'db/' + payload.collection_name + 's/read_' + payload.collection_name;
    dispatch(action_name, payload.doc_id, {root: true})
    .then(() => {
      dispatch('update_page_draft', {
        collection_name: payload.collection_name,
        doc_id: payload.doc_id
      })
    })

  },

  // Payload: 
  //   collection_name: String
  //   doc_id: String 
  // 
  update_page_draft({rootGetters, dispatch, commit}, payload) {

    // Ex: If payload.collection_name == 'user', the path is 'db/users/get_user'
    let getter_name = 'db/' + payload.collection_name + 's/get_' + payload.collection_name;
    let doc = rootGetters[getter_name](payload.doc_id);

    // The body_data is an array of widgets defining the content of the page's body.
    let body_data = doc.body_data;
    dispatch('page/body/set_body_data', body_data, {root: true});

    // The doc_data grabs all the fields in the root of the document that are mutable
    let doc_data = {};
    let not_doc_data = ['body_data', 'static_data', 'salt', 'hash']
    for (let field in doc) {
      if (doc.hasOwnProperty(field)) {
        if (not_doc_data.indexOf(field) == -1) {
          doc_data[field] = doc[field];
        }
      }
    }
    commit('load_doc_data', doc_data);
    
  },




  // Updating a doc by id in the DB. // TODO
  update_doc({dispatch, commit}, payload) {
    let collection_name = payload.collection_name;
    let doc_id = payload.doc_id;
    let update_obj = payload.update;

    console.log(" 🗣 Calling the API to update doc %c" +  doc_id, "color:magenta;")
    console.log(update_obj)

    // ex: db/users/update_user
    let store_path = 'db/' + collection_name + 's/update_' + collection_name;

    dispatch(store_path, {
      _id: doc_id,
      update: update_obj,
    }, {root: true});

    return;
    // Getting the article from the database.
    return axios.post(api_url, {
      _id: doc_id,
      update: update_obj
    }).then((response) => {
      console.log(" 🖌 Updated the doc %c" +  doc_id, "color:magenta;");
    }).catch ((error) => {
      console.warn(error);
    });

  },

  // Takes an SVG string
  open_svg_editor({commit}, payload) {
    commit('change_editor_state', 'svg-editor');
  },

}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {

  set_current_collection_name(state, payload) {
    state.manifest.collection_name = payload;
  },
  set_current_doc_id(state, payload) {
    state.manifest.doc_id = payload;
  },

  change_editor_state(state, payload) {
    state.local_data.editor_state = payload;
  },

  // Deleting currently loaded page data:
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

  load_doc_data(state, payload) {
    for (let field in payload) {
      Vue.set(state.doc_data, field, payload[field])
    }
  },

  update_doc_data(state, payload) {

    // Update should just be an object w updated field
    let update = payload;

    for (let field in update) {
      if (update.hasOwnProperty(field)) {
        Vue.set(state.doc_data, field, update[field])
      }
    }
  }

}