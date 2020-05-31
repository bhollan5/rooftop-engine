
// For database calls:
import axios from 'axios';


/*
  ====  ⍿ Action: ⍿ ====
  =======  Load  ======

  Input:
    [collection_id, doc_id]

  Action:
    Loads the doc from the DB, stores it in the store. 

*/
  

export const actions = {

  default({commit, dispatch}, payload) {

    let collection_id = payload[0];
    let doc_id = payload[1];

    // Checking if the collection is valid:
    if (['actions', 'display', 'objects', 'systems', 'vocab'].indexOf(collection_id) == -1) {
      console.warn("this collection_id don't fit: " + collection_id);
      return;
    }

    console.log(" %c⍀ local/actions/load - %cAxios call:  %c /read-" + collection_id 
                    + "%c, \ndoc_id: %c" + doc_id,
      "color: #70FFFF",
      "color: white",
      "color: #EAD686",
      "color: white",
      "color: #C3A2FF",
    );

    axios.get('/api/read-' + collection_id, { 
        params: { id: doc_id } 
      }).then((response) => {
      console.log("Response from api:")
      console.log(response);
      commit('server/load_vocab', response.data, {root: true});
    })

  },


}
