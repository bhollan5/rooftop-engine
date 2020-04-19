<!-- 
  
  Cards are used for secondary content, or for options in the sidebar 
  
  <card title="My card:">
    <p>Card content here</p>
  </card>
  
  <card title="A flex-box card with two sections:" flex>
    <div class="card-section">
      <p>Card content here</p>
    </div>
    <div class="card-section">
      <p>Other content here</p>
    </div>
  </card>
  
  -->

<template>
<div class="card"
  :class="{ 
    expanded: expanded, 
    margins: margins,
  }"
  :style="{ width: width, }">
  <!-- The card header, with the card's title, and the minimize option -->
  <div class="card-header" @click="expanded = !expanded">
    {{title}}

    <span v-if="expanded">–</span>
    <span v-else >+</span>
  </div>
  <!-- The card body, which can be minimized: -->
  <transition name="slide-down">
  <div class="card-body" v-if="expanded"
    :class="{ 'no-padding': nopadding,
              'flex-container': flex,}">

    <slot>Card content here...</slot>
  </div>
  </transition>
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
    // Card title:
    title: {
      type: String,
      default: 'Side bar card',
    },
    // initializes the card minimized
    min: {
      type: Boolean,
      default: false,
    },
    // Removes 5px card padding: 
    nopadding: {
      type: Boolean,
      default: false,
    },
    // Adds 10px card margins: 
    margins: {
      type: Boolean,
      default: false,
    },
    // Makes the body a flexbox: 
    flex: {
      type: Boolean,
      default: false,
    },
    // width
    width: {
      type: String,
      default: 'auto'
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
    &:hover {
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
  &.expanded .card-header {
    color: var(--card-text);
  }

  // The content of the card, filled out in <slot></slot>
  .card-body {
    overflow-y: hidden;
    padding: 10px;
    &.no-padding {
      padding: 0px;
    }
    &.flex-container {
      justify-content: space-between;
    }
  }
  &:not(.expanded) .card-body {
    padding: 0px 10px;
  }
  .card-section {
    width: 260px;
    min-width: 260px;
  }
}
</style>