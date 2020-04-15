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
  body_widgets: [],
  // Side bar widgets:
  side_bar_widgets: [],
  
})



//
// Getters, used to return our state in specific ways.
//      Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
//

export const getters = {

  // Gets the body widgets
  body_widgets(state) {
    return state.body_widgets;
  },

  body_widget: (state) => (widget_index) => {
    return state.body_widgets[widget_index];
  },

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {

  // Reading a document from the database, & loading in the local copy. 
  //  Takes a collection string and a query object.
  read_doc({commit}, payload) {

    // setting these variables just for clearer names
    let collection_name = payload.collection_name;
    let query = payload.query;
    this.$console.log("page", " 🗣 Called to read a " + collection_name);
    this.$console.log("page", query);

    // Getting the api route -
    //   Ex: if collection_name is 'project', this will get '/api/read-projects'
    let api_url = '/api/read-' + collection_name + 's';

    // Making the async database call, with our query. 
    return axios.get(api_url, { params: query })
    .then((response) => {

      if (response.data.length == 1) {
        let page = response.data[0];
        console.log(" 📦 Loaded a page from " + collection_name + "!");
        
        // Copying the body data locally:
        if (page.body_data){
          page.body_data.forEach((widget, index) => {
            commit('load_body_widget', {
              widget: widget,
              index: index
            });
          });
        }
        return page;

      // If our query loaded more than one page, that's no good:
      } else if (response.data.length > 1) {
        console.warn("Attempted to load more than one page:")
        this.$console.log("page", " Attempted to load more than one page!")
      // If we didn't find a page:
      } else {
        this.$console.log("projects", " ⛔️ No projects loaded.")
      }
      this.$console.log("projects", response.data);
      
    }, (error) => {
      console.warn(error);
    });

  },


  // Updating a doc by id in the DB. // TODO
  update_doc({commit}, payload) {
    return;
    console.log(" 🗣 Calling the API to update project %c" +  payload._id, "color:magenta;")
    console.log(payload)
    // Getting the article from the database.
    return axios.post("/api/update-project", {
      _id: payload._id,
      update: payload.update
    }).then((response) => {
      console.log(" 🖌 Updated the project %c" +  payload._id, "color:magenta;");
    }).catch ((error) => {
      console.warn(error);
    });

  },

}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {
  
  // Adding or updating a body widget, with an index num and widget obj.
  load_body_widget(state, payload) {

    // shorter var names:
    let index = payload.index;
    let widget = payload.widget;

    // If the widget's index is in the array, we update it:
    if (index < state.body_widgets.length) {
      state.body_widgets[index] = widget;
    } 
    // if the widget's index is equal to the length, we add it:
    else if (index == state.body_widgets.length) {
      state.body_widgets.push(widget);
    }
  },

  add_body_widget(state, payload) {
    state.body_widgets.push(payload);
  }

}