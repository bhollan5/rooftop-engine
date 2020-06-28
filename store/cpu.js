/*

                  ⎈  CPU  ⎈
    
          Runs internal instructions - 
       program events, file manipulation, 
              page display, etc. 

                                                */



/*    The CPU state:     */
export const state = () => ({

  /* Indicates what program to display (via program id) */
  viewport: 'dustzone',
  // frame tools: could indicate a different process

})


/*    */
export const getters = {
  // Gets the route of the current viewport.
  viewport(state) {
    return state.viewport;
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