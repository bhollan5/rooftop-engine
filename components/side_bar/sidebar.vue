<!--

  This component is registered globally, so you can use it anywhere like this:

  <side-bar>

    <card title="My card:">
      <p>Card content here</p>
    </card>

    - Put more cards here -

    <template v-slot:hovering>

      <card title="My hovering card:">
        <p>Card content here</p>
      </card>

      - Put more hovering cards here -

    </template>

  </side-bar>

-->

<template>
<svg-editor-sidebar v-if="svg_editor_open"></svg-editor-sidebar>
<div id="side-bar" v-else>
  <div id="side-bar-header" v-if="title">
    <div id="side-bar-title" class="small-font">{{title}}</div>
  </div>

  <div id="side-bar-content">
    <slot></slot>
  </div>
  <!-- Cards here -->

  <div id="side-bar-hover">
    <slot name="hovering" >
      <!-- More cards here -->
    </slot>
  </div>

</div>
</template>

<script>
import svgEditorSidebar from '~/components/side_bar/svg_editor_sidebar.vue';


export default {
  name: 'side-bar-card',
  data() {
    return {
      // If the sidebar is expanded
      expanded: true
    }
  },
  components: {
    svgEditorSidebar,
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
  },
  computed: {
    // Is the svg-editor open?
    svg_editor_open() {
      return this.$store.getters['svg/svg_editor_open'];
    },
  }
}
</script>

<style lang="scss">

// todo: get these out of components...
$desktop-bp: 1000px;
$tablet-bp: 400px;

// The side bar with the table of contents:
#side-bar {
  background: var(--card);
  height: 100vh;
  z-index: 100;
  width: 300px;
  min-width: 300px;
  position: sticky;
  top: 0px;
  box-shadow: 0px 0px 5px rgba(0,0,0,.5);

  @media only screen and (max-width: $desktop-bp) {
    display: none;
  }
  
  // The sidebar header has the title and article ID
  #side-bar-header {
    padding: 10px;
    background: var(--card2);
    position: relative;

    // Contains the article ID
    .id-container {
      display: flex;
      align-items: center;
      h4 {
        font-size: var(--small-font-size);
        width: 25px;
      }
      .text-field, .text-field input {
        font-size: var(--small-font-size);
        // padding: 2px;
      }
    }

    .thumbnail {
      width: 100px;
    }
  }
  
  #side-bar-content {
    height: 95%;
    overflow-y: scroll;
  }
  
  .card-text2 {
    color: var(--card-text2);
  }

  #side-bar-hover {
    top: 0px;
    right: -250px;
    position: absolute;
    width: 250px;
    cursor: pointer;

    .card {
      opacity: .3;
    }
    .card:hover {
      opacity: 1;
    }
    // slider:
    input[type="range"] {
      width: calc(100% - 50px);
    }
    .text-field {
      width: 40px;
      margin-right: 10px;
      input {
        padding: 0px;
      }
    }
    
  } 
}
</style>