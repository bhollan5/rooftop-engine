/*

                 ❖  Files  ❖
    
          Local file storage, retrieval,
                & organization.

                                            */



/*    The files's state:     */
export const state = () => ({

  /*  Objects represent renderable components.  */
  objects: [
    { 
      id: 'box', name: 'Box',

      base: 'object', 
      is_abstract: true,  // Indicates that this file should be copied when rendered or changed.

      subordinates: [],
  
      style: [ 'box-size', 'material' ],
    },
  ],

  /*  This is a list of CSS objects.  */
  style: [
    {
      id: 'box-size', name: 'Box Size',
      data: {
        width: '55px',
        height: '55px',
      }
    },
    {
      id: 'material', name: 'Material',
      data: {
        background: 'pink',
      }
    }
  ],

  /*  A list of program launch/config files  */
  programs: [
    // Default program. Hardcoded to illustrate program structure. 
    { 
      program_id: 'world', program_name: 'World',
      instance_id: 'dustzone', instance_name: 'The Dustzone',
  
      status: 1,   // 0 = dead, 1 = idle, 2 = running, 3 = paused,
      instructions: [],
  
      objects: [ 'box' ],
      data: [ 'box-size', 'material' ],
  
      display: [ 'box' ]
    },
  ],

  /*  */
  processes: [
    {
      id: 'start', 
    }
  ]

})


/*    */
export const getters = {

  // The only query getter we need!! (Returns an array)
  //   collection: 'objects' | 'styles' | 'programs' | 'processes'
  query: (state) => (collection_name, query_obj) => {
    let results = [];

    // Iterate through every element in that collection
    for (let index in state[collection_name]) {
      let data_to_check = state[collection_name][index];

      // Iterate through each field in our query_obj
      for (let field in query_obj) {
        if (data_to_check[field] && data_to_check[field] == query_obj[field]) {
          results.push(data_to_check)
        }
      }
      
    }
    return results;
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