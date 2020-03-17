<template>
<div class="container" id="sign-in">
  <h1>Sign In</h1>
  <line-break class="line-break"></line-break>
</div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  components: {
  },
  mounted() {
    this.$parent.$parent.userOptions = false;
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
#sign-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    padding-top: 100px;
    padding-bottom: 50px;
    font-weight: normal;
  }
  .line-break {
    max-width: 350px;

  }
}
</style>