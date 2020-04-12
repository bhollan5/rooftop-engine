<template>
<div class="object-display">

  <!-- The object label + open bracket. -->
  <div class="flex-container" @click="expanded = !expanded">
    <!-- The icon to minimize objects -->
    <div class="minimizer" v-if="expanded">–</div>
    <div class="minimizer" v-if="!expanded">+</div>
    <div class="secondary">{{title}}: </div> 
    <div class="a" style="margin-left: 5px;"> Object</div>
  </div>

  <!-- The fields in that object: -->
  <div v-for="(value, key) in object" v-if="expanded"
    :style="{ 'margin-left': depth * 10 + 'px'}"
  >

    <!-- Display for strings: -->
    <div v-if="typeof(value) == 'string'"
      :title="key"
      :value="value"
      readonly
    >
      <span class="secondary">{{key}}:</span>
      {{value}}
    </div>

    <!-- Recursive display for objects: -->
    <object-display v-else-if="typeof(value) == 'object'"
      :title="key"
      :object="value"
      :depth="depth + 1"
    ></object-display>

  </div>
  
</div>
</template>

<script>
import objectDisplay from '~/components/widgets/debug/object_display.vue';

export default {
  name: 'object-display',
  props: {
    title: [String, Number],
    object: [Object, Array],
    depth: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      expanded: true,
    }
  },
  components: {
    objectDisplay,
  }
}
</script>

<style lang="scss">
.minimizer {
  width: 15px;
  text-align: center;
  color: var(--card-text2);
  cursor: pointer;
  &:hover {
    color: var(--card-text);
  }
}
</style>