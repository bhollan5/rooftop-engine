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

  <program id="p"/>

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