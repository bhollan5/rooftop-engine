<template>
<div class="slider flex-container align-center">

  <div class="title">{{title}}</div>
  
  <div class="slider-bar" ref="slider-bar"
    @click="move($event)">
    <div class="slider-grab"
    :style="{
      left: slider_grab_pos + '%'
    }" 
    @mousedown="grab($event)"></div>
  </div>

  <text-field :value="value" 
    @input="(newVal) => $emit('input', Number(newVal))"
    nopadding smallfont number></text-field>
  
</div>
</template>

<script>

export default {

  data() {
    return {
      // Grabbing the value indicator
      grabbed: false,

      // The pixel positions of the slider
      left_pos: 0,
      right_pos: 0,
    }
  },

  computed: {
    slider_grab_pos() {
      if (this.value > this.max) {
        return 100;
      } else if (this.value < this.min) {
        return 0;
      }
      return Math.floor((this.value / this.max) * 100);
    },

    range() {
      return this.max - this.min;
    }
  },

  mounted() {
    this.get_bounding_box();
  },

  destroyed() {
    this.ungrab();
  },

  watch: {

  },

  props: {
    
    // the v-model value
    value: {
      type: Number
    },

    // min/max:
    min: Number,
    max: Number,

    title: {
      type: String,
      default: '',
    },

  },

  methods: {
    // This grabs the absolute pixel positions of the left and right ends of the slider.
    get_bounding_box() {
      let box = this.$refs['slider-bar'].getBoundingClientRect();
      this.left_pos = box.left;
      this.right_pos = box.right;
    },

    // On mousedown on the indicator
    grab(evt) {
      this.grabbed = true;
      window.addEventListener('mousemove', this.move);
      window.addEventListener('mouseup', this.ungrab);
    },
    // Called via mousemove event listener
    move(evt) {
      // First we find how far our mouse is from the left part of the bar
      let distance_from_left = evt.x - this.left_pos;
      // Then we see how far *that* point is from the right part
      let percentage = distance_from_left / (this.right_pos - this.left_pos);
      // then we use that percentage to find the new value
      let new_val = Math.floor(this.range * percentage) + this.min;
      if (new_val >= this.max) return this.max;
      if (new_val < this.min) return this.min;
      this.$emit('input', new_val);
    },
    // On mouseup anywhere
    ungrab() {
      window.removeEventListener('mousemove', this.move);
      window.removeEventListener('mouseup', this.ungrab);
    },

  },

}

</script>

<style scoped lang="scss">

// The entire component:
.slider {
  position: relative;
  width: 100%;  
}

.slider-bar {
  width: calc(100% - 60px);
  height: 4px;
  background: var(--input-dark);
  position: relative;

  .slider-grab {
    width: 10px;
    height: 10px;
    position: absolute;
    // Centering it:
    margin-top: -3px;
    margin-left: -3px;

    cursor: grab;
    background: var(--input-text);
    border-radius: 50%;
  }
}

.text-field {
  width: 40px;
  margin-left: 20px;
}


.title {
  font-size: var(--small-font-size);
  color: var(--bg-text2);
  margin-bottom: -3px;
  margin-left: 3px;
}
</style>