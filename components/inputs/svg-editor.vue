<template>
<div id="svg-editor">

  <div class="flex-container">
    <div id="svg-layers">
      <svg-layer v-for="(node, node_i) in nodeTree" :layer="node" :key="'layer' + node_i"></svg-layer>
    </div>
    <div id="svg-canvas" v-html="rawSvgData">
    </div>
  </div>

</div>
</template>

<script>
import svgLayer from '~/components/inputs/svg-layer.vue';

export default {
  data() {
    return {
      nodeTree: []
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
  position: absolute; 
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
</style>