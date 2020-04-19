<template>
<div class="color-picker">
  <br>
  <div class="color-display" 
    :style="{
      background: 'hsl(' + hsl[0] + ',' + hsl[1] + '%,' + hsl[2] + '%)',
      color: 'hsl(' + textcolor[0] + ',' + textcolor[1] + '%,' + textcolor[2] + '%)'
    }">
  </div>
  <div style="font-size: var(--small-font-size); margin-left: 10px;color:var(--card-text2)">Id: {{id}}</div>


  <div id="color-canvas-container">
    <div class="color-canvas" ref="color-canvas"
      @mousedown="canvas_click($event)"
      @mouseup="canvasDrag = false"
      @mouseout="canvasDrag = false"
      @mousemove="canvas_move($event)">

      <div class="lightness-gradient"
        :style="{ 
          'background-image': 'linear-gradient(to top, hsla(' + hsl[0] + ',50%,0%,1), hsla(' + hsl[0] + ',50%,100%,0))',
        }"></div>
      <div class="saturation-gradient"
      :style="{ 
        'background-image': 'linear-gradient(to right, hsla(' + hsl[0] + ',0%,100%, 1), hsla(' + hsl[0] + ',100%,50%, 1))',
      }"></div>

    </div>
      
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

    <!-- Hue slider: -->
    <slider title="H:" :value="hsl[0]" :min="0" :max="360"
    :gradient="hue_gradient"
    @input="update_hsl($event, 0)"></slider>
    <!-- Saturation slider: -->
    <slider title="S:" :value="hsl[1]" :min="0" :max="100"
    :gradient="saturation_gradient"
    @input="update_hsl($event, 1)"></slider>
    <!-- Lightness slider: -->
    <slider title="L:" :value="hsl[2]" :min="0" :max="100"
    :gradient="lightness_gradient"
    @input="update_hsl($event, 2)"></slider>

  </div>
  
</div>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      hsl: [50,50,50],

      canvasDrag: false,  // Indicates if the mouse is down over the canvas
    }
  },

  mounted() {
    Vue.set(this.hsl, 0, this.value[0])
    Vue.set(this.hsl, 1, this.value[1])
    Vue.set(this.hsl, 2, this.value[2])
  },


  props: {
    // Color name:
    name: {
      type: String,
      default: 'My Color'
    },
    // Id to be displayed
    id: {
      type: String,
    },
    // Not currently implemented.
    description: {
      type: String,
      default: 'A quick description here.'
    },
    textcolor: {
      type: Array,
      default() {
        return [225, 100, 100]
      },
    },
    // The value incoming from the v-model variable.
    value: {
      type: Array,
      default() {
        return [360, 100, 100]
      },
    },
    values: {
      type: Array,
      default() {
        return [
          {
            name: 'hue',
            abbr: 'h', 
            max: 360,
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

  computed: {
    // For the backgrounds of the sliders;
    hue_gradient() {
      return [
        [0,this.hsl[1],this.hsl[2]], 
        [90,this.hsl[1],this.hsl[2]], 
        [180,this.hsl[1],this.hsl[2]], 
        [270,this.hsl[1],this.hsl[2]], 
        [360,this.hsl[1],this.hsl[2]], 
      ];
    },
    saturation_gradient() {
      return [
        [this.hsl[0],0,this.hsl[2]], 
        [this.hsl[0],100,this.hsl[2]]
      ];
    },
    lightness_gradient() {
      return [
        [this.hsl[0],this.hsl[1], 0], 
        [this.hsl[0],this.hsl[1], 50],
        [this.hsl[0],this.hsl[1], 100],
      ];
    },
  },

  watch: {
    value() {
      // Making sure our hsl stays up to date as the current theme loads.
      this.hsl[0] = this.value[0];
      this.hsl[1] = this.value[1];
      this.hsl[2] = this.value[2];
    },
  },

  methods: {

    update_hsl(newHue, index) {
      console.log("Updating hsl");
      Vue.set(this.hsl, index, newHue);
      this.$emit('input', this.hsl);
    }, 

    canvas_move(evt) {
      if (this.canvasDrag) {
        let box = this.$refs['color-canvas'].getBoundingClientRect();
        // y axis:
        let y_percent = (evt.y - box.top) / 200; // The canvas is 200x200
        y_percent = 1 - y_percent;
        let new_val = Math.round(y_percent * 100);
        Vue.set(this.hsl, 2, new_val)

        // x axis:
        let x_percent = (evt.x - box.left) / 200; // The canvas is 200x200
        new_val = Math.round(x_percent * 100);
        Vue.set(this.hsl, 1, new_val)

        // Changing parent value
        this.$emit('input', this.hsl);
      }
    },
    canvas_click(evt) {
      this.canvasDrag = true;
      this.canvas_move(evt);
    },

  },

}

</script>

<style scoped lang="scss">

$margin-size: 10px;

.lightness-gradient {
  z-index: 3;
}

// Color display:
.color-display {
  width: 50px;
  height: 20px;
  position: absolute;
  top: 10px;
  left: 10px;
  box-shadow: inset 0px 0px 2px black;
  outline: 1px solid var(--card2);
}
// Popup picker:
.color-picker {
  position: relative;
  width: 100%;
  height: 325px;

  overflow: hidden;
  background: var(--card);
  color: var(--card-text);
  box-shadow: 0px 0px 10px rgba(0,0,0,.5);

  #color-canvas-container {
    width: 200px;
    height: 200px;
    position: absolute;
    right: 10px;
    top: 10px;

    .color-canvas {
      width: 200px;
      height: 200px;
      outline: solid 2px var(--card2);
      div {
        position: absolute;
        width: 100%;
        height: 100%;
      }

    }
  }

  .y-label, .x-label {
    position: absolute;
    font-size: var(--small-font-size);
    color: var(--card-text2);
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
      cursor: pointer;

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
  z-index: 5;
}
// Placing the canvas-indicator correctly
.canvas-indicator {
  margin-top: -5px;
  margin-left: -5px;
}


</style>