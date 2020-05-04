<template>
<container class="small-font">
  <slider></slider>
</container>
</template>

<script>

import {Size} from '~/modules/globals';

export default {
  name: 'sizeEditor',

  computed: {
    size() {
      return new Size()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>