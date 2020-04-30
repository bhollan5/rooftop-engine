<template>
<!-- Always-present document details: -->
<card :title="'Document details!'" class="small-font">
  <dropdown 
    title="Editor State:"
    :options="state_options" 
    @input="change_state($event)"
    :value='editor_state'>
  </dropdown>
  <br>
  <object-editor :object="data" @input="update_doc_data($event)"></object-editor>
</card>
</template>

<script>
export default {
  name: 'doc-details',

  props: {
    data: Object,
  },

  data() {
    return {
      state_options: [
        'svg-editor',
        'body-editor',
      ]
    }
  },

  computed: {
    editor_state() {
      return this.$store.getters['page/editor_state'];
    },
  },

  methods: {
    change_state(new_state) {
      console.log("Changing to " + new_state)
      console.log(new_state)
      this.$store.commit('page/change_editor_state', new_state);
    },

    update_doc_data(update_obj) {
      this.$store.commit('page/update_doc_data', update_obj);
    }
  }
}
</script>

<style lang="scss">

</style>