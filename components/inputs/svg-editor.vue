<template>
<div id="svg-editor">

  <div class="flex-container">

    <div id="svg-layers" v-if="xmlDoc.documentElement">
      <!-- Our recursive layer display component.
        The v-for shows it only 1. once it's loaded, and 2. if it's not a text layer. -->
      <svg-layer v-for="(node, node_i) in xmlDoc.documentElement.childNodes" 
        v-if="node.nodeName != '#text'" :layer="node" 
        :key="'layer' + node_i" @layerselect="selectedLayer = $event" ></svg-layer>
    </div>

    <div id="svg-canvas" v-html="svgString" v-if="1">
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

      <button @click="fillChanger('red', 'pink', xmlDoc.documentElement)"></button>

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
      // xmlDoc docs: https://www.w3schools.com/xml/dom_intro.asp
      xmlDoc: [],
      selectedLayer: {},
    }
  },
  components: {
    svgLayer
  },
  computed: {

    // Takes the node tree and turns it into a string!
    svgString() {
      // Checking if the image is loaded in:
      if (!this.xmlDoc.documentElement) {
        return;
      }
      let serializer = new XMLSerializer();
      let str = serializer.serializeToString(this.xmlDoc);
      return str;
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
    // Formatting data to look at transform info
    layerTransformInfo() {
      if (!this.selectedLayer.transform || !this.selectedLayer.transform.baseVal.length) {
        return;
      }
      let transformInfo = this.selectedLayer.transform.baseVal[0].matrix;
      console.log(transformInfo);
      return transformInfo;
    },

  },
  mounted() {
    // Grabbing the svgString from the store (it was passed from components/inputs/svg-uploader.vue)
    let rawSvgString = this.$store.getters['svg/rawSvgData'];

    // Making a DOMParser to parse the string into an XML doc
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(rawSvgString,"text/xml");    

    this.xmlDoc = xmlDoc;
  },

  methods: {
    changeFill(fillStart, fillUpdate) {
      for (let i in this.xmlDoc.documentElement.childNodes) {
        if (this.xmlDoc.documentElement.childNodes[i].childNodes.length > 0) {
          this.fillChanger(fillStart, fillUpdate, this.xmlDoc.documentElement.childNodes[i])
        }
      }
    },
    // Iterate thru the dom, make necessary changes
    fillChanger(fillStart, fillUpdate, node) {
      // Iterate thru each node in the tree
      for (let i in node.childNodes) {
        if (node.childNodes.hasOwnProperty(i)){
          // if the node has kids, call this on each kid
          console.log("Traversing..." + node.nodeName)
          if (node.childNodes[i].childNodes && node.childNodes[i].childNodes.length > 0) {
            this.fillChanger(fillStart, fillUpdate, node.childNodes[i]);
          }

        }
      }
      // change the attributes of *this* node
      console.log(" style b4: ");
      console.warn(node.getAttribute("style"))
      node.setAttribute("style", "fill:pink;");
      console.log(" style after: ");
      console.warn(node.getAttribute("style"))
      this.$forceUpdate(); 
    }
    
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