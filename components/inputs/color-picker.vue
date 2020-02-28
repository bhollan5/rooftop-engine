<template>
<div class="color-picker">

  <!-- This is the color display, ready to be clicked on :O -->
  <div class="color-display" @click="focus=true"
    :style="{
      background: 'hsl(' + hsl[0] + ',' + hsl[1] + '%,' + hsl[2] + '%)'
    }">
    <p class="color-name">{{name}}</p>
    <p class="color-description">{{description}}</p>
  </div>

  <!-- Absolutely-positioned, popup color picker -->
  <div id="color-picker-popup">

    <!-- The big gradient canvas: -->
    <div id="color-canvas-container">
      <canvas class="color-canvas" ref="color-canvas"
        @mousemove="canvasClick($event)"
        @mousedown="canvasDrag = true" @mouseup="canvasDrag = false"></canvas>
      <div class="color-indicator canvas-indicator"
        :style="{
          bottom: (hsl[2] / values[2].max) * 100 + '%',
          left: (hsl[1] / values[1].max) * 100 + '%',
        }"></div>

      <div class="y-label">Lightness</div>
      <div class="x-label">Saturation</div>
    </div>

    <!-- The sliders, below the canvas: -->
    <div class="hsl-sliders">

      <div class="gradient-slider">
        <div class="gradient-input">
          <span>h:</span> <input v-model="hsl[0]" type="number"
            :max="values[0]"><br>
        </div>
        <canvas class="canvas-slider" ref="canvas-slider1"></canvas>
      </div>
      <div class="gradient-slider">
        <div class="gradient-input">
          <span>s:</span> <input v-model="hsl[1]" type="number"
            :max="values[1]"><br>
        </div>
        <canvas class="canvas-slider" ref="canvas-slider2"></canvas>
      </div>
      <div class="gradient-slider">
        <div class="gradient-input">
          <span>l:</span> <input v-model="hsl[2]" type="number"
            :max="values[2]"><br>
        </div>
        <canvas class="canvas-slider" ref="canvas-slider3"></canvas>
      </div>

    </div>
  </div>
  
</div>
</template>

<script>
import Vue from 'vue';

// Icons:
import expandIcon from '@/components/icons/expand-icon.vue';

export default {
  data() {
    return {
      hsl: [0,0,0],

      canvasDrag: false, // Indicates if the mouse is down over the canvas
    }
  },

  mounted() {
    this.updateColorPicker();
  },

  components: {
    expandIcon
  },

  props: {
    // Color name:
    name: {
      type: String,
      default: 'My Color'
    },
    description: {
      type: String,
      default: 'A quick description here.'
    },
    values: {
      type: Array,
      default() {
        return [
          {
            name: 'hue',
            abbr: 'h', 
            max: 225,
          }, {
            name: 'satruation',
            abbr: 's', 
            max: 100,
          }, {
            name: 'lightness',
            abbr: 'l', 
            max: 100,
          },
        ]
      }
    }
  },

  watch: {
    hsl() {
      this.updateColorPicker();
    }
  },

  methods: {
    // Managing changing values when the user clicks on the canvas:
    canvasClick(e) {

      // Don't do this function if the mouse isn't down:
      if (!this.canvasDrag) {
        return;
      }

      // e.offsetX gives us the space 
      let newX = e.offsetX / 200; 
      newX = Math.floor(newX * this.values[1].max);
      let newY = e.offsetY / 200;
      newY = -Math.floor(newY * this.values[2].max) + 100;

      Vue.set(this.hsl, 1, newX);
      this.hsl[1] = newX;
      this.hsl[2] = newY;
    },

    updateColorPicker() {
      // Getting our canvas:
      let canvasEl = this.$refs['color-canvas'];

      // Grabbing our canvas variables:
      let canvasContext = canvasEl.getContext('2d');
      let width1 = canvasEl.width;
      let height1 = canvasEl.height;

      var red = 'hsl(' + this.hsl[0] + ',100%,50%)'; // red

      // Creating a rectangle on our canvas:
      canvasContext.rect(0, 0, width1, height1);

      // Filling with red::
      canvasContext.fillStyle = red;
      canvasContext.fillRect(0, 0, width1, height1);

      // Painting over with white, for saturation:
      var grdWhite = canvasContext.createLinearGradient(0, 0, width1, 0);
      grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
      grdWhite.addColorStop(1, 'rgba(255,255,255,0)'); // Transparent
      canvasContext.fillStyle = grdWhite;
      canvasContext.fillRect(0, 0, width1, height1);

      // Painting over the whole thing  from top to bottom for lightness:
      var grdBlack = canvasContext.createLinearGradient(0, 0, 0, height1);
      grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
      grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
      canvasContext.fillStyle = grdBlack;
      canvasContext.fillRect(0, 0, width1, height1);
    }
  },

}

</script>

<style scoped lang="scss">

$margin-size: 10px;

// The entire component:
.color-picker {
  position: relative;
  width: 100%;  
  width: 400px;
}

// Color display:
.color-display {
  width: 100%;
  padding: $margin-size;
  .color-name {
    font-size: var(--regular-font-size);
    font-weight: bold;
  }
  .color-description {
    font-size: var(--small-font-size);
  }
  .color-name, .color-description {
    width: calc(100% - 32px);
  }
}

// Popup picker:
#color-picker-popup {
  position: absolute;
  width: 400px;
  height: 400px;
  background: var(--input);
  color: var(--input-text);

  #color-canvas-container {
    width: 200px;
    height: 200px;
    position: absolute;
    right: 10px;
    top: 10px;
    .color-canvas {
      width: 200px;
      height: 200px;
    }
  }

  .y-label, .x-label {
    position: absolute;
    font-size: var(--small-font-size);
    color: var(--input-text2);
    text-align: center;
  }
  .y-label {
    right: 210px;
    top: 175px;
  }
  .x-label {
    width: 100px;
    right: 120px;
    top: 205px;
  }
}

// Slider section
.hsl-sliders {
  position: absolute;
  width: 260px;
  position: absolute;
  right: $margin-size;
  top: 240px;

  .gradient-slider {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .gradient-input {
      display: flex;
      align-items: center;
      width: 50px;
      span {
        display: block;
        width: 20px;
      }
      input {
        outline: none;
        border: none;
        width:  30px;
        padding: none;
        height: 16px;
        box-shadow: 0px 0px 5px rgba(0,0,0,.5); 
      }
    }

    .canvas-slider {
      width: 200px;
      height: 10px;
    }
  }
  
}

// Styling for all indicators
.color-indicator {
  position: absolute;
  width: 10px;
  height: 10px;
  border: solid 1px white;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0,0,0,.5);
}
// Placing the canvas-indicator correctly
.canvas-indicator {
  margin-top: -5px;
  margin-left: -5px;
}

</style>