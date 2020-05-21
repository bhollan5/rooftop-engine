<template>
<div id="new-entity">

  <div class="flex space-between">type: <input v-model="type"></div>
  <div class="flex space-between">id: <input v-model="id"></div>
  <div class="flex space-between">name: <input v-model="name"></div>
  <div class="flex space-between">value: <input v-model="value"></div>
    
</div>
</template>

<script>
export default {
  name: 'my-name',

  props: {
    type: '', 
    id: '',
    name: '', 
    value: '', 
  },

}
</script>

<style lang="scss" scoped>

#new-entity {
  font-size: 12px;
  height: 100%;
}
input {
  width: calc(100% - 70px);
}




</style>