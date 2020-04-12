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
    update_data(field, new_val) {
      let data_update = JSON.parse(JSON.stringify(this.value));
      data_update[field] = new_val;
      console.log("paragraph.vue: Updating " + field + " to be " + new_val);
      this.$emit('input', data_update);
    },

    // new update func:
    emit_update(path, new_index, new_val) {
      console.log("para.vue: Recieved path: ", path);
      let new_path = path;
      new_path.unshift(new_index)
      console.log("para.vue: Emitting path: ", new_path);
      this.$emit('input', {
        path: new_path,
        new_val: new_val,
      });
    },

  }
}

</script>