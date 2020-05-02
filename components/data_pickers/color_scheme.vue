<template>
<container :startDepth="5" >
  <div class="color-scheme padding">

    <div class="scheme-info">
      <div class="scheme-name b">{{scheme.name}}:</div>
      <div class="secondary">Dark Mode</div>
      <div class="secondary">Contrast</div>
    </div>

    <div class="scheme-color-container">
      <div class="bg-color flex-container">
        <color-thumbnail v-if="scheme.bg"
          v-for="(color, color_i) in scheme.bg[0].get_shades()" 
          :key="color_i" 
          :color="color"
        />
      </div>
      <div class="flex-container">
        <color-thumbnail v-if="scheme.text"
          v-for="(color, color_i) in scheme.text[0].get_shades()" 
          :key="color_i" 
          :color="color"
        />
      </div>
      <div class="flex-container">
        <color-thumbnail v-if="scheme.ill"
          v-for="(color, color_i) in scheme.ill[0].get_shades()" 
          :key="color_i" 
          :color="color"
        />
      </div>
    </div>
    
  </div>
</container>
</template>


<script>
import {ColorScheme} from '~/modules/globals';

export default {
  name: 'colorScheme',
  props: {
    scheme: {
      type: Object,
      default() {
        return new ColorScheme('dark');
      }
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>

.color-scheme {
  width: 200px;
  height: 80px;
  background: var(--card-light);
  display: flex;
  justify-content: space-between;
}

.scheme-color-container {
  background: var(--card-dark);
  width: 100px;
  height: 60px;
}

</style>