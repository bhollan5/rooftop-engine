<template>

<div class="space-canvas-container"
  :style="{ 
      background: 'hsl(' + bg_color[0] + ',' +bg_color[1] + '%,' + bg_color[2] + '%)' 
      }">


  <!-- The side bar, with the settings -->
  <side-bar>


    <!-- Settings for the entire project: -->
    <card title="Canvas settings:" flex>
      <!-- Canvas bg color: -->
      <color-palette :margin="1" v-model="bg_color_var"></color-palette>

      <div class="canvas-options-container">
        <checkbox title="Sliders:" v-model="show_sliders"></checkbox>
        <checkbox title="Floating menu:" v-model="floating_menu"></checkbox>
        <checkbox title="Show grid:" v-model="show_grid"></checkbox>
        <checkbox title="Show origin:" v-model="show_origin"></checkbox>
      </div>

    </card>
    <!-- Color picker -->
    <card title="Color palette:" min>
      <simple-palette v-model="bg_color_var"
        :colors="colors"></simple-palette>
    </card>

    <card title="Camera settings: " min>
      <div class="flex-container row-wrap">
        
        <!-- Camera x rotation: -->
        <slider :min="-90" :max="90" v-model="camera_rotate_x" title='x rot:'></slider><br>
        <!-- Upsidedown lock: --> 
        <checkbox title="upside down?" v-model="upsidedown_camera"></checkbox>
        <!-- camera y rotation: -->
        <slider :min="-360" :max="360" v-model="camera_rotate_y" title='y rot:'></slider><br>
        <!-- Camera perspective -->
        <slider :min="20" :max="2000" v-model="perspective" title='persp:'></slider><br>
        
      </div>
    </card>

    <card title="Object generation:" min>
      
      <button @click="generate()">add cube</button>
    </card>


    <card title="Object select:">

      <div v-for="(object, obj_i) in objects" class="object-thumb"
        :class="{ selected: obj_i == o_i }"
        @click="o_i = obj_i">
        <div class="thumbnail"
          :style="{ background: 'var(--' + object.color + ')' }"></div>
        {{ object.name }}
      </div>

    </card>

    <!-- Object info display -->
    <template v-slot:hovering >

      <card :title="'Object settings: ' + objects[o_i].name" min>


        <color-palette :margin="1" v-model="objects[o_i].color"></color-palette>

        <div class="flex-container row-wrap">
          <slider :min="0" :max="1" v-model="objects[o_i].opacity" title="opacity:" nopadding number></slider>
        </div>

        <!-- Position -->
        <div class="flex-container row-wrap">
          <slider :min="-500" :max="500" v-model="objects[o_i].x" title='x pos:'></slider><br>
          <slider :min="-500" :max="500" v-model="objects[o_i].y" title='y pos:'></slider><br>
          <slider :min="-500" :max="500" v-model="objects[o_i].z" title='z pos:'></slider><br>
        </div>
        
        <!-- Rotation -->
        <div class="flex-container row-wrap">
          <slider :min="-360" :max="360" v-model="objects[o_i].xRot" title='x rot:'></slider><br>
          <slider :min="-500" :max="500" v-model="objects[o_i].yRot" title='y rot:'></slider><br>
          <slider :min="-500" :max="500" v-model="objects[o_i].zRot" title='z rot:'></slider><br>
        </div>
        
        <!-- Dimensions -->
        <div class="flex-container row-wrap">
          <slider :min="0" :max="500" v-model="objects[o_i].width" title='width:'></slider><br>
          <slider :min="0" :max="500" v-model="objects[o_i].height" title='height:'></slider><br>
          <slider :min="0" :max="500" v-model="objects[o_i].depth" title='depth:'
            v-if="objects[o_i].type != 'plane'"></slider><br>
        </div>

      </card>

    </template>
      

  </side-bar>

  
  

  
  
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

    <cube v-for="(obj, obj_i) in objects" v-if="obj.type == 'cube'"
      :data="obj" :key="obj_i"
      @click="o_i = obj_i"></cube>

    <plane v-for="(obj, obj_i) in objects" v-if="obj.type == 'plane'"
      :data="obj" :key="obj_i" @click="o_i = obj_i"></plane>

    </div>
  </div>

</div>

</template>

<script>
import cube from '@/components/widgets/space_canvas/geometry/cube.vue';
import plane from '@/components/widgets/space_canvas/geometry/plane.vue';

import simplePalette from '~/components/widgets/simple-palette/simple-palette.vue';


export default {
  components: {
    cube,
    plane,
    simplePalette,
  },

  data() { 
    return {
      floating_menu: true,
      
      // Canvas settings:
      perspective: 600,
      show_sliders: true,
      absolute_color: false, // Set to false if yr using a variable color
      bg_color_var: 'bg', // turns into an array in computed bg_color
      drag_canvas: false,
      show_grid: false,
      show_origin: false,

      // For keeping track of the initial click point for click and drag:
      previous_x_click: 0,
      previous_y_click: 0,

      // Camera settings
      camera_rotate_x: -12,
      camera_rotate_y: 60,
      upsidedown_camera: false,

      // Generator: 
      gen_amount: 30,
      
      gen_x_pos: [-300, 300],
      gen_y_pos: [-300, 300],
      gen_z_pos: [-300, 300],

      gen_height: [-300, 300],
      gen_width: [-300, 300],
      gen_depth: [-300, 300],

      gen_colors: ['c1', 'c2', 'c3', 'card', 'bg_text', 'bg_text2'],

      // Object editor settings
      o_i: 0, // The index of the selected object

      objects: [
        { //   Sample cube:
          // Info:
          type: '_cube',
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
          
        },
        {   // Sample plane:
          // Info:
          type: 'plane',
          name: 'Plane 1',
          _id: 'plane2',

          // Rendering:
          color: 'card2',
          opacity: 1,

          // Coordinates:
          x: 0,
          y: 0,
          z: 0,

          // Rotation:
          xRot: 0,
          yRot: 0,
          zRot: 0,

          // Dimensions:
          height: 2200,
          width: 2200,
          depth: 1200,
          
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
    this.generate();
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

    generate() {
      for (let i = 0; i < this.gen_amount; i++) {
        this.add_cube();
      }
    },
    add_cube() {
      let _id = 'cube' + (this.objects.length + 1);
      let name = 'Cube ' + (this.objects.length + 1);

      let random_x = Math.floor((Math.random() * 600) - 300);
      let random_y = Math.floor((Math.random() * 600) - 300);
      let random_z = Math.floor((Math.random() * 600) - 300);

      let random_height = Math.floor(Math.random() * 200) + 20;
      random_y = -random_height / 2;
      let random_width = Math.floor(Math.random() * 40) + 10;
      let random_depth = Math.floor(Math.random() * 40) + 10;

      let random_index = Math.floor(Math.random() * this.gen_colors.length);
      let random_color = this.gen_colors[random_index];
      console.log(random_color);

      this.objects.push({
        type: 'cube',
        name: name,
        _id: _id,

        color: random_color,
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

        // Finally, we apply our changes. The camera rotate x is locked so it can't go upside down. 
        if (Math.abs(this.camera_rotate_x + y_change) < 90 || this.upsidedown_camera){
          // We add the y mouse change rotate_x because the y mouse change is 
          // vertical, and rotating around x is also vertical. 
          this.camera_rotate_x += y_change;
        }
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

.grid {
  // taken from https://codepen.io/jasonadelia/pen/DnrAe
  position: absolute;
  width: 2000px;
  height: 2000px;
  // Centering it
  margin-top: -1000px;
  margin-left: -1000px;

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