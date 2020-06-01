/*

          ⇢ The Bridge ⇢
  This is like the mother program. 
  It boots when the website loads,
  stores session data, and manages
         component data.

  */



/*    The bridge's state:     */
export const state = () => ({
  memory: [],
  programs: [],
  instructions: [],
  vocab: [],
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

  // Input: A new data entity with an id
  write({commit}, payload) {
    commit('write_to_memory', payload);
  },

  // Input: A path to an entity in memory
  read({commit}, payload) {

  },

  // Input: An existing program id
  run({commit}, payload) {
    
  }

}

/*    */
export const mutations = {

  // Input: 
  write_to_memory(state, payload) {

    let found = false;
    state.memory.forEach((item, index, memory) => {
      if (item.id == payload.id) {
        memory[index] = payload;
        found = true;
      }
    })

    if (!found) {
      state.memory.push(payload);
    }

  },
}