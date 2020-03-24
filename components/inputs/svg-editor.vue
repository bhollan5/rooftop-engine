<template>
<div id="svg-editor">

  <div class="flex-container">
    <div id="svg-layers">
      <svg-layer v-for="(node, node_i) in nodeTree" v-if="node.nodeName != '#text'" :layer="node" :key="'layer' + node_i"
        @layerselect="selectedLayer = $event" ></svg-layer>
    </div>
    <div id="svg-canvas" v-html="rawSvgData">
    </div>
  </div>
  <div id="layer-examiner">
    Layer select: {{selectedLayer.nodeName}}
    <div v-if="selectedLayer.style">
      <p class="flex-container">Fill: <text-field v-model="selectedLayer.style.fill"></text-field></p>
      <p class="flex-container">Stroke: <text-field v-model="selectedLayer.style.stroke"></text-field></p>
    </div>
  </div>

</div>
</template>

<script>
import svgLayer from '~/components/inputs/svg-layer.vue';

export default {
  data() {
    return {
      nodeTree: [],
      selectedLayer: {},
    }
  },
  components: {
    svgLayer
  },
  computed: {
    rawSvgData() {
      return this.$store.getters['svg/rawSvgData'];
    }
  },
  mounted() {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(this.rawSvgData,"text/xml");    

    this.nodeTree = xmlDoc.documentElement.childNodes;

    console.log(this.nodeTree);
  },

  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
#svg-editor {
  border: solid 2px coral;
  position: fixed; 
  z-index: 12;
  left: 50%;
  top: 200px;
  transform: translatex(-50%);
}

#svg-layers {
  width: 200px;
  height: 300px;
  background: var(--bg);
  color: var(--bg-text);
  overflow-y: scroll;
}

#svg-canvas {
  width: 300px;
  height: 300px;
  background: var(--bg);
}

#layer-examiner {
  height: 100px;
  width: 100%;
  background: var(--bg2);
  color: var(--bg-text);
  padding: 10px;
  font-size: var(--small-font-size);
  p {
    font-size: var(--small-font-size);
  }
}
</style>