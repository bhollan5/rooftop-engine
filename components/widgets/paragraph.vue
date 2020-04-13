<template>
<!-- Paragraphs: -->
<div class="paragraph-widget">
  <text-field placeholder="Regular paragraphs go here!" 
  v-if="editable"
  textarea fontsize="regular"
  nounderline
  :value="value.content" @input="emit_update([], 'content', $event)"
  nobox></text-field>
  <p v-else>{{value.content}}</p>
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