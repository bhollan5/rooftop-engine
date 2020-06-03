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

import * as object_dictionary from '~/modules/globals.js';

// Setting up our state variables:
export const state = () => ({
  
  system: [],
  data: [],
  files: [],

  
  meta: [{
    base: 'meta',
    category: 'vocab',
    word: 'vocab',
    structure: {
      base: 'string', //
    }
  }],
  
})



//
// Getters, used to return our state in specific ways.
//      Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
//

export const getters = {
  meta(state, payload) {
    let meta_object
  }
}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {

  /*     Creates a new obj instance.     
  
  */
  new({commit, dispatch}, payload) {

    let prototype_id = payload.prototype_id;
    let doc_id = payload.doc_id;
    
    return axios.get("/api/read_doc", { 
      params: {
        prototype_id: prototype_id,
        doc_id: doc_id
      }
    })
    .then((response) => {
      if (response.data.length) {
        console.log(" ⎔ ⇢ Queried your doc!");
        console.log(response.data);
        
        // for (let i in response.data) {
        //   commit('set_user', response.data[i]);
        // }

      } else {
        console.log(" ⛔️ No users loaded.")
      }
      
    }, (error) => {
      console.warn(error);
    });

  },


}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {
  
  // Adding or updating word in the vocabs array.
  load_vocab(state, payload) {
    let word_found = false;
    state.vocab.forEach((word, word_i, vocab) => { 

      if (payload.id == word.id) {
        vocab[word_i] = payload;
        word_found = true;
      }
    })
    if (!word_found){
      state.vocab.push(payload);
    }
  },
}