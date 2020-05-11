<template>
<div class="option-picker">
  <div v-for="option in options" class="option"
    :class="{selected: value == option}"
    @click="$emit('input', option)">
    {{option}}
  </div>

</div>
</template>

<script>
export default {
  name: 'option-picker',
  props: {
    options: {
      type: Array,
      default() {
        return ['option 1!','option 2!']
      }
    },
    value: [String, Number]
  }
}
</script>

<style lang="scss" scoped>
.option-picker {
  background: var(--card);
  display: inline-flex;
  font-size: var(--small-font-size);
  border-radius: 2px;
  .option {
    padding: 2px 5px;
    cursor: pointer;
    background: var(--card-light);
    cursor: pointer;
    border: solid 1px var(--card-light);
    &.selected {
      background:var(--card-dark);
    }
  }
}
</style>