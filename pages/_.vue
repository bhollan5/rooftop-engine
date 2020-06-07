<template>
<!-- 

  ☞  This is the user's Viewport. 
      |
      ├⇢ It represents our command center
      |     & viewport.
      |
      └⇢ The Bridge's data can be found in:
            store/bridge.js

-->
<div id="bridge">

  <program 
    :program="viewport.program_id"
    :instance="viewport.instance_id"
  />

</div>
</template>

<script>
export default {
  name: 'bridge', // like from star trek

  data() {
    return {
      // Getting the route array: 
      route: this.$route.params.pathMatch.split('/'),

    }
  },

  //
  computed: {
    viewport() {
      let viewport_route = this.$store.getters['cpu/viewport_route'];
      let path = viewport_route.split('/');
      return {
        program_id: path[0],
        instance_id: path[1]
      }
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
</style>