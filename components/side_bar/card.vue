<template>
<div class="card">
  <div class="card-header" @click="expanded = !expanded"
    :class="{ expanded: expanded }">
    {{title}}

    <span v-if="expanded">–</span>
    <span v-else >+</span>
  </div>
  <div class="card-body" v-if="expanded">
    <slot>Card content here...</slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'side-bar-card',
  data() {
    return {
      expanded: true
    }
  },
  mounted() {
    this.expanded = !this.min;
  },
  props: {
    title: {
      type: String,
      default: 'Side bar card',
    },
    // initializes the card minimized
    min: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="scss">

// The entire card
.card {
  color: var(--card-text);
  box-shadow: 0px 0px 5px rgba(0,0,0,.5);
  transition-duration: .2s;

  // The top of the card, with a title and minimizing symbols
  .card-header {
    background: var(--card2);
    padding: 10px 10px;
    font-size: var(--small-font-size);
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    // Secondary color text unless expanded or hovered
    color: var(--card-text2);
    &.expanded, &:hover {
      color: var(--card-text);
    }
    
    // The minimize icon:
    span {
      color: var(--card-text2);
      user-select: none;
      &:hover {
        color: var(--card-text);
      }
    }

  }

  // The content of the card, filled out in <slot></slot>
  .card-body {
    padding: 10px;
  }
}
</style>