<template>
<!-- Always-present document details: -->
<card :title="'Document details!'" class="small-font">
  Editor state: <b>{{editor_state}}</b>
</card>
</template>

<script>
export default {
  name: 'doc-details',
  computed: {
    editor_state() {
      return this.$store.getters['page/editor_state'];
    }
  }
}
</script>

<style lang="scss">

</style>