<template>
<div class="checkbox-container">
  <div class="title">{{title}}</div>
  <div class="checkbox"  @click="$emit('input', !value)">
    <check-icon v-if="value"></check-icon>
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
  width: 110px;

  .checkbox {
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: var(--input);
    &:hover {
      background: var(--input-light);
    }
    &:active {
      background: var(--input-dark);
    }
    border: solid 1px var(--input-text2);
    border-radius: 3px;
    svg {
      fill: var(--input-text);
      margin: 0px 2px 4px 2px;
    }
  }
}
</style>