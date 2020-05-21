<template>
<div class="cli-container">
  <div class="cli-icon">
    $
  </div>
  <input>
</div>
</template>

<script>
export default {
  name: 'CLI', 
  data() {
    return {

    }
  },

}
</script>

<style lang="scss">


.cli-container {
  padding: 15px;
  font-family: Inconsolata;

}

.cli-icon {
  position: absolute;
  padding: 2px;
  color: hsl(0,0%, 85%);
}

input {
  font-family: Inconsolata;
  font-size: 16px;

  padding: 2px;
  padding-left: 15px;
  display: block;
  background: none;

  border: none;
  color: hsl(0,0%, 70%);
  border-bottom: solid 2px hsl(0,0%, 85%);
  outline: none;

  &:focus {
    border-bottom: solid 2px hsl(0,0%, 70%);
  }

}
</style>