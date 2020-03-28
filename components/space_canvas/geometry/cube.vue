<template>
<div class="object"
  :style="css_string">

  <div class="plane" :style="{
    transform: 'translatez(' + data.width / 2 + 'px)',
    background: 'hsl(' + data.color[0] + ',' + data.color[1] + '%,' + (data.color[2] + 5) + '%)'}">
    <!-- Front -->
  </div>

  <div class="plane" :style="{
    transform: 'translatez(-' + data.width / 2 + 'px)',
    background: 'hsl(' + data.color[0] + ',' + data.color[1] + '%,' + (data.color[2] - 5) + '%)' }">
    <!-- Back -->
  </div>

  <div class="plane" :style="{
    transform: 'translatey(-' + data.width / 2 + 'px)' +
                'rotatex(90deg);',
    background: 'hsl(' + data.color[0] + ',' + data.color[1] + '%,' + (data.color[2] - 10) + '%)' }">
    <!-- Top -->
  </div>

  <div class="plane" :style="{
    transform: 'translatey(' + data.width / 2 + 'px)' +
                'rotatex(90deg);',
    background: 'hsl(' + data.color[0] + ',' + data.color[1] + '%,' + (data.color[2] - 10) + '%)' }">
    <!-- Bottom -->
  </div>

  <div class="plane" :style="{
    transform: 'translatex(-' + data.width / 2 + 'px) ' +
                'rotatey(90deg);',
    background: 'hsl(' + data.color[0] + ',' + data.color[1] + '%,' + (data.color[2] + 10) + '%)' }">
    <!-- side 1 -->
  </div>

  <div class="plane" :style="{
    transform: 'translatex(' + data.width / 2 + 'px) ' +
                'rotatey(90deg);',
    background: 'hsl(' + data.color[0] + ',' + data.color[1] + '%,' + (data.color[2]) + '%)' }">
    <!-- side 2 -->
  </div>

</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {

    data: {
      type: Object,
      required: true,
    },

    color: {
      type: Array,
      default: [50, 50, 50]
    }
  },
  computed: {
    css_string() {
      // The string we'll return. 
      let css_string = '';

      // Transform information
      let transform_css = 'transform:';

      transform_css += ' translatex(' + this.data.x + 'px)',
      transform_css += ' translatey(' + this.data.y + 'px)',
      transform_css += ' translatez(' + this.data.z + 'px)',

      transform_css += ' rotatex(' + this.data.xRot + 'deg)',
      transform_css += ' rotatey(' + this.data.yRot + 'deg)',
      transform_css += ' rotatez(' + this.data.zRot + 'deg)',

      transform_css += ';';

      css_string += transform_css;
      css_string += ' height: ' + this.data.height + 'px;'
      css_string += ' width: ' + this.data.width + 'px;'

      return css_string;
    }
  }
}
</script>

<style>
.plane {
  width: 100%;
  height: 100%;
  background: var(--c1);
  position: absolute;
  transform-style: preserve-3d;
  color: black;
}
</style>