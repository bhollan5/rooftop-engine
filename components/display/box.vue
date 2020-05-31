<template>
<!--
      ❒ "box", a non-terminal element. 
  -->

<div class="box" :style="{
    ...BoxSize,
    ...Material
  }">
  <slot/>
</div>

</template>

<script>

export default {
  name: 'box', 

  props: {

    /*    Config fields:     
      These should each be CSS objects. 
    */

    /* The size of the box: */
    BoxSize: {
      type: Object,
      default() {
        return {
          width: '100%',
          height: '100%',
          "min-height": '100vh'
        }
      } 
    },

    /* The background of the box: */
    Material: {
      type: Object,
      default() {
        return {
          background: '#efdecd',
        };
      },
    },

    /* The layout of the box: */
    Layout: {
      type: Object,
    },

  },

}

</script>

<style lang="scss">

</style>