<template>
<!-- Always-present document details: -->
<card :title="'Document details!'" class="small-font">
  Editor state: <b>{{editor_state}}</b>
  <dropdown 
    :options="state_options" 
    @input="change_state($event)"
    :value='editor_state'>
  </dropdown>
  <br><br>
</card>
</template>

<script>
export default {
  name: 'doc-details',
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
  }
}
</script>

<style lang="scss">

</style>