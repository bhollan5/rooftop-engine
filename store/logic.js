/*

          ✹ Actions ✹
   This is the site's logic
   board. Available actions
    are categorized here. 

  */



export const state = () => ({
  vocab: []
})


/*    */
export const getters = {
  programs(state) {
    return state.programs;
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

  // Payload - 
  //  value: A new data entity with an id
  //  destination: A DB destination
  save({commit}, payload) {

  },

  // Input: A path to an entity in memory
  load({commit}, payload) {

  },

  /* actions/run -
  //  payload: {
        action_path: String,
        value: Object
      }                           */
  run({commit, dispatch}, payload) {
    dispatch(payload.path, 
      payload.value,
      {root: true,}
    )
  },

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