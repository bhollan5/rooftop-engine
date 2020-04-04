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
<div id="side-bar">

  <slot></slot>
  <!-- Cards here -->

  <div id="side-bar-hover">
    <slot name="hovering" >
      <!-- More cards here -->
    </slot>
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

// todo: get these out of components...
$desktop-bp: 1000px;
$tablet-bp: 400px;

// The side bar with the table of contents:
#side-bar {
  background: var(--card);
  height: 100vh;
  width: 300px;
  position: relative;
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
    padding: 10px 10px;
    .article-description {
      width: 100%;
      line-height: 1;
      color: var(--card-text2);
      height: 80px;
      textarea {
        font-size: var(--small-font-size);
        height: 100%;
      }
    }
    .tab-container {
      h4 {
        margin-right: 10px;
      }
      display: flex;
      align-items: center;
    }
  }
  
  .card-text2 {
    color: var(--card-text2);
  }

  #side-bar-hover {
    top: 10px;
    right: -260px;
    position: absolute;
    z-index: 11;
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