<template>
<div class="program frame">
  <div class=""></div>
</div>
</template>

<script>

export default {
  name: 'program', 

  props: {
    program: String,
  },

  computed: {
    program_data() {
      return this.$store.getters['files/by_name'](this.program);
    }
  },

}

</script>

<style lang="scss">

</style>