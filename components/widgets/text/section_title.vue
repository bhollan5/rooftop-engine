<template>
<!-- Section titles: -->
<div class="section-title" v-if="editable">
  <text-field :value="value.content" @input="update_data('content', $event)"
    nobox fontsize="h3"
    nounderline
    placeholder="1. Section Title">
  </text-field>
</div>
<!-- Section titles: -->
<h3 class="section-title" v-else>
  {{value.content}}
</h3>
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

<style lang="scss" scoped>

.section-title {
  input {
    font-weight: bold;
    text-align: center;
  }
}
h3.section-title {
  text-align: center;
}
</style>