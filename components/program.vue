<template>
<div class="program">
  <component v-for=""
</div>
</template>

<script>

export default {
  name: 'program', 
  
  data() {
    return {

      data: [],         // data

      elements: [],     // references to child objects & subprograms

      instructions: [], // a stack of methods to be called
      
    }
  },

  props: {

  },

  computed: {
    methods() {
      // Gets a list of available methods
    },

    /*elements() {

    },     // references to child objects & subprograms
    */
  },

  methods: {
    
  }

}

</script>

<style lang="scss">

</style>