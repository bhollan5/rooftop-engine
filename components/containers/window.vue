<!-- 
  
  windows are used for secondary content, or for options in the sidebar 
  
  <window title="My window:">
    <p>window content here</p>
  </window>
  
  <window title="A flex-box window with two sections:" flex>
    <div class="window-section">
      <p>window content here</p>
    </div>
    <div class="window-section">
      <p>Other content here</p>
    </div>
  </window>
  
  -->

<template>

<div class="window">
  
  <!-- The window header, with the window's title, and the minimize option -->
  <div class="window-header">
    <div class="window-icons">
    
    </div>
    <div class="window-title secondary">
      {{title}}
    </div>
  </div>

  <!-- The window body: -->
  <div class="window-body">
    <slot>...</slot>
  </div>

  <div class="window-footer">
    <button class="window-button">
      <slot name="button">Button content</slot>
    </button>
  </div>

</div>
</template>

<script>
export default {

  name: 'window',

  props: {
    // window title:
    title: {
      type: String,
      default: 'Side bar window',
    },
  },

  data() {
    return {
    }
  },

  mounted() {
  },

}
</script>

<style lang="scss">

.window {
  display: block;
  position: relative;
  font-family: inconsolata;
}

.window-body {
  display: flex;
  width: 100%; // TODO: Delete this class!!!
  padding: 0px 10px;
  overflow-y: scroll;
  min-height: 100px;
  min-width: 200px;
  height: 100%;
}

.window-header {
  height: 30px;
  background: var(--card2);
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0px 10px;

}

.window-footer {
  color: var(--card2);
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 40px;
  background: var(--card2);
  display: flex;
  justify-content: space-between;

  padding: 0px 10px;

}

.window-button {
  position: absolute;
  right: 20px;
  top: -10px;
  background: var(--card2-light);
  color: var(--card-text2);
}

</style>