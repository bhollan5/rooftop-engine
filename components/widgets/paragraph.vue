<template>
<!-- Paragraphs: -->
<div class="paragraph-widget">
  <text-field placeholder="Regular paragraphs go here!" 
  v-if="editable"
  textarea fontsize="regular"
  nounderline
  :value="value.content" @input="update_data('content', $event)"
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
    update_data(field, new_val) {
      let data_update = JSON.parse(JSON.stringify(this.value));
      data_update[field] = new_val;
      this.$emit('input', data_update);
    }
  }
}

</script>