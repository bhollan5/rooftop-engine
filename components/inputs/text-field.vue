<template>
<input type="text" 
  :value="value"
  @input="$emit('input')"
>
</template>

<script>

export default {
  name: 'text-field',
  
  props: {
    value: String,

  }
}
</script>