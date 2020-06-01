<template>
<!-- 

  ☞  This is the Default Layout!
      |
      ├⇢ Represents the user's POV & controls. 
      |    The "subjective" POV. 
      |
      ├⇢ Displaying Rooftop Essentials:
      |   ├⇢ RT logo
      |   └⇢ Command line
      |
      └⇢ Also can display custom User elements

-->
<div id="page">
  <div id="the-header-bar">

  </div>
  <nuxt />
</div>
</template>

<script>

export default {
  name: 'subjective-perspective',

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
