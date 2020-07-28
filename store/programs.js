/*

                ❖  Programs  ❖
    
          Contains running programs, 
                program data, & 
             program instructions.

                                            */



/*    The state stores lists of data    */
export const state = () => ({
  input: [
    
  ],

  dictionary: [
    ["keydown[_s_]", "$input = $input + _s_"],
  ],
  storage: [
    
  ],

  display: [
    ""
  ],

})


/*    */
export const getters = {
  input(state) {
    return state.input;
  },
  dictionary(state) {
    return state.dictionary;
  },
  storage(state) {
    return state.storage;
  },
  output(state) {
    return state.output;
  },
  
  interpret: (state) => (input_text) => {
    // Storing arguments:
    let args = [''];

    // Iterating thru the characters.
    for (let i = 0; i < input_text.length; i++) {
      let _char = input_text[i];
      
      // if _char is NOT our character:
      if (_char != '_') {
        args[args.length - 1] += _char;

      // if _char IS a special character:
      } else {
        if (args[args.length - 1] == '') {
          args[args.length - 1] = _char;
        } else {
          args.push(_char);
        }
        args.push('');
      }
    }
    return args;
  },

  // display(state) {
  //   return 0;
  //   return state.memory.filter(el => {
  //     return (el[0] == '<' && el[1] != '$')
  //   })
  // }
}


/*    */
export const actions = {

  //
  input({commit, getters}, payload) {
    let command = payload;

    let interpretation = getters['interpret'](command);

    commit('input', 'i: ' + command);
    commit('input', 'o: ' + interpretation);
  },



  /* Parse a line */
  run_line({commit, getters, dispatch}, payload) {
    return;
    // Getting the line & production rules. 
    let line = getters['line'](payload);
    let production_symbols = ['$', '>', '<', ':'];
    if (!line) {
      return;
    }

    // We're parsing this for arguments, which we'll store here.
    let args = [''];

    // Iterating thru the characters.
    for (let i = 0; i < line.length; i++) {
      let _char = line[i];
      
      // if _char is NOT a special character:
      if (production_symbols.indexOf(_char) == -1) {
        args[args.length - 1] += _char;

      // if _char IS a special character:
      } else {
        if (args[args.length - 1] == '') {
          args[args.length - 1] = _char;
        } else {
          args.push(_char);
        }
        args.push('');
      }
    }
    // Adding to memory
    commit('add_to_memory', args);
    // Run the next line
  },

  

}

/*    */
export const mutations = {

  add_to_memory(state, payload) {
    state.memory.push(payload);
  },

  input(state, payload) {
    state.input.push(payload);
  },








  write_to_memory(state, payload) {

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