<template>
<div class="program frame"
  :style="frame_style"
>
  

  <input v-model="text_input" 
    ref="listener"
    v-on:keyup.enter="user_input('enter')">

    {{pc}}

  <component v-if="0"
    v-for="component_ref in render_data"
    :key="component_ref"
    :is="memory[component_ref].type"
  ></component>

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
      memory: [],         // Private, local data for this program. 
      render_data: [],    // References to CPU or DB data
      listeners: [],      // References to instructions
      pc: 0,              // References the current instruction to execute. 

      /*        Planned:      */
      text_input: 'hello world!', 
      frame: [],          // Styles to the program's frame.

      
      // events: [],         // Input this program might recieve
      // methods: [],        // Sets of instructions that can be called w/ arguments
      
    }
  },

  /* Handles launching a program */
  mounted() {
    setInterval(this.execute, 100);

  },

  //
  watch: {
    
    text_input(new_val) {
      this.user_input('text_input', new_val);
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
    },

  },

  methods: {
    /* METHODS:
      run(string, esc_char)
      write(key, val)
      render(key)
      listen(command_str)
      read(key)
      create(key, value)
    */

    /*  ⏣ Called with a string input. */
    run(command_string, esc_char) {
      
    },

    execute() {
      this.pc++;
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

    user_input(key, value) {
      let command = '';
      for (let i in this.listeners) {
        if (this.listeners[i].key == key) {
          command = this.listeners[i].value;
        }
      }
      this.run(command + ' %' + value + '%', '%');
    },

    listen(key, command_string) {
      this.listeners.push({
        key: key, 
        value: command_string
      })
      this.input_listener = command_string;
    },

    enter() {
      this.run(this.enter_listener + ' %' + new_val + '%', '%');
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