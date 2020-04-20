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

  widget_templates: [{
      name: 'header',
      icon: 'H1',
      bold: true,
      title: 'Page Header',
      description: 'The title of the page.',
      config: {
        component: 'text-field',
        fontsize: 'h1',
        bottom: 0,
      }
    }, {
      name: 'subheader',
      icon: 'sub',
      bold: true,
      title: 'Page Subheader',
      description: 'A subheader.',
      config: {
        component: 'text-field',
        fontsize: 'small',
        bottom: 10,
      }
    }, {
      name: 'section-title',
      icon: '1.',
      bold: true,
      title: 'Section Title',
      description: 'Describes bigger sections.',
      config: {
        component: 'text-field',
        fontsize: 'h2',
        bottom: 10,
      }
    }, {
      name: 'subsection-title',
      icon: '1.1.',
      bold: true,
      title: 'Subsection Title',
      description: 'Segments ideas.',
      config: {
        component: 'text-field',
        fontsize: 'h3',
        bottom: 10,
      }
    }, {
      name: 'paragraph',
      icon: 'Aa',
      bold: true,
      title: 'Paragraph',
      description: 'For writing text.',
      config: {
        component: 'text-field',
        fontsize: 'regular',
        bottom: 10,
      }
    }, {
      name: 'line-break',
      icon: '___',
      bold: true,
      title: 'Line Break',
      description: 'Break it up!',
      config: {
        component: 'hr',
        bottom: 10,
      }
    }, {
      name: 'article',
      icon: 'art',
      bold: true,
      title: 'Article',
      description: 'A link to an article.',
      config: {
        component: 'article-card',
        _id: 'new',
        bottom: 10,
      }
    }, {
      name: 'image',
      icon: 'image-icon',
      bold: false,
      title: 'Image',
      description: 'Add an image!'
    }, {
      name: 'collection',
      icon: 'col',
      bold: false,
      title: 'Collection',
      description: 'A collection of documents.'
    },
  ],
  

  // Body widgets:
  body_data: [],
  // Side bar widgets:
  side_bar_data: [],

  page_data: {
    owner: '',
    id: '', 
  },

  manifest: {
    collection: '',
    doc_id: '',
    owner: '',
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
  page_data(state) {
    return state.page_data;
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


  // Takes a collection_name and doc_id
  read_page({commit, rootGetters}, payload) {
    
    // Ex: If payload.collection_name == 'project', the path is 'db/projects/project_query'
    let page_path = 'db/' + payload.collection_name + 's/' + payload.collection_name + '_query';
    let page_query = rootGetters[page_path]({ _id: payload.doc_id });
    let loaded_page = page_query[0];
    console.log(loaded_page);

    // Loading in the name, id, owner, etc
    commit('load_page_data', loaded_page);

    // Copying the body data locally:
    if (loaded_page.body_data){
      commit('clear_body_data');
      loaded_page.body_data.forEach((widget, index) => {
        commit('set_body_widget', {
          widget: widget,
          index: index
        });
      });
    }

  },


  // Updating a doc by id in the DB. // TODO
  update_doc({commit}, payload) {
    let collection_name = payload.collection_name;
    let doc_id = payload.doc_id;
    let update_obj = payload.update;

    console.log(" 🗣 Calling the API to update doc %c" +  doc_id, "color:magenta;")
    console.log(update_obj)

    // Getting the api route -
    //   Ex: if collection_name is 'project', this will get '/api/read-projects'
    let api_url = '/api/update-' + collection_name;

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