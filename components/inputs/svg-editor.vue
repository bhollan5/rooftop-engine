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
        <text-field v-model="attributeToChange" :title="'Attribute to Change:'" :placeholder="'fill or stroke'"></text-field>
        <text-field v-model="valueToLookFor" :title="'Value to look for:'" :placeholder="'Some color'"></text-field>
      </div>
      <div class="color-selector">
        <div class="color-option" v-for="(color, i) in themeColors" 
          @click="variableColor = i.replace(/_/g, '-');"
          :style="{ background: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)' }"></div>
          <br>
      </div>
      <text-field v-model="newClass" :title="'New class:'" :placeholder="'This will appear'" readonly></text-field>
      <button @click="changeXMLDocStyle(xmlDoc)"> Change fill</button>
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
        class="menu-input" readonly 
          @click="valueToLookFor = selectedLayer.style.fill.replace(/\s/g, '');attributeToChange='fill'"></text-field>
        <text-field v-model="selectedLayer.style.stroke" :title="'Stroke:'" :placeholder="'None'" 
          @click="valueToLookFor = selectedLayer.style.stroke.replace(/\s/g, '');attributeToChange='stroke'"
        class="menu-input" readonly></text-field>
      </div>
      
    </div>

    <!-- This section has text fields for various properties. Maybe later we can look into this more.
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

    <text-field v-model="svgString" :title="'Full svg string:'" :placeholder="'No svg string!'" 
        readonly></text-field>

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

      attributeToChange: '',
      valueToLookFor: '',
      variableColor: '',
    }
  },
  components: {
    svgLayer
  },
  computed: {

    // New class, computed based on attribute 
    newClass() {
      return this.attributeToChange + '-' + this.variableColor;
    },

    // To display various options
    themeColors() {
      return this.$store.getters['themes/themeScriptObj'].colors;
    },

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
    changeXMLDocStyle(xmlDoc) {
      // Iterate thru each node in the tree
      for (let i in xmlDoc.documentElement.childNodes) {
        if (xmlDoc.documentElement.childNodes.hasOwnProperty(i)){
          // Call this on the next node
          this.nodeFillChanger(xmlDoc.documentElement.childNodes[i]);
        }
      }
      let xmlString = this.xml2string(xmlDoc);
      this.updateObjFromString(xmlString);
      this.$store.commit("svg/setRawSvgData", xmlString)
    },

    // Iterate thru the dom, make necessary changes
    nodeFillChanger(node) {

      // If this node has children, iterate recursively thru each node in the tree.
      for (let i in node.childNodes) {
        if (node.childNodes.hasOwnProperty(i)){
          // Call this on the next node
          let updatedNode = this.nodeFillChanger(node.childNodes[i]);
          node.replaceChild(node.childNodes[i], updatedNode); 
        }
      }

      // Change the attributes of *this* node.
      // If it has a style attribute, we need to search for & remove the original fill/stroke. 
      if (node.style && node.getAttribute('style')){
        // styleString will look like this: "fill:pink;stroke:black;other-attribute:value"
        let styleString = node.getAttribute('style');
        // parsedStyles is an array of strings like this: ["fill:pink", "stroke:black"]
        let parsedStyles = styleString.split(';');
        // The target style string:
        let updatedStyleString = "";
  
        for (let styleAttribute in parsedStyles) {
          if (parsedStyles[styleAttribute]){
            let styleTuple = parsedStyles[styleAttribute].split(':')
            
            // This if statement handles when we find a value we need to change.
            // We don't add it back to updatedStyleString, thus removing it.
            if (styleTuple[0] == this.attributeToChange && styleTuple[1] == this.valueToLookFor) {
              node.setAttribute("class", this.newClass);
            } else {
              // If the attribute DOESN'T match, put it back the way it was. 
              updatedStyleString += styleTuple[0] + ":" + styleTuple[1] + ";"
            }

          }
        }
        node.setAttribute("style", updatedStyleString);
        
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
    },

    
  }
}
</script>

<style lang="scss" scoped>
#svg-editor {
  box-shadow: 0px 0px 10px black;
  position: fixed; 
  z-index: 12;
  left: 50%;
  top: 100px;
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
  width: 100%;
}

.color-selector {
  display: flex;
  flex-flow: row wrap;
  width: 450px;;
}
// Small selectable color options
.color-option {
  width: 15px;
  height: 15px;
  margin: 5px;
  transition: .1s;
  box-shadow: 0px 0px 3px black;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 5px white;
  }
}
</style>