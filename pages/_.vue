<template>
<!-- 

  ☞  This is the Kernel. It loads the page & launches programs.
      |
      ├⇢ This launches the Bridge program.
      └⇢ The kernel also handles routing.

-->
<div id="kernel">
  
  

</div>
</template>

<script>
export default {
  name: 'kernel', 

  data() {
    return {
      // Getting the route array: 
      route: this.$route.params.pathMatch.split('/'),

    }
  },

  //
  computed: {
    viewport() {
      return this.$store.getters['cpu/viewport'];
    },
  },

  mounted() {

    // this.$store.dispatch('bridge/write', {});
    
  },
  
  methods: {

  }

}
</script>

<style lang="scss" scoped>
#viewer {
  height: 100%;
  width: 100%;
}

#kernel-header {
  width: 100%;
  height: 50px;
  background: rgba(0,0,0,.5);
}
</style>