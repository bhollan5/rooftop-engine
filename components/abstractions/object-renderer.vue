<template>
<div class="entity-renderer">
  <component :is=""

  >
</div>
</template>

<script>

export default {
  name: 'entity-renderer', 
  
  props: {

    entity: {
      // An effigy object. 
      type: Object,
    },

  }

}

</script>

<style lang="scss">

</style>