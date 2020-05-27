<template>
<!--
      ❒ "box", a non-terminal element. 
  -->

<div class="box">
  <slot/>
</div>

</template>

<script>

export default {
  name: 'box', 
  
  computed: {
    
    style() {
      /* Has boxSize, Material */
    },

  }

}

</script>

<style lang="scss">

</style>