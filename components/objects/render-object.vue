<template>
<div class="object-renderer">
  <component :is="'p'"

  />
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