<template>
<div class="arrow"
  :style="{
    top: top + 'px', right: right + 'px', left: left + 'px', bottom: bottom + 'px',
    transform: 'rotate(' + rotate + 'deg)'
  }">
  <img src="@/assets/signs/arrow.svg">
</div>
</template>

<script>
export default {
  name: 'arrow',
  props: {
    top: Number,
    right: Number, 
    left: Number, 
    bottom: Number,

    rotate: Number,
  }
}
</script>

<style lang="scss" scoped>
.arrow {
  position: absolute;
}

</style>