<template>
<svg v-if="tag == 'svg'" width="100%" height="100%"
  :viewBox="attributes.viewBox"
  :style="attributes.style"
  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"
>
  <svg-render v-for="(el, el_i) in elements"
    :key="'svg-' + el.key + '-' + el_i + 'depth' + el.depth"
    :depth="depth + 1"
    :data="el.data"
    :tag="el.key">
  </svg-render>
</svg>
<g v-else-if="tag == 'g'" :transform="attributes.transform">
  <svg-render v-for="(el, el_i) in elements"
    :key="'svg-' + el.key + '-' + el_i + 'depth' + el.depth"
    :depth="depth + 1"
    :data="el.data"
    :tag="el.key">
  </svg-render>
</g>
<circle v-else-if="tag == 'circle'" 
  :style="attributes.style" 
  :cx="attributes.cx"
  :r="attributes.r">
</circle>
</template>

<script>
export default {
  name: 'svg-renderer',
  props: {
    data: [Object, String, Array],
    tag: [String, Number],
    depth: {
      type: Number,
      default: 1,
    }
  },
  computed: {
    // Computing the element nodes, as opposed to the attributes.
    elements() {
      return this.$svg.get_node_elements(this.data);
    },
    // Attributes for this element
    attributes() {
      let attributes = {};
      for (let key in this.data) {
        if (key[0] == '@') {
          let attr_name = key.slice(1);
          attributes[attr_name] = this.data[key];
        }
      }
      return attributes;
    }
  },
}
</script>

<