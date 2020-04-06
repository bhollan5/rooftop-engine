<template>
<div class="object"
  :style="cube_css"
  @mouseover="light_mod = 10"
  @mouseout="light_mod = 0">

  <div class="grab-point"></div>

  <div class="plane" :style="{
    transform: 
    'translatex(-' + data.width / 2 + 'px)' + 
    'translatey(-' + data.height / 2 + 'px)' +
    'translatez(' + data.depth / 2 + 'px)',
    opacity: data.opacity,
    background: 'hsl(' + color[0] + ','
       + color[1] + '%,'
       + (color[2] + 3 + light_mod) + '%)',
    height: data.height + 'px',
    width: data.width + 'px'}">
    <!-- Front -->
  </div>

  <div class="plane" :style="{
    transform: 
    'translatex(-' + data.width / 2 + 'px) ' +
    'translatey(-' + data.height / 2 + 'px)' +
    'translatez(-' + data.depth / 2 + 'px) ',
    opacity: data.opacity,
    background: 'hsl(' + color[0]
       + ',' + color[1]
       + '%,' + (color[2] - 3 + light_mod) + '%)',
    height: data.height + 'px',
    width: data.width + 'px' }">
    <!-- Back -->
  </div>

  <!-- TODO: there's a rendering problem when a cube's height is bigger than it's depth... -->
  <div class="plane" :style="{
    transform: 
    'translatex(-' + data.width / 2 + 'px) ' +
    'translatey(' + -((data.depth / 2) + (data.height / 2)) + 'px)' +
    'translatez(-' + 0 + 'px) ' + 'rotatex(90deg)',
    opacity: data.opacity,
    background: 'hsl(' + color[0] + ','
      + color[1] + '%,'
      + (color[2] - 5 + light_mod) + '%)',
    height: data.depth + 'px',
    width: data.width + 'px' }">
    <!-- top -->
  </div>

  <div class="plane" :style="{
    transform: 
    'translatex(-' + data.width / 2 + 'px) ' +
    'translatey(-' + ((data.depth / 2) - (data.height / 2)) + 'px)' +
    'translatez(-' + 0 + 'px) ' + 'rotatex(90deg)',
    opacity: data.opacity,
    background: 'hsl(' + color[0] + ','
      + color[1] + '%,'
      + (color[2] - 5 + light_mod) + '%)',
    height: data.depth + 'px',
    width: data.width + 'px' }">
    <!-- bottom -->
  </div>

  <div class="plane" :style="{
    transform: 
    'translatex(' + ((data.width / 2) - (data.depth / 2)) + 'px) ' +
    'translatey(-' + data.height / 2 + 'px)' +
    'translatez(-' + 0 + 'px) ' + 'rotatey(90deg)',
    opacity: data.opacity,
    background: 'hsl(' + color[0]
       + ',' + color[1]
       + '%,' + (color[2] + 5 + light_mod) + '%)',
    height: data.height + 'px',
    width: data.depth + 'px' }">
    <!-- side 1 -->
  </div>

  <div class="plane" :style="{
    transform: 
    'translatex(' + (-(data.width / 2) - (data.depth / 2)) + 'px) ' +
    'translatey(-' + data.height / 2 + 'px)' +
    'translatez(-' + 0 + 'px) ' + 'rotatey(90deg)',
    opacity: data.opacity,
    background: 'hsl(' + color[0]
       + ',' + color[1]
       + '%,' + (color[2] + 5 + light_mod) + '%)',
    height: data.height + 'px',
    width: data.depth + 'px' }">
    <!-- side 1 -->
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      light_mod: 0, // For brightening the shapes on hover
    }
  },
  props: {

    data: {
      type: Object,
      required: true,
    },
    
  },
  computed: {
    cube_css() {
      // The string we'll return. 
      let css_string = '';

      // Transform information
      let transform_css = 'transform:';

      transform_css += ' translatex(' + this.data.x + 'px)';
      transform_css += ' translatey(' + this.data.y + 'px)';
      transform_css += ' translatez(' + this.data.z + 'px)';

      transform_css += ' rotatex(' + this.data.xRot + 'deg)';
      transform_css += ' rotatey(' + this.data.yRot + 'deg)';
      transform_css += ' rotatez(' + this.data.zRot + 'deg)';

      transform_css += ';';
      css_string += transform_css;

      return css_string;
    },
    // turning the string into an array corresponding to that key
    color() {
      if (typeof(this.data.color) != 'string') {
        return this.data.color;
      }
      return this.$store.getters['themes/color_styling'](this.data.color);
    }
  }
}
</script>

<style>
.plane {
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  color: black;
  opacity: 1;
}
.grab-point {
  width: 4px;
  height: 4px;
  background: red;
  border-radius: 50%;
}
</style>