<!-- The website's landing page. -->
<template>
  <div class="content">

    <!-- The "landing promo" is the banner spread at the top of the landing page. -->
    <div class="full-page">
      <space-canvas></space-canvas>

      <!-- -->
      
    </div>
  </div>
</template>

<script>
import spaceCanvas from '@/components/widgets/space_canvas/space-canvas.vue';

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
  position: relative;
}

#media-suggestions {
  width: 100%;
  min-height: 500px;
  box-shadow: var(--box-shading);
}
</style>
