<template>
<div class="table-widget">
  <div class="row">
    <div v-for="col in columns" class="cel b">
      {{col}}:
    </div>
  </div>

  <div v-for="row in value" class="row">

    <div class="cel" @click="$emit('rowclick', row._id)"
    v-for="column in columns">

      <div v-if="row[column]">{{ row[column] | format_content }}</div>
      <div v-else class="i">[{{ 'No ' + column }}]</div>

      <div class="secondary">id: {{row._id}}</div>

    </div>

  </div>
</div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  props: {
    // This is the data that displays on the table
    value: {
      type: Array,
    },
    // An array of strings
    columns: {
      type: Array,
      default() {
        return ['title', 'data'];
      }
    }
  },
  filters: {
    format_content(content) {
      if (typeof(content) == 'object') {
        return 'Object with ' + content.length + ' nodes';
      }
      return content;
    }
  },
  computed: {
    fields() {
      if (this.value.length){
        return Object.keys(this.value[0]);
      } else {
        return [];
      }
    }
  }
}
</script>

<style lang="scss">
.row {
  font-size: var(--small-font-size);
  display: flex;
  width: 100%;
  cursor: pointer;
  .cel {
    width: 100%;
    border: solid 1px var(--card-light);
    padding: 10px;
    overflow: scroll;
  }
  &:hover {
    background: var(--card-light);
  }
}
</style>