<template>
<div class="layer" >

  <div class="layer-info" @click="logInfo()">
  
    <div class="expander" v-if="hasChildren" @click="expanded = !expanded">
      <span v-if="!expanded">▶</span>
      <span v-else>▼</span>
    </div>

    <div class="layer-thumb">
      <svg viewBox="0 0 150 150" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"  
        xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"  
        style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;fill:white;"
        v-html="svgString"></svg>
    </div>
    {{layer.nodeName}} 
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
      expanded: true
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
      console.log(this.layer.getAttribute("style"))
      this.$emit('layerselect', this.layer)
    }
  }
}
</script>

<style lang="scss" scoped>
.layer {
  padding-left: 10px;
}
.layer-info {
  display: flex;
  align-items: center;
  padding: 10px;
  padding-left: 5px;
  user-select: none;
  font-size: var(--small-font-size);
  border-bottom: solid 2px var(--card2);
}
.layer-thumb {
  background: var(--bg);
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
  font-size: 10px;
  cursor: pointer;
  background: var(--card2);
  border-radius: 50%;
  text-align: center;
  padding: 4px 2px 2px 4px;
  margin-right: 10px;
  color: var(--card-text2);
}

svg g {
  width: 100%;
  height: 100%;
}
</style>