<template>
<!-- Subsection title, with bullet:  -->
<div class="subsection-title-container" v-if="editable">
  
  <text-field class="subsection-number" 
  placeholder="1.1" 
  fontsize="regular"
  nounderline
  :value="value.index" @input="update_data('index', $event)" 
  nobox></text-field>
  
  <text-field class="subsection-title" 
  fontsize="regular"
  placeholder="Subsection Header"
  :value="value.content" @input="update_data('content', $event)"
  nobox
  nounderline></text-field>

</div>
<div class="subsection-title-container" v-else>
  <p class="subsection-number">{{value.index}}</p>
  <p class="subsection-title">{{value.content}}</p>
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

<style lang="scss" scoped>
// TODO: The subsection should be closer to the paragraphs.
.subsection-title-container {
  display: flex;
  width: 100%;
  justify-content: space-between;

  .subsection-number {
    width: 50px;
    margin: 0px;
  }
  .subsection-title {
    margin: 0px;
    width: calc(100% - 70px);
  }
  input {
    font-weight: bold;
    font-size: var(--regular-font-size);
  }
}
</style>