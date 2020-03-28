<template>

<div class="space-canvas">

  <div class="object-info card small-font-size">
    
    <div class="flex-container">
      <text-field title="xRot:" v-model="cube1.xRot" nopadding></text-field>
      <input type="range" min="0" max="360" v-model="cube1.xRot"><br>
    </div>
    
    <div class="flex-container">
      <text-field title="yRot:" v-model="cube1.yRot" nopadding></text-field>
      <input type="range" min="0" max="360" v-model="cube1.yRot"><br>
    </div>
    
    <div class="flex-container">
      <text-field title="Rot:" v-model="cube1.zRot" nopadding> </text-field>
      <input type="range" min="0" max="360" v-model="cube1.zRot"><br>
    </div>

  </div>

  <cube :data="cube1" :color="colors.c1"></cube>

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
      cube1: {
        x: 50,
        y: 100,
        z: 0,

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

.space-canvas {
  position: relative;
  transform-style: preserve-3d;
  perspective: 300px;
}

.object {
  position: absolute;
  transform-style: preserve-3d;
  // div {border: solid 2px red;}
}

.object-info {
 .text-field {
   width: 20px;
 }
}



.cube {

}

</style>