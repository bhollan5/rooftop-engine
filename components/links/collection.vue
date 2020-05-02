<!-- probs deprecated -->

<template>
<!-- Container for all collections-->
<div class="collection-container">

</div>
</template>

<script>


export default {
  name: 'collectionDisplay',
  components: {
  },
  props: {
    collection_name: {
      type: String,
      required: true
    },
    query_field: {
      type: Array,
      default: ['can_edit']
    }
  },
  data() {
    return {
    }
  },
  methods: {
    

  }
}
</script>

<style lang="scss">

</style>