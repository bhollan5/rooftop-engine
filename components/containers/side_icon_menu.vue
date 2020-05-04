<template>
<container :width="width" overflowx="hidden" :startDepth="2">
  <div class="slideout-menu" 
    @mouseover="width = expandWidth"
    @mouseout="width = iconWidth"
  >
    <slot></slot>
  </div>
</container>
</template>

<script>
export default {
  props: {
    iconWidth: {
      type: Number,
      default: 50
    },
    expandWidth: {
      type: Number,
      default: 300,
    },
    focused: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      width: this.iconWidth,

    }
  }
}
</script>

<style lang="scss" scoped>
.slideout-menu {
  min-width: 500px;
}
</style>