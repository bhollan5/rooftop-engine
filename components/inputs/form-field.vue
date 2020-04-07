<template>
<div class="form-field-container">
  <div class="form-field" v-for="field in fields">
    {{field}}
  </div>
</div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  props: {
    fields: Array
  }
}
</script>

<style lang="scss">

</style>