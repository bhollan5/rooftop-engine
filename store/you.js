/*

                ❖  The CPU  ❖
    This is like the frontend's command center. 
    It runs all commands that interact with the
      currently displayed or manipulated data. 

                                                  */



/*    The bridge's state:     */
export const state = () => ({
  memory: [],       // Local files
  programs: [],     // Program objects
  instructions: [], // Strings, waiting to be executed. 

  timer: 0,
})


/*    */
export const getters = {
  programs(state) {
    
  },

  memory(state) {
    return state.memory;
  },

  // 
  memory_query: (state) => (query_obj) => {
    return state.memory.filter( (item) => {
      return (item.id == query_obj.id);
    });
  },
}


/*    */
export const actions = {

  /* Runs a command based on a string 
       in the format of:  "action_id arg1 arg2 ..." */
  run({commit}, payload) {

    let command_string = payload;
    let command_args = command_string.split(' ');
    let command_id = command_args.shift();

  },

  // Payload: {
  // $d = $s + $t 
  // }
  add({commit}, payload) {
    
  },

  /* start cli mycli */
  start({commit}, payload) {
    commit('start_process', {
      type: payload[0],
      name: payload[1],
    });
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

  write_to_process(state, payload) {

    if (item.id == payload.id) {
      memory[index] = payload;
      found = true;
    }
  }
  

}