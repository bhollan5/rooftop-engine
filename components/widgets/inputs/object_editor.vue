<template>
<!-- A shallow object editor. -->
<div class="object-editor">

  <!-- Fields in the object: -->
  <div v-for="(value, key) in object" class="field-container">

    <text-field v-if="typeof(value) == 'string'" nopadding
      :value="value" 
      @input="$emit('input', { value: $event, field: key })"
      :title="key">
    </text-field>

  </div>
  
</div>
</template>

<script>

export default {
  name: 'object-editor',
  props: {
    object: Object,
  },
  data() {
    return {
      expanded: true,
    }
  },
  components: {
    
  }
}
</script>

<style lang="scss">
.object-display {
  font-size: var(--small-font-size);
}
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