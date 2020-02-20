<!-- This page is used as the frame for every other page. -->
<template>
  <div class="container" scoped>

    <!-- The "landing promo" is the banner spread at the top of the landing page. -->
    <div id="landing-promo">

    </div>

    <!-- -->
    <div id="media-suggestions">
    
    </div>
    
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss">
#landing-promo {
  width: 100%;
  height: 60vh;
  background: #4E5264;
}

#media-suggestions {
  background: var(--bg);
  width: 100%;
  min-height: 500px;
  box-shadow: var(--box-shading);
}
</style>
