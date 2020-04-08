<template>
<!-- Article header: -->
<div class="article-header">
  <text-field v-if="editable"
  :value="value.content" @input="update_data('content', $event)"
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
    update_data(field, new_val) {
      let data_update = JSON.parse(JSON.stringify(this.value));
      data_update[field] = new_val;
      this.$emit('input', data_update);
    }
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