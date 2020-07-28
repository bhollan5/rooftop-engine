<template>

<component :is="_tag"
  style="">

  {{el[3]}}
  

</component>

</template>

<script>
export default {
  name: 'el-renderer', 

  props: {
    el: {
      type: Array,
    }
  },

  computed: {
    _tag() {
      return 'span';
    }
  },

}
</script>

<style>

</style>