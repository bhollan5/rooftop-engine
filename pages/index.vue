<!-- This page is used as the frame for every other page. -->
<template>
  <div class="container" scoped>

    <!-- The "landing promo" is the banner spread at the top of the landing page. -->
    <div id="landing-promo">
      <placeholder-spread></placeholder-spread>
    </div>

    <!-- -->
    <div id="media-suggestions"
      :style="{background: $store.state.bg}">

    </div>
    
  </div>
</template>

<script>
import placeholderSpread from '@/components/landing_spreads/placeholder_spread.vue';

export default {
  components: {
    placeholderSpread
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
  width: 100%;
  min-height: 500px;
  box-shadow: var(--box-shading);
}
</style>
