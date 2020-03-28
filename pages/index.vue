<!-- The website's landing page. -->
<template>
  <div class="container">

    <!-- The "landing promo" is the banner spread at the top of the landing page. -->
    <div id="landing-promo">
      <space-canvas></space-canvas>
    </div>

    <!-- -->
    <div id="media-suggestions"
      :style="{background: $store.state.bg}">

    </div>
    
  </div>
</template>

<script>
import spaceCanvas from '@/components/space_canvas/space-canvas.vue';

export default {
  components: {
    spaceCanvas
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
  height: 90vh;
  background: #4E5264;
}

#media-suggestions {
  width: 100%;
  min-height: 500px;
  box-shadow: var(--box-shading);
}
</style>
