<template>
<div class="container">
  <slot></slot>
</div>
</template>

<script>

export default {
  name: 'container',
  props: {
    depth: {
      type: Number,
      default: 0,
    },
    material: {

    }
  }
}

</script>