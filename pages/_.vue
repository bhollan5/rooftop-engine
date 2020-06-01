<template>
<!-- 

  ☞  This is the Bridge!
      |
      ├⇢ It represents our command center
      |     & viewport.
      |
      └⇢ The Bridge's data can be found in:
            store/bridge.js

-->
<div id="bridge">
  <program id="p"/>
  {{memory}}
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
  
  computed: {
    programs() {
      return 1; //this.$store.getters['bridge/']
    },
    memory() {
      return this.$store.getters['bridge/memory']
    }
  },

  // Bridge kernel. 
  mounted() {
    console.log(this.route);

    this.call_store('bridge/write', {});


  },
  
  methods: {
    /* Calling store processes. */
    call_store(action_path, payload) {
      this.$store.dispatch('logic/run', {
        path: action_path, 
        value: payload
      });
    },

  }

}
</script>

<style lang="scss" scoped>
#viewer {
  height: 100%;
  width: 100%;
}
</style>