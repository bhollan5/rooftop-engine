<template>

<div class="space-canvas-container"
  :style="{ 
      background: 'hsl(' + bg_color[0] + ',' +bg_color[1] + '%,' + bg_color[2] + '%)' 
      }">

  <!-- Object info display -->
  <div class="object-info card small-font-size card-padding" v-if="edit_mode"
    :class="{ 'expanded': expand_object_editor }">
    <div class="card-header" @click="expand_object_editor = !expand_object_editor">
      Object settings: {{objects[o_i]._id}}
    </div>

    <div class="card-body slide-down" v-if="expand_object_editor">

      <color-palette :margin="1" v-model="objects[o_i].color"></color-palette>

      <div class="flex-container row-wrap">
        <text-field title="xRot:" v-model="objects[o_i].xRot" nopadding number >
        </text-field>
        <input type="range" min="-360" max="360" v-model="objects[o_i].xRot" v-if="show_sliders">
        <text-field title="xPos:" v-model="objects[o_i].x" nopadding number >
        </text-field>
        <input type="range" min="-400" max="100" v-model="objects[o_i].x" v-if="show_sliders">
        <text-field title="Width:" v-model="objects[o_i].width" nopadding number>
        </text-field>
        <input type="range" min="0" max="400" v-model="objects[o_i].width" v-if="show_sliders">
      </div>
      
      <div class="flex-container row-wrap">
        <text-field title="yRot:" v-model="objects[o_i].yRot" nopadding number ></text-field>
        <input type="range" min="-360" max="360" v-model="objects[o_i].yRot" v-if="show_sliders">
        <text-field title="yPos:" v-model="objects[o_i].y" nopadding number ></text-field>
        <input type="range" min="-400" max="100" v-model="objects[o_i].y" v-if="show_sliders">
        <text-field title="Height:" v-model="objects[o_i].height" nopadding number ></text-field>
        <input type="range" min="0" max="400" v-model="objects[o_i].height" v-if="show_sliders">
      </div>
      
      <div class="flex-container row-wrap">
        <text-field title="zRot:" v-model="objects[o_i].zRot" nopadding number > </text-field>
        <input type="range" min="0" max="360" v-model="objects[o_i].zRot" v-if="show_sliders">
        <text-field title="zPos:" v-model="objects[o_i].z" nopadding number ></text-field>
        <input type="range" min="-400" max="100" v-model="objects[o_i].z" v-if="show_sliders">
        <text-field title="Depth:" v-model="objects[o_i].depth" nopadding number ></text-field>
        <input type="range" min="0" max="400" v-model="objects[o_i].depth" v-if="show_sliders">
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

      <color-palette :margin="1" v-model="bg_color_var"></color-palette>

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

      <button @click="add_cube()">add cube</button>

      <h3>Objects:</h3>

      <div v-for="object in  objects" class="object-display">
        {{ object._id }}
      </div>
      
    </div>
  </div>

  

  <div class="space-canvas" 
    :style="{ perspective: perspective + 'px',
      background: 'hsl(' + bg_color[0] + ',' + bg_color[1] + '%,' + bg_color[2] + '%)' }">
    <div class="space-canvas-coordinate-positioner"
      :style="{ perspective: perspective + 'px' }">

    
    <cube v-for="(cube, cube_i) in objects" v-if="cube.type == 'cube'"
      :data="cube" :key="cube_i"
      @click="o_i = cube_i"></cube>

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
      perspective: 1000,
      show_sliders: true,
      absolute_color: false, // Set to false if yr using a variable color
      bg_color_var: 'bg', // turns into an array in computed bg_color

      // Object editor settings
      o_i: 0, // The index of the selected object
      expand_object_editor: false,

      objects: [
        {
          type: 'cube',
          _id: 'cube1',
          color: 'c1',

          x: -50,
          y: -50,
          z: -50,

          // Position unit
          p_unit: '%',

          xRot: -15,
          yRot: 0,
          zRot: 0,

          height: 100,
          width: 200,
          depth: 300,
          
        }
      ],

      cube1: {
        color: [20, 50, 50],

        x: -50,
        y: -50,
        z: -50,

        // Position unit
        p_unit: '%',

        xRot: 45,
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
    },

    bg_color() {
      if (typeof(this.bg_color_var) != 'string') {
        return this.bg_color_var;
      }
      return this.$store.getters['themes/color_styling'](this.bg_color_var);
    } 

  },
  
  mounted() {
    // this.anim_frame();
  },

  methods: {
    anim_frame() {
      this.objects[0].xRot += .2;
      this.objects[0].yRot += .2;
      this.objects[0].zRot += .2;
      setTimeout(this.anim_frame, 10);
    },

    add_cube() {
      let _id = 'cube' + this.objects.length;
      this.objects.push({
        type: 'cube',
        _id: _id,
        color: 'c1',

        x: -50,
        y: -50,
        z: -50,

        // Position unit
        p_unit: '%',

        xRot: -15,
        yRot: 0,
        zRot: 0,

        height: 100,
        width: 200,
        depth: 300,
        
      })
    }
  }
  
}
</script>

<style lang="scss">

.space-canvas-container {
  display: flex;
  height: 600px;
  position: relative;
}

.space-canvas {
  position: relative;
  transform-style: preserve-3d;
  z-index: 0;
  width: 100%;
  height: 600px;
}
  // This lets us make the center of the stage 0,0,0
  //   We couldn't do this directly to .space-canvas without moving the vanishing pt
.space-canvas-coordinate-positioner {
  transform: translate(0px);
  padding-left: 50%;
  padding-top: 300px;
  width: 50%;
  height: 600px;
}

.object {
  position: absolute;
  transform-style: preserve-3d;
  // div {border: solid 2px red;}
  cursor: pointer;
}
.object:hover::after {
  content: '';
  position: absolute;
  width: 120px;
  height: 120px;
  margin: -10px 0px 0px -10px;
  background: rgba(255,255,255,.5);
  box-shadow: 0px 0px 10px rgba(255,255,255,.5);
  transform: translatez(-40px);
}

// For the canvas info editor
.object-info {
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
    width: calc(100% - 50px);
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