<template>
<!-- 

  ☞  This file is the frame for pages/_.vue. 
      |
      ├⇢ Represents the user's POV & controls. 
      |
      └⇢ Loaded from store/cpu.

-->
<div id="page">
  <nuxt />
</div>
</template>

<script>

export default {
  name: 'yr-perspective',

  components: {
  },
  data() {
    return {
      show_compass: false,
    }
  },
  computed: {
    
  },
  
  mounted() {

  },

  watch: {
    
  },
  methods: {

  }
}
</script>

<style lang="scss">

// @import '@/styles/globals.scss';
#page {
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background: #011223;
  color: white;
}
html, body {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}

.flex {
  display: flex;
}

.space-between {
  justify-content: space-between;
}

#the-header-bar {
  height: 70px;
  position: absolute;
}

#header-bar-logo {
  margin-top: 10px;
  margin-left: 10px;
  height: 50px;
  --logo: pink;
}

</style>
