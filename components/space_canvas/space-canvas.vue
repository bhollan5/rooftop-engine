<template>

<div class="space-canvas-container"
  :style="{ 
      background: 'hsl(' + bg_color[0] + ',' +bg_color[1] + '%,' + bg_color[2] + '%)' 
      }">

  <!-- The side bar, with the settings -->
  <div id="side-bar">
  
    <!-- The header of the side bar is colored differently. -->
    <div id="side-bar-header" >
      <!-- This flex container holds the title, id, and thumb. -->
      <div class="flex-container">
        Canvas settings:
      </div>

    </div>

    <div id="side-bar-content" >
      <div class="card-body" >

      <color-palette :margin="1" v-model="bg_color_var"></color-palette>

      <div class="flex-container row-wrap space-between align-center">
        <text-field title="Perspective:" v-model="perspective" nopadding number ></text-field>
        <input type="range" min="10" max="2000" v-model="perspective" v-if="show_sliders">
      </div>

      <div class="canvas-options-container">
        <checkbox title="Sliders:" v-model="show_sliders"></checkbox>
        <checkbox title="Edit mode:" v-model="edit_mode"></checkbox>
        <checkbox title="Show grid:" v-model="show_grid"></checkbox>
        <checkbox title="Show origin:" v-model="show_origin"></checkbox>
      </div>

      <button @click="add_cube()">add cube</button>

      <h3>Objects:</h3>

      <div v-for="(object, obj_i) in objects" class="object-thumb"
        :class="{ selected: obj_i == o_i }"
        @click="o_i = obj_i">
        <div class="thumbnail"
          :style="{ background: 'var(--' + object.color + ')' }"></div>
        {{ object.name }}
      </div>
      
    </div>

    </div>
  </div>

  <!-- Object info display -->
  <div class="object-info card small-font-size card-padding" v-if="edit_mode"
    :class="{ 'expanded': expand_object_editor }">
    <div class="card-header" @click="expand_object_editor = !expand_object_editor">
      Object settings: {{objects[o_i].name}}
    </div>

    <div class="card-body slide-down" v-if="expand_object_editor">

      <color-palette :margin="1" v-model="objects[o_i].color"></color-palette>

      <div class="flex-container row-wrap">
        <text-field title="Opacity:" v-model="objects[o_i].opacity" nopadding number >
        </text-field>
        <input type="range" 
          min="0" 
          max="1" 
          step=".1"
          v-model="objects[o_i].opacity" 
          v-if="show_sliders">
      </div>

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
  

  
  
  <div class="space-canvas" 
    @mousedown="mouse_down"
    @mouseup="mouse_up"
    @mousemove="mouse_drag"
    :style="{ perspective: perspective + 'px', }">
    <div class="canvas-camera"
      :style="{ transform: 'rotatex(' + camera_rotate_x + 'deg) ' + 
        'rotatey(' + camera_rotate_y + 'deg) ' }">

    <div class="origin-indicator object" v-if="show_origin"></div>

    <div class="grid object" v-if="show_grid"></div>

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
      perspective: 1200,
      show_sliders: true,
      absolute_color: false, // Set to false if yr using a variable color
      bg_color_var: 'bg', // turns into an array in computed bg_color
      drag_canvas: false,
      show_grid: true,
      show_origin: false,

      // For keeping track of the initial click point,  for click and drag:
      previous_x_click: 0,
      previous_y_click: 0,
      camera_rotate_x: -10,
      camera_rotate_y: 10,

      // Object editor settings
      o_i: 0, // The index of the selected object
      expand_object_editor: false,

      objects: [
        {
          // Info:
          type: 'cube',
          name: 'Cube 1',
          _id: 'cube1',

          // Rendering:
          color: 'c1',
          opacity: 1,

          // Coordinates:
          x: -50,
          y: -50,
          z: -50,

          // Rotation:
          xRot: 0,
          yRot: 0,
          zRot: 0,

          // Dimensions:
          height: 50,
          width: 50,
          depth: 100,
          
        }
      ],

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
    window.addEventListener('scroll', this.handleScroll);
    // this.anim_frame();
  },

  destroyed() {
    // So we don't keep trying to call this on other pages
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    anim_frame() {
      this.objects[0].xRot += .2;
      this.objects[0].yRot += .2;
      this.objects[0].zRot += .2;
      setTimeout(this.anim_frame, 10);
    },

    add_cube() {
      let _id = 'cube' + (this.objects.length + 1);
      let name = 'Cube ' + (this.objects.length + 1);

      let random_x = Math.floor((Math.random() * 600) - 300);
      let random_y = Math.floor((Math.random() * 600) - 300);
      let random_z = Math.floor((Math.random() * 600) - 300);

      let random_height = Math.floor(Math.random() * 100);
      let random_width = Math.floor(Math.random() * 100);
      let random_depth = Math.floor(Math.random() * 100);

      this.objects.push({
        type: 'cube',
        name: name,
        _id: _id,

        color: 'c1',
        opacity: 1,

        x: random_x,
        y: random_y,
        z: random_z,

        xRot: 0,
        yRot: 0,
        zRot: 0,

        height: random_height,
        width: random_width,
        depth: random_depth,
        
      })
    },

    // When the user scrolls: 
    // todo: this
    handleScroll(evt) {
      // evt.preventDefault();
      // console.log(window.scrollY)
    },

    // When the user clicks on the canvas:
    mouse_down(evt) {
      // We want to find the difference between the initial click & the drag,
      // instead of the actual coordinate
      this.previous_y_click = evt.y;
      this.previous_x_click = evt.x;
      this.drag_canvas = true;
    },
    // When the user drags with the mouse down:
    mouse_drag(evt) {
      if (this.drag_canvas) {
        // Calculating the difference between the previous & current coord
        let y_change = this.previous_y_click - evt.y;
        let x_change = this.previous_x_click - evt.x;

        this.previous_y_click = evt.y;
        this.previous_x_click = evt.x;
        // We add the y mouse change rotate_x because the y mouse change is 
        // vertical, and rotating around x is also vertical. 
        this.camera_rotate_x += y_change;
        this.camera_rotate_y += x_change;
      }
    },
    // When the user releases:
    mouse_up() {
      this.drag_canvas = false;
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
  overflow: hidden;
  
  width: 100%;
  height: 600px;
  box-shadow: 0px 0px 5px inset rgba(0,0,0,.5);
}
  // This lets us make the center of the stage 0,0,0
  //   We couldn't do this directly to .space-canvas without moving the vanishing pt
.canvas-camera {
  transform: rotatex(0deg);
  padding-left: 50%;
  padding-top: 300px;
  width: 100%;
  height: 100%;
  // border: solid 1px white;
  transform-style: preserve-3d;
}

.object {
  position: absolute;
  transform-style: preserve-3d;
  // div {border: solid 2px red;}
  cursor: pointer;
}
.object:hover::after {
  content: '';
  display: none;
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
  left: 285px;
}

.object-info, .canvas-info {
  position: absolute;
  margin-top: 10px;
  z-index: 11;
  opacity: .3;
  width: 200px;
  cursor: pointer;
  &:hover {
    opacity: 1;
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

.grid {
  // taken from https://codepen.io/jasonadelia/pen/DnrAe
  position: absolute;
  width: 800px;
  height: 800px;
  // Centering it
  margin-top: -400px;
  margin-left: -400px;

  transform: rotatex(90deg);

  background-color: transparent;
  background-image: linear-gradient(0deg, 
    transparent 24%, 
      rgba(255, 255, 255, .2) 25%, 
      rgba(255, 255, 255, .2) 26%, 
      transparent 27%, 
      transparent 74%, 
      rgba(255, 255, 255, .2) 75%, 
      rgba(255, 255, 255, .2) 76%, 
      transparent 77%, transparent), 
    linear-gradient(90deg, 
      transparent 24%, 
      rgba(255, 255, 255, .2) 25%, 
      rgba(255, 255, 255, .2) 26%, 
      transparent 27%, 
      transparent 74%, 
      rgba(255, 255, 255, .2) 75%, 
      rgba(255, 255, 255, .2) 76%, 
      transparent 77%, 
      transparent);
  background-size: 50px 50px;
}


.origin-indicator {
  border: solid 4px red;
  left: 50%;
  top: 50%;
}
.origin-indicator::after {
  content: '';
  position: absolute;
  margin-top: -4px;
  margin-left: -4px;
  transform: rotatey(90deg);
  border: solid 4px blue;
  left: 50%;
  top: 50%;
}

.cube {

}

.object-thumb {
  font-size: var(--small-font-size);
  padding: 10px;
  width: calc(100% + 20px);
  margin-left: -10px;
  display: flex;
  cursor: pointer;
  &:hover, &.selected {
    background: var(--card-light);
  }
  .thumbnail {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
}

.canvas-options-container {
  padding: 10px;
}

</style>