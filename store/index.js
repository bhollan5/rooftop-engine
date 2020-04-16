// Info about this layout: https://nuxtjs.org/guide/vuex-store/

import Vue from 'vue';

// Setting up our state variables:
export const state = () => ({
  alert: {
    type: 'danger',
    msg: '',
  }
})



// Getters, used to return our state in specific ways.
// Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
export const getters = {
  alert(state) {
    return state.alert;
  }

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {

  // Reading a document.
  //  Takes a 'document' string and a query object.
  read_doc({commit}, payload) {
    // setting these variables just for clearer names
    let collection_name = payload.collection;
    let query = payload.query;
    this.$console.log("projects", " 🗣 Called to read a " + collection_name);
    this.$console.log("projects", query);

    let api_url = '/api/read-' + collection_name;
    return axios.get(api_url, { params: query })
    .then((response) => {
      if (response.data.length) {

        let projects = response.data;
        console.log(" 📦 Loaded " + projects.length + " projects!");
        projects.forEach((project) => {
          commit('load_project', project);
        })
        return projects;

      } else {
        this.$console.log("projects", " ⛔️ No projects loaded.")
      }
      this.$console.log("projects", response.data);
      
    }, (error) => {
      console.warn(error);
    });

  },
}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {
  error(state, payload) {
    state.alert.msg = payload;
    state.alert.type = 'danger';
  }

}