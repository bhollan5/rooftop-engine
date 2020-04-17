<template>
<div class="layers">
  <div class="layer" v-for="(layer, layer_i) in layers"
    :style="{'padding-left': depth * 2 + 'px'}">

    <div class="layer-info" @click="$emit('input', path)">
      {{layer.key}}
      <div @click.stop="expanded = !expanded" class="icon-button">
        <down-arrow-icon v-if="!expanded"></down-arrow-icon>
        <up-arrow-icon v-else></up-arrow-icon>
      </div>
    </div>

    <layer-picker :layers="layer.data" 
      :depth="depth + 1" 
      :index="layer_i"
      :path="new_path(layer_i)"
      v-if="expanded"
      :value="value"
      @input="$emit('input', $event)"
    ></layer-picker>
    
  </div>
</div>
</template>

<script>
export default {
  name: 'layer-picker',
  props: {
    // The current path selected. 
    value: Array,
    // The current root of our tree
    layers: {
      type: Array,
    },
    // The path to this node.
    path: {
      type: Array,
      default() {
        return [0];
      }
    },
    // The recursive depth of this node
    depth: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      expanded: false,
    }
  },
  methods: {
    new_path(index) {
      let new_path = JSON.parse(JSON.stringify(this.path));
      new_path.push(index);
      return new_path;
    }
  }

}
</script>

<style lang="scss" scoped>
.layers {
  font-size: var(--small-font-size);
}
.layer {
  width: 100%;
  
}
.layer-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px;
  background: var(--card);
  width: 100%;
  height: 20px;
  &:hover {
    background: var(--card-light);
  }
}
.icon-button {
  width: 12px;
  height: 12px;
  margin-left: 5px;
}
</style>