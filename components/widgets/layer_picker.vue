<template>
<!-- Generic object editor component. Use:
  
  <layer-picker
    :layers="my_array_of_objects" 
    :value="array_path_selection"
    :layerTitleKey="string"
    @input="handle_update($event)">
  </object-editor>

 -->
<div class="layers">
  <div class="layer" v-for="(layer, layer_i) in layers"
    :style="{'padding-left': depth * 2 + 'px'}">

    <div class="layer-info" @click="$emit('input', new_path(layer_i))"
      :class="{ selected: is_selected(layer_i) }"
    >
      {{layer[layerTitleKey]}} - {{is_selected(layer_i)}}
      <div @click.stop="expanded = !expanded" class="icon-button" v-if="layer.data">
        <left-arrow-icon v-if="!expanded"></left-arrow-icon>
        <down-arrow-icon v-else></down-arrow-icon>
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

    layerTitleKey: String,

    // The path to this node.
    path: {
      type: Array,
      default() {
        return [];
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
      expanded: true,
    }
  },
  methods: {
    new_path(index) {
      let new_path = JSON.parse(JSON.stringify(this.path));
      new_path.push(index);
      return new_path;
    },
    is_selected(index) {
      return JSON.stringify(this.value) == JSON.stringify(this.new_path(index));
    },
  }

}
</script>

<style lang="scss" scoped>
.layers {
  font-size: var(--small-font-size);
  max-height: 300px;
  overflow-y: scroll;
  cursor: pointer;
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
  padding: 5px;

  &:hover {
    background: var(--card-light);
  }
  &.selected {
    background: var(--card-lighter);
  }
}
.icon-button {
  width: 12px;
  height: 12px;
  margin-left: 5px;
  marg-in-right: 20px;
}
</style>