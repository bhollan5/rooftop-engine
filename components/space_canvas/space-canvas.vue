<template>

<div class="space-canvas-container"
  :style="{ 
      background: 'hsl(' + bg_color[0] + ',' +bg_color[1] + '%,' + bg_color[2] + '%)' 
      }">

  <!-- Object info display -->
  <div class="object-info card small-font-size card-padding" v-if="edit_mode"
    :class="{ 'expanded': expand_object_editor }">
    <div class="card-header" @click="expand_object_editor = !expand_object_editor">
      Object settings:
    </div>

    <div class="card-body slide-down" v-if="expand_object_editor">

      <color-palette :margin="1" v-model="cube1.color"></color-palette>

      <div class="flex-container row-wrap">
        <text-field title="xRot:" v-model="cube1.xRot" nopadding number ></text-field>
        <input type="range" min="-360" max="360" v-model="cube1.xRot" v-if="show_sliders">
        <text-field title="xPos:" v-model="cube1.x" nopadding number ></text-field>
        <input type="range" min="-100" max="100" v-model="cube1.x" v-if="show_sliders">
        <text-field title="Width:" v-model="cube1.width" nopadding number ></text-field>
        <input type="range" min="-100" max="100" v-model="cube1.width" v-if="show_sliders">
      </div>
      
      <div class="flex-container row-wrap">
        <text-field title="yRot:" v-model="cube1.yRot" nopadding number ></text-field>
        <input type="range" min="-360" max="360" v-model="cube1.yRot" v-if="show_sliders">
        <text-field title="yPos:" v-model="cube1.y" nopadding number ></text-field>
        <input type="range" min="-100" max="100" v-model="cube1.y" v-if="show_sliders">
        <text-field title="Height:" v-model="cube1.height" nopadding number ></text-field>
        <input type="range" min="-100" max="100" v-model="cube1.height" v-if="show_sliders">
      </div>
      
      <div class="flex-container row-wrap">
        <text-field title="zRot:" v-model="cube1.zRot" nopadding number > </text-field>
        <input type="range" min="0" max="360" v-model="cube1.zRot" v-if="show_sliders">
        <text-field title="zPos:" v-model="cube1.z" nopadding number ></text-field>
        <input type="range" min="-100" max="100" v-model="cube1.z" v-if="show_sliders">
        <text-field title="Depth:" v-model="cube1.depth" nopadding number ></text-field>
        <input type="range" min="-100" max="100" v-model="cube1.depth" v-if="show_sliders">
      </div>

    </div>

  </div>
  

  <!-- canvas info display -->
  <div class="canvas-info card small-font-size card-padding" v-if="edit_mode"
    :class="{ 'expanded': expand_canvas_editor }">

    <div class="card-header" @click="expand_canvas_editor = !expand_canvas_editor">
      Canvas settings:
    </div>

    <div class="card-body" v-if="expand_canvas_editor">

      <color-palette :margin="1" v-model="bg_color"></color-palette>

      <div class="flex-container row-wrap">
        <text-field title="Perspective:" v-model="perspective" nopadding number ></text-field>
        <input type="range" min="10" max="1000" v-model="perspective" v-if="show_sliders">
      </div>

      <div class="flex-container">
        <div>Sliders:</div>
        <input type="checkbox" v-model="show_sliders">
      </div>

      <div class="flex-container">
        <div>Edit mode:</div>
        <input type="checkbox" v-model="edit_mode">
      </div>
      
    </div>
  </div>

  

  <div class="space-canvas" 
    :style="{ perspective: perspective + 'px',
      background: 'hsl(' + bg_color[0] + ',' +bg_color[1] + '%,' + bg_color[2] + '%)' }">
    <div class="space-canvas-coordinate-positioner">

    <cube :data="cube1" :color="colors.c1"></cube>

    </div>
  </div>

</div>

</template>

<script>
import cube from '@/components/space_canvas/geometry/cube.vue';
export default {
  components: {
    cube
  },

  data() { 
    return {
      edit_mode: true,
      
      // Canvas settings:
      expand_canvas_editor: false,
      perspective: 500,
      show_sliders: true,
      bg_color: [28, 19, 31], // a computed property

      // Object editor settings
      object_to_edit: {},
      expand_object_editor: false,

      cube1: {
        color: [20, 50, 50],

        x: -50,
        y: -50,
        z: -50,

        // Position unit
        p_unit: '%',

        xRot: 0,
        yRot: 0,
        zRot: 0,

        height: 100,
        width: 100,
        depth: 100,
        
      }
    }
  },

  computed: {
    colors() {
      let theme_obj = this.$store.getters['themes/theme_object'];
      return theme_obj.colors;
    }
  },
  
  mounted() {
  //  this.bg_color = this.colors.bg;
    //this.anim_frame();
  },

  methods: {
    anim_frame() {
      this.cube1.xRot += 1.5;
      this.cube1.yRot += 1.5;
      this.cube1.zRot += 1.5;
      setTimeout(this.anim_frame, 100);
    }
  }
  
}
</script>

<style lang="scss">

.space-canvas-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.space-canvas {
  position: relative;
  transform-style: preserve-3d;
  z-index: 0;
  width: 100%;
  height: 100%;
}
  // This lets us make the center of the stage 0,0,0
  //   We couldn't do this directly to .space-canvas without moving the vanishing pt
.space-canvas-coordinate-positioner {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
}

.object {
  position: absolute;
  transform-style: preserve-3d;
  // div {border: solid 2px red;}
}

// For the canvas info editor
.canvas-info {
  left: 210px;
}

.object-info, .canvas-info {
  position: absolute;
  margin: 10px;
  z-index: 11;
  opacity: .3;
  width: 200px;
  cursor: pointer;
  &:hover {
    opacity: .8;
  }
  // slider:
  input[type="range"] {
    width: 100%;
    margin-right: 20px;
  }
 .text-field {
   width: 40px;
   margin-right: 10px;
   input {
     padding: 0px;
   }
 }
}



.cube {

}

</style>