<template>
<!-- Article header: -->
<div class="article-header">
  <text-field v-if="editable"
  :value="value.content" @input="emit_update([], 'content', $event)"
  nobox
  placeholder="Article Title" 
  nounderline>
  </text-field>
  <h1 v-else>{{value.content}}</h1>
</div>
</template>

<script>

export default {
  props: {
    value: {
      type: Object
    },
    editable: {
      type: Boolean
    }
  },
  methods: {
    // new update func:
    emit_update(path, new_index, new_val) {
      let new_path = path;
      new_path.unshift(new_index)
      this.$emit('input', {
        path: new_path,
        new_val: new_val,
      });
    },
  }
}

</script>

<style lang="scss">

// Styling for different element types:
.article-header input{
  font-weight: bold;
  font-size: var(--h1-font-size);
}
</style>