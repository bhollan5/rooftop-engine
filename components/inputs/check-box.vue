<template>
<div class="checkbox-container">
  <div class="title">{{title}}</div>
  <input type="checkbox" :checked="value" @input="$emit('input', $event.target.checked)">
</div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    value: {
      type: Boolean,
    },
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.checkbox-container {
  display: flex;
  font-size: var(--small-font-size);
  align-items: center;
  justify-content: space-between;
  width: 100px;
}
</style>