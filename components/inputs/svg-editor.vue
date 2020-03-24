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
    Layer select: <b>{{selectedLayer.nodeName}}</b>
    <div v-if="layerTransformInfo">Transform info: <b>matrix(
      {{Math.round(layerTransformInfo.a)}},{{Math.round(layerTransformInfo.b)}},
      {{Math.round(layerTransformInfo.c)}},{{Math.round(layerTransformInfo.d)}},
      {{Math.round(layerTransformInfo.e)}},{{Math.round(layerTransformInfo.f)}} )
      </b>
    </div>

    <div v-if="selectedLayer.style" class="input-flex-container">
      <text-field v-model="selectedLayer.style.fill" :title="'Fill'" :placeholder="'None'" 
        class="menu-input"></text-field>
      <text-field v-model="selectedLayer.style.stroke" :title="'Stroke'" :placeholder="'None'" 
        class="menu-input"></text-field>
        
      <!-- Any other attributes that have data are displayed here: -->
      <text-field v-for="(styleEl, styleEl_i) in layerStyleInfo" v-if="styleEl.value" v-model="styleEl.value" 
      :title="styleEl.key" :placeholder="'None'" :key="'styleEl' + styleEl_i"
        class="menu-input"></text-field>
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
    },
    // Formatting data to look at the layer style
    layerStyleInfo() {
      if (!this.selectedLayer.style) {
        return;
      }
      let layerStyles = []
      for (let i in this.selectedLayer.style) {
        if (this.selectedLayer.style.hasOwnProperty(i)) {
          layerStyles.push({
            key: i,
            value: this.selectedLayer.style[i]
          })
        }
      }
      return layerStyles;
    },
    layerTransformInfo() {
      if (!this.selectedLayer.transform || !this.selectedLayer.transform.baseVal.length) {
        return;
      }
      let transformInfo = this.selectedLayer.transform.baseVal[0].matrix;
      console.log(transformInfo);
      return transformInfo;
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
  box-shadow: 0px 0px 10px black;
  position: fixed; 
  z-index: 12;
  left: 50%;
  top: 200px;
  transform: translatex(-50%);
  overflow-y: scroll;
}

#svg-layers {
  width: 200px;
  height: 300px;
  background: var(--card);
  color: var(--card-text);
  overflow-y: scroll;
}

#svg-canvas {
  width: 300px;
  height: 300px;
  background: var(--bg);
}

#layer-examiner {
  min-height: 100px;
  width: 100%;
  background: var(--bg2);
  color: var(--bg-text);
  padding: 10px;
  font-size: var(--small-font-size);
  p {
    font-size: var(--small-font-size);
  }
}

.input-flex-container {
  width: 300px;
}

</style>