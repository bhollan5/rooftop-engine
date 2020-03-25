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

    <div class="svg-update">
      <div class="input-flex-container">
        <text-field v-model="fillFinder" :title="'Fill selector:'" :placeholder="'Type color here'"></text-field>
        <text-field v-model="strokeFinder" :title="'Stroke selector:'" :placeholder="'Type color here'"></text-field>
      </div>
      <button @click="changeXMLDocFill('red', 'pink', xmlDoc)"> Change fill</button>
    </div>

    <br><hr><br>

    <div class="layer-info" v-if="selectedLayer.nodeName">
      <h4>Layer info for: <b>{{selectedLayer.nodeName}}</b></h4>
      <div v-if="layerTransformInfo">Transform info: <b>matrix(
        {{Math.round(layerTransformInfo.a)}},{{Math.round(layerTransformInfo.b)}},
        {{Math.round(layerTransformInfo.c)}},{{Math.round(layerTransformInfo.d)}},
        {{Math.round(layerTransformInfo.e)}},{{Math.round(layerTransformInfo.f)}} )
        </b>
      </div>
      <div v-if="selectedLayer.style" class="input-flex-container">
        <text-field v-model="selectedLayer.style.fill" :title="'Fill:'" :placeholder="'None'" 
        class="menu-input" readonly></text-field>
        <text-field v-model="selectedLayer.style.stroke" :title="'Stroke:'" :placeholder="'None'" 
        class="menu-input" readonly></text-field>
      </div>
    </div>

    <!-- This section has text fields for various properties. Maybe todo later
    <div v-if="selectedLayer.style && 0" class="input-flex-container">
      <text-field v-model="selectedLayer.style.fill" :title="'Fill'" :placeholder="'None'" 
        class="menu-input" v-if="0"></text-field>
      <text-field v-model="selectedLayer.style.stroke" :title="'Stroke'" :placeholder="'None'" 
        class="menu-input" v-if="0"></text-field>
      <!-- Any other attributes that have data are displayed here. Hidden for now 
      <text-field v-for="(styleEl, styleEl_i) in layerStyleInfo" v-if="styleEl.value && 0" v-model="styleEl.value" 
      :title="styleEl.key" :placeholder="'None'" :key="'styleEl' + styleEl_i"
        class="menu-input"></text-field>
    </div>-->

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

      fillFinder: '',
      strokeFinder: '',
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
    // Call this to replace a fill attribute with a new color!  
    changeXMLDocFill(fillStart, fillUpdate, xmlDoc) {
      // Iterate thru each node in the tree
      for (let i in xmlDoc.documentElement.childNodes) {
        if (xmlDoc.documentElement.childNodes.hasOwnProperty(i)){
          // Call this on the next node
          this.nodeFillChanger(fillStart, fillUpdate, xmlDoc.documentElement.childNodes[i]);
        }
      }
      let xmlString = this.xml2string(xmlDoc);
      this.updateObjFromString(xmlString)
    },

    // Iterate thru the dom, make necessary changes
    nodeFillChanger(fillStart, fillUpdate, node) {
      // Iterate thru each node in the tree
      for (let i in node.childNodes) {
        if (node.childNodes.hasOwnProperty(i)){
          // Call this on the next node
          let updatedNode = this.nodeFillChanger(fillStart, fillUpdate, node.childNodes[i]);
          node.replaceChild(node.childNodes[i], updatedNode); 
        }
      }
      // change the attributes of *this* node, if it has a style attribute
      if (node.style){
        node.setAttribute("style", "fill:pink;");
      }
      return node;
    },

    // Turns the xml obj to a string
    xml2string(xmlObj) {
      if (!xmlObj.documentElement) {
        return 'Not a valid xml doc';
      }
      let serializer = new XMLSerializer();
      let str = serializer.serializeToString(xmlObj);
      return str;
    },

    // Pass in a string to update the svg image
    updateObjFromString(xmlString) {
      // Making a DOMParser to parse the string into an XML doc
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(xmlString,"text/xml");    
      this.xmlDoc = xmlDoc;
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