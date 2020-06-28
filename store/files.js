/*

                 ❖  Files  ❖
          Local file storage, retrieval,
                & organization.

                                            */



/*    The files's state:     */
export const state = () => ({

  files: [
    // kernel files:
    { 
      filetype: 'program', 
      is: [], 
      id: 'bridge', name: 'The Bridge',
      is_abstract: false, 

      input: [  ],    // Event listeners 
      process: [  ],  // CPU actions
      state: [  ],    // Program memory
      output: [  ],   // display
    },

    // Some sample files, to get us started!
    { 
      filetype: 'element',
      id: 'box', name: 'Box',
      is_abstract: true,

      input: [ 'style', 'tag' ],              // Prop definition
      process: [  ],                          // 
      state: [ 'box-style.style', 'div' ],    // 
      output: [  ],                           // 
    },
    { 
      filetype: 'style',
      id: 'box-style', name: 'Box Style',
      is_abstract: true,

      data: [ 'height', 'width', 'background' ],
      contents: [ 'height:55px', 'width:55px', 'background:yellow' ],
      input: [],
      output: [],
    },
    { 
      filetype: 'program',
      id: 'dustzone', name: 'The Dustzone',
      is_abstract: true,

      data: [ 'box.object', 'box-style.style', 'material.style' ],
      contents: [ 'box.object' ],
      input: [],
      output: [],
    },
    
  ],

})


/*    */
export const getters = {

  // The only query getter we need!! (Returns an array)
  query: (state) => (query_obj) => {
    let results = [];

    // Iterate through every element in that collection
    for (let i in state.files) {
      let _file = state.files[i];

      // Iterate through each field in our query_obj
      for (let field in query_obj) {
        if (_file[field] && _file[field] == query_obj[field]) {
          results.push(_file)
        }
      }
    }
    return results;
  },

  // Pass any filename, and we'll parse it n give you that file. 
  by_name: (state, getters) => (filename) => {
    let _parts = filename.split('.');
    let id = _parts.shift();
    let filetype = _parts.shift();
    return getters['query']({
      filetye: filetype, id: id
    })
  },

}


/*    */
export const actions = {

  /* Runs a command based on a string */
  run({commit}, payload) {

    // Breaking up the command by what's in quotes, to capture strings
    let quote_separated = payload.split(esc_char || '"');
    let args = [];

    // This loops thru non-quoted strings, i think
    for (let i = 0; i < quote_separated.length; i += 2) {
      let space_separated = quote_separated[i].split(' ');
      for (let i in space_separated) {
        if (space_separated[i]) { args.push(space_separated[i]) }
      }
    }
    // And we can add quoted strings here.
    for (let i = 1; i < quote_separated.length; i += 2) {
      if (quote_separated[i]) { args.push(quote_separated[i]) }
    }
    let command_id = args.shift();

    /*  // Replacing references. todo: abstract, probably.
    for (let i in args) {
      if (args[i][0] == '@') {
        args[i] = this.read(args[i].substring(1));
      }
    }*/
    
    this[command_id](args[0], args[1]);

  },

  // Input: A new data entity with an id
  write({commit}, payload) {
    commit('write_to_memory', payload);
  },

  // Input: A path to an entity in memory
  read({commit}, payload) {

  },

  

}

/*    */
export const mutations = {

  write_to_memory(state, payload) {
    /* Update an object in memory by id.
              Payload: {
                id: string
                update: obj
              }                                 */

    // Seeing if the id exists already.
    let found = false;
    state.memory.forEach((item, index, memory) => {
      if (item.id == payload.id) {
        memory[index] = payload;
        found = true;
      }
    })

    // If the id doesn't exist, 
    if (!found) {
      state.memory.push(payload);
    }
  },

}