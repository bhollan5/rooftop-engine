<template>
<!-- 

  ☞  This is the Kernel. It loads the page & launches programs.
      |
      ├⇢ This launches the Bridge program.
      └⇢ The kernel also handles routing.

-->
<div id="kernel">
  <el-renderer/>
  <div class="box">
    $
  </div>
  
</div>
</template>

<script>

export default {
  name: 'kernel', 

  data() {
    return {
      /* Getting the route array: */
      // sroute: this.$route.params.pathMatch.split('/'),
      command: 'hi',

      data: [
        "key:"
      ]

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
    parse_command() {
      console.log('REady to parse ' + this.command);
    }
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

.box {
  width: 200px;
  // height: 150px;
  background: rgba(0,0,0,.4);
  input {
    background: none;
    color: white;
    border: none;
  }
}
</style>