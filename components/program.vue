<template>
<div class="program frame"
  :style="frame_style"
>
  hi
  <component 
    v-for="component_ref in render"
    :key="component_ref"
    :is="memory[component_ref].type"
  ></component>

</div>
</template>

<script>

export default {
  name: 'program', 

  props: {
  },
  
  data() {
    return {

      status: 1,

      vocab: [],          // Symbols this program knows
      memory: [],         // Local data for this process

      frame: [],          // Applies frame styles to a div via a computed function.
      render: [],         // references to all objects that should be rendered
      
      events: [],         // Input this program might recieve
      instructions: [],   // Actions in reponse to input
      
    }
  },

  /* Handles launching a program */
  mounted() {

    this.call_method('create', 'frame/flex-box', {
      data: {
        display: 'flex',
        border: 'solid 2px pink',
        
      },
      id: 1
    });


    // this.$store.dispatch('actions/')
    this.call_method('create', 'object/box', {
      id: 1,
      display: [2],
    });

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

    /* */
    call_method(method_id, arg1, arg2, arg3, arg4) {
      this[method_id](arg1, arg2, arg3, arg4);
    },

    /* Calling store processes. */
    call_process() {

    },

    /*             Create:                */
    /*   > Adds to local program data <   */
    /*                                    */
    create(object_path, value) {

      // Interpreting the route:
      let segmented_path = object_path.split('/');
      let base = segmented_path.shift();
      let type = segmented_path.shift();
      let id = segmented_path.shift();

      //  Simple validation 
      let id_taken = this.query({id: id}).length > 1;
      if (id_taken) {
        console.warn("Id " + id + " taken!")
      }

      //  Creating the data obj 
      let new_obj = {
        base: base,
        type: type,
        value: value,
        id: id || this.memory.length + 1,
      };

      this.memory.push(new_obj);
    },


    /*             Update:                */
    /*   > Adds to local program data <   */
    /*                                    */
    update(id, field, value) {
      
    },
    

    /*             Query:             */
    /*       In: A query object,      */
    /*    Result: Output all matches. */
    query(query_obj, callback) {
      return this.memory.filter( (item) => {
        return (item.id == query_obj.id);
      });
    },

    


  }

}

</script>

<style lang="scss">

</style>