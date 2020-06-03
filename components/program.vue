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

      text_input: 'output "hello world!"', 
      frame: [],          // Styles to the program's frame.


      memory: [],         // Local data for this process

      render_data: [],         // references to all objects that should be rendered
      
      events: [],         // Input this program might recieve
      instructions: [],   // Actions in reponse to input
      
    }
  },

  /* Handles launching a program */
  mounted() {
    this.run('create command_draft _');
    this.run('render command_draft')

  },

  watch: {
    text_input(new_val) {

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

    /*  ⏣ Called with a string input. */
    run(command_string) {
      let command_args = command_string.split(' ');
      let command_id = command_args.shift();
      this[command_id](command_args[0], command_args[1]);
    },

    set(key, value) {

    },

    // Updating or adding a process variable. 
    write(key, value) {
      let was_updated = false;
      this.memory.forEach((item) => {
        if (item.id == key) {
          item.value = value;
          was_updated = true;
        }
      });
      return was_updated;
    },


    /* render: */
    render(key) {
      this.render_data.push(key);
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


    /*             Update:                */
    /*   > Adds to local program data <   */
    /*                                    */
    update(id, field, value) {
      
    },
    

    

    


  }

}

</script>

<style lang="scss">

</style>