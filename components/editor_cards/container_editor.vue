<template>
<!-- Always-present document details: -->
<card title="Container config" class="small-font">
  <dropdown 
    title="type:"
    :options="container_types" 
    @input="change_state($event)"
    :value='editor_state'>
  </dropdown>

  <div class="material-picker small-font">
    <div>Has material:</div>
  </div>
  <color-scheme></color-scheme>

  <br>
</card>
</template>

<script>
export default {
  name: 'doc-details',

  props: {
  },

  data() {
    return {
      container_types: ['none', 'box', 'card']
    }
  },

  computed: {
    editor_state() {
      return this.$store.getters['draft_doc/editor_state'];
    },
  },

  methods: {
    change_state(new_state) {
      console.log("Changing to " + new_state)
      console.log(new_state)
      this.$store.commit('draft_doc/change_editor_state', new_state);
    },

    update_doc_data(update_obj) {
      this.$store.commit('draft_doc/update_doc_data', update_obj);
    }
  }
}
</script>

<style lang="scss">

</style>