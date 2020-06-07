<template>
<div class="program frame">
  {{program_data}}
</div>
</template>

<script>

export default {
  name: 'program', 

  props: {
    // We use these in computed func's to get real objects.
    program: String,      // Program id
    instance: String      // Instance id
  },

  computed: {

    // Getting our progam's data
    program_data() {
      let _results = this.$store.getters['files/query']('programs', {
        program_id: this.program,
        instance_id: this.instance,
      });
      if (_results.lengh > 1) { console.warn(_results.lengh + " programs found in program.vue.")};
      if (_results.lengh < 1) { console.warn("No program found in program.vue.")};
      return _results[0];
    },

  },

}

</script>

<style lang="scss">

</style>