<template>
  <div class="container" scoped>

    <!-- The "non-fic promo" is the banner spread at the top of the landing page. -->
    <div id="non-fic-promo" @click="getArticles()">
    </div>

    <!-- -->
    <div id="media-suggestions" 
      :style="{background: $store.state.bg}">
      Articles: {{articles}}
    </div>
    
  </div>
</template>

<script>
import placeholderSpread from '@/components/landing_spreads/placeholder_spread.vue';

// For api call:
import axios from 'axios';

export default {
  name: 'non-fic',
  components: {
    placeholderSpread
  },
  data() {
    return {
      
    }
  },

  computed: {
    articles() { 
      return this.$store.getters.articles;
    }
  },

  mounted() {
    
  },

  methods: {
    getArticles() {
      this.$store.dispatch("getArticles")
    }
  }
}
</script>

<style lang="scss">
#non-fic-promo {
  width: 100%;
  height: 60vh;
  background: #4E5264;
}

#media-suggestions {
  width: 100%;
  min-height: 500px;
  box-shadow: var(--box-shading);
  color: var(--bg-text);
}
</style>
