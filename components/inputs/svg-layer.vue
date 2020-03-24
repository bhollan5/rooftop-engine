<template>
<div class="layer" >

  <div class="layer-info" @click="logInfo()">
    <div class="expander" @click="expanded = !expanded">
      <span v-if="!expanded && hasChildren">▶</span>
      <span v-else-if="hasChildren">▼</span>
    </div>
    <div class="layer-thumb">
      <svg viewBox="0 0 150 150" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"  
        xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"  
        style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;fill:white;"
        v-html="svgString"></svg>
    </div>
    {{layer.nodeName}} - {{layer.childNodes.length}} kids
  </div>

  <svg-layer v-for="(childnode, node_i) in layer.childNodes" 
              v-if="expanded && hasChildren && childnode.nodeName != '#text'" 
    @layerselect="$emit('layerselect', $event)" :layer="childnode" :key="'sublayer' + node_i"></svg-layer>

</div>
</template>

<script>
import svgLayer from '~/components/inputs/svg-layer.vue';

export default {
  name: 'svg-layer',
  data() {
    return {
      expanded: false
    }
  },
  props: {
    layer: {

    }
  },
  components: {
    svgLayer,
  },
  mounted() {
  },
  computed: {
    svgString() {
      let serializer = new XMLSerializer();
      let str = serializer.serializeToString(this.layer);
      return str;
    },
    hasChildren() {
      return (this.layer.childNodes.length)
    }
  },
  methods: {
    logInfo() {
      this.$emit('layerselect', this.layer)
      if (this.layer.style){
        console.log(this.layer.transform)
      }
    }
  }
}
</script>

<style lang="scss">
.layer {
  padding-left: 5px;
  border: solid 1px black;
}
.layer-info {
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: var(--small-font-size);
}
.layer-thumb {
  // overflow: hidden;
  height: 30px;
  width: 30px;
  box-shadow: 0px 0px 5px white;
  margin-right: 10px;
  svg {
    height: 30px; width: 30px;
  }
}

.expander {
  width:  20px;
  font-size: var(--small-font-size);
  cursor: pointer;
}

svg g {
  width: 100%;
  height: 100%;
}
</style>