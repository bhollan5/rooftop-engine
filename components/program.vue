<template>
<div class="program frame"
  :style="frame_style"
>

  <input v-model="text_input">

  <component v-if="0"
    v-for="component_ref in render_data"
    :key="component_ref"
    :is="memory[component_ref].type"
  ></component>

  {{memory}}
  <p v-for="key in render_data">
    {{read(key)}}
  </p>
  


</div>
</template>

<script>

export default {
  name: 'program', 

  props: {
  },
  
  data() {
    return {


      /*        WORK/USED:      */
      memory: [],         // Local data for this process
      render_data: [],    // references to all objects that should be rendered
      input_listener: '', // Command run when users type. 

      /*        Planned:      */
      text_input: 'hello world!', 
      frame: [],          // Styles to the program's frame.

      
      events: [],         // Input this program might recieve
      instructions: [],   // Actions in reponse to input
      
    }
  },

  /* Handles launching a program */
  mounted() {
    this.run('create command_draft _');
    this.run('render command_draft')
    this.run('listen "write command_draft"');
  },

  watch: {
    text_input(new_val) {
      this.run(this.input_listener + ' %' + new_val + '%', '%');
    }
  },

  

  computed: {
    /* Combining the CSS elements */
    frame_style() {
      let frame_style = {}
      for (let ref in this.frame) {
        frame_style = {
          ...this.memory[ref].data,
          ...frame_style,
        };
      }
      return frame_style;
    }

  },

  methods: {
    /* METHODS:
      run(string)
      write(key,val)
      render(key)
      read(key)
      create()
    */

    /*  ⏣ Called with a string input. */
    run(command_string, esc_char) {
      // Breaking up the command by what's in quotes, to capture strings
      let quote_separated = command_string.split(esc_char || '"');
      let args = [];

      // This should give us non-quoted strings, i think
      for (let i = 0; i < quote_separated.length; i += 2) {
        let space_separated = quote_separated[i].split(' ');
        for (let i in space_separated) {
          if (space_separated[i]) { args.push(space_separated[i]) }
        }
      }
      // And we can add quoted strings here.
      for (let i = 1; i < quote_separated.length; i += 2) {
        args.push(quote_separated[i]);
      }
      let command_id = args.shift();
      this[command_id](args[0], args[1]);
    },

    // Updating a process variable. 
    write(key, value) {
      this.memory.forEach((item) => {
        if (item.key == key) {
          item.value = value;
        }
      });
    },

    /* render: */
    render(key) {
      this.render_data.push(key);
    },

    listen(command_string) {
      this.input_listener = command_string;
    },

    /*             Read:             */
    read(key, callback) {
      
      for (let i in this.memory) {
        if (this.memory[i].key == key) {
          return this.memory[i].value;
        }
      }
      return false;
    },


    /*             Create:                */
    /*   > Adds to local program data <   */
    /*                                    */
    create(key, value) {
      console.log(value);

      //  Simple validation 
      let key_taken = this.read(key);
      if (key_taken) {
        console.warn("Key " + key + " taken!")
      }

      //  Creating the data obj 
      let new_obj = {
        key: key,
        value: value,
      };

      this.memory.push(new_obj);
    },



    

    


  }

}

</script>

<style lang="scss">

</style>