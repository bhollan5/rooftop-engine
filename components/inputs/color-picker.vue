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

    <div id="color-canvas-container" @click="canvasClick($event)">
      <canvas class="color-canvas" ref="color-canvas"></canvas>
      <div class="color-indicator canvas-indicator"></div>
      <div class="y-label">Lightness</div>
      <div class="x-label">Saturation</div>
    </div>

    <div class="hsl-sliders">

      <div class="gradient-slider">
        <span>h:</span> <input v-model="hsl[0]" type="number"><br>
      </div>
      <div class="gradient-slider">
        <span>s:</span> <input v-model="hsl[1]" type="number"><br>
      </div>
      <div class="gradient-slider">
        <span>l:</span> <input v-model="hsl[2]" type="number"><br>
      </div>

    </div>
  </div>
  
</div>
</template>

<script>
// Icons:
import expandIcon from '@/components/icons/expand-icon.vue';

export default {
  data() {
    return {
      hsl: [0,0,0]
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
  },

  methods: {
    canvasClick(e) {
      console.log(e);
    },

    updateColorPicker() {
      // Getting our canvas:
      let canvasEl = this.$refs['color-canvas'];

      // Grabbing our canvas variables:
      let canvasContext = canvasEl.getContext('2d');
      let width1 = canvasEl.width;
      let height1 = canvasEl.height;

      var red = 'rgba(255,0,0,1)'; // red

      // Creating a rectangle on our canvas:
      canvasContext.rect(0, 0, width1, height1);

      // Filling with red::
      canvasContext.fillStyle = red;
      canvasContext.fillRect(0, 0, width1, height1);

      // Painting over with white:
      var grdWhite = canvasContext.createLinearGradient(0, 0, width1, 0);
      grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
      grdWhite.addColorStop(1, 'rgba(255,255,255,0)'); // Transparent
      canvasContext.fillStyle = grdWhite;
      canvasContext.fillRect(0, 0, width1, height1);

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

// The entire component:
.color-picker {
  position: relative;
  width: 100%;  
  width: 400px;
}

// Color display:
.color-display {
  width: 100%;
  padding: 10px;
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
  .x-label {
    width: 100px;
    right: 70px;
    top: 220px;
  }
}

// Slider section
.hsl-sliders {
  position: absolute;
  width: 200px;
  position: absolute;
  right: 20px;
  top: 240px;

  .gradient-slider {
    display: flex;
    align-items: center;
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
  top: 0px;
  left: 0px;
}

</style>