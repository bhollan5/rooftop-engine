<template>
<div class="color-picker" >

  <!-- This is the color display, ready to be clicked on :O -->
  <div class="color-display" @click="focus=!focus"
    :style="{
      background: 'hsl(' + hsl[0] + ',' + hsl[1] + '%,' + hsl[2] + '%)'
    }">
    <p class="color-name">{{name}}</p>
    <p class="color-description">{{description}}</p>
  </div>

  <!-- Absolutely-positioned, popup color picker -->
  <div id="color-picker-popup" v-if="focus">

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

      <!-- One of three  slider  containers -->
      <div class="gradient-slider">
        <!-- This container has the number input and the label: -->
        <div class="gradient-input">
          <span>h:</span> <input v-model="hsl[0]" type="number"
            :max="values[0]" min="0"><br>
        </div>

        <!-- Canvas and indicator: -->
        <canvas class="canvas-slider" ref="canvas-slider1" 
          @mousedown="sliderDrag[0] = true"
          @mousemove="sliderMove($event)" @mouseup="noSlidersDragging()"></canvas>
        <!-- The math for the indicator position is a little  weird. The slider is 200px, but it's offset by the 60px gradient-input box. -->
        <div class="color-indicator canvas-indicator"
        :style="{
          top: '12px',
          left: ((hsl[0] / values[0].max) * 200) + 60 + 'px',
        }"></div>

      </div>

      <div class="gradient-slider">

        <div class="gradient-input">
          <span>s:</span> <input v-model="hsl[1]" type="number"
            :max="values[1]" min="0"><br>
        </div>

        <canvas class="canvas-slider" ref="canvas-slider2"
          @mousedown="sliderDrag[1] = true"
          @mousemove="sliderMove($event)" @mouseup="noSlidersDragging()"></canvas>
        <div class="color-indicator canvas-indicator"
        :style="{
          top: '12px',
          left: ((hsl[1] / values[1].max) * 200) + 60 + 'px',
        }"></div>

      </div>
      <div class="gradient-slider">

        <div class="gradient-input">
          <span>l:</span> <input v-model="hsl[2]" type="number"
            :max="values[2]" min="0"><br>
        </div>

        <canvas class="canvas-slider" ref="canvas-slider3"
          @mousedown="sliderDrag[2] = true"
          @mousemove="sliderMove($event)" @mouseup="noSlidersDragging()"></canvas>
        <div class="color-indicator canvas-indicator"
        :style="{
          top: '12px',
          left: ((hsl[2] / values[1].max) * 200) + 60 + 'px',
        }"></div>
        
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
      hsl: [50,50,50],

      focus: true,        // Expanded popup

      canvasDrag: false,  // Indicates if the mouse is down over the canvas
      sliderDrag: [false, false, false]
    }
  },

  mounted() {
    this.updateColorPicker();
    this.updateSlider();
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
      this.updateSlider();
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

    // Managing changing values when the user clicks on the canvas:
    sliderMove(e, sliderNum) {

      for (let i = 0; i < 3; i++){
        // Don't do this function if the mouse isn't down:
        if (!this.sliderDrag[i]) {
          continue;
        }

        // e.offsetX gives us the space 
        let newX = e.offsetX / 200; 
        newX = Math.floor(newX * this.values[i].max);

        Vue.set(this.hsl, i, newX);
      }
    },
    noSlidersDragging() {
      for (let i = 0; i < 3; i++){ 
        this.sliderDrag[i] = false;
      }
    },

    // Updating the big square canvas:
    updateColorPicker() {
      // Getting our canvas:
      let canvasEl = this.$refs['color-canvas'];
      if (!canvasEl) return;

      // Grabbing our canvas variables:
      let canvasContext = canvasEl.getContext('2d');
      let width1 = canvasEl.width;
      let height1 = canvasEl.height;

      // Getting the color's hue
      var hue = 'hsl(' + this.hsl[0] + ',100%,50%)'; // red

      // Creating a rectangle on our canvas:
      canvasContext.rect(0, 0, width1, height1);

      // Filling with red::
      canvasContext.fillStyle = hue;
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
    },

    // updating a slider:
    updateSlider() {

      // HUE:
      //
      // Getting our hue canvas:
      let sliderEl = this.$refs['canvas-slider1'];

      // Grabbing our canvas variables:
      let canvasContext = sliderEl.getContext('2d');
      let width1 = sliderEl.width;
      let height1 = sliderEl.height;

      // Creating a rectangle on our canvas:
      canvasContext.rect(0, 0, width1, height1);

      // Painting over with our saturation gradient:
      let grdWhite = canvasContext.createLinearGradient(0, 0, width1, 0);
      // We're iterating through  from 0.0 to 1.0 to set up pieces of our hue gradient
      for (let i = 10; i >= 0; i--) {
        let frac = i / 10;
        grdWhite.addColorStop(frac, 'hsla(' + (360 * frac) + ',' + 
          this.hsl[1] + '%,' + this.hsl[2] + '%,1)');
      }
      canvasContext.fillStyle = grdWhite;
      canvasContext.fillRect(0, 0, width1, height1);


      // SATURATION
      //
      // Getting our saturation canvas:
      sliderEl = this.$refs['canvas-slider2'];

      // Grabbing our canvas variables:
      canvasContext = sliderEl.getContext('2d');
      width1 = sliderEl.width;
      height1 = sliderEl.height;

      let baseColor = 'hsl(' + this.hsl[0] + ',100%,' + this.hsl[2] + '%)'; 

      // Creating a rectangle on our canvas:
      canvasContext.rect(0, 0, width1, height1);

      // Filling with our color with unaffected saturation:
      canvasContext.fillStyle = baseColor;
      canvasContext.fillRect(0, 0, width1, height1);

      // Painting over with our saturation gradient:
      grdWhite = canvasContext.createLinearGradient(0, 0, width1, 0);
      grdWhite.addColorStop(0, 'hsla(0, 0%,' + this.hsl[2] + '%,1)');
      grdWhite.addColorStop(1, 'hsla(0, 0%, 0%, 0)'); // Transparent
      canvasContext.fillStyle = grdWhite;
      canvasContext.fillRect(0, 0, width1, height1);


      // LIGHTNESS:
      //
      // Getting our lightness canvas:
      sliderEl = this.$refs['canvas-slider3'];

      // Grabbing our canvas variables:
      canvasContext = sliderEl.getContext('2d');
      width1 = sliderEl.width;
      height1 = sliderEl.height;

      baseColor = 'hsl(' + this.hsl[0] + ',' + this.hsl[1] + '%, 50%)'; 

      // Creating a rectangle on our canvas:
      canvasContext.rect(0, 0, width1, height1);

      // Filling with our color with unaffected saturation:
      canvasContext.fillStyle = baseColor;
      canvasContext.fillRect(0, 0, width1, height1);

      // Painting over with our saturation gradient:
      grdWhite = canvasContext.createLinearGradient(0, 0, width1, 0);
      grdWhite.addColorStop(0, 'hsla(' + this.hsl[0] + ', ' + this.hsl[1] + '%,0%,1)');
      grdWhite.addColorStop(.5, 'hsla(' + this.hsl[0] + ', ' + this.hsl[1] + '%,50%,1)');
      grdWhite.addColorStop(1, 'hsla(' + this.hsl[0] + ', ' + this.hsl[1] + '%,100%,1)');
      canvasContext.fillStyle = grdWhite;
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
  cursor: pointer;
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
  height: 325px;
  background: var(--bg2);
  color: var(--bg2-text);

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
    color: var(--bg2-text2);
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
    position: relative;

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
  pointer-events: none;
}
// Placing the canvas-indicator correctly
.canvas-indicator {
  margin-top: -5px;
  margin-left: -5px;
}

</style>