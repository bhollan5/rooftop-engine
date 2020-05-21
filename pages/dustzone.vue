<template>
<div class="dustzone">
  <div class="obj" id="cactus"></div>
  <div class="floor" id="dustzone-floor"></div>
</div>
</template>

<script>
export default {
  name: '', 

  data() {
    return {
      new_ent: {
        name: 'Felix',
        appearance: '⏣',
      },
      world: {
        external: 1,
        rules: 0,
      },
      hash: Math.random(), 
    }
  }
}
</script>

<style lang="scss" scoped>
.dustzone {
  width: 100%;
  min-height: 100vh;
  font-family: Inconsolata, sans-serif;
  padding: 0px;
  margin: 0px;
}

#dustzone-floor {
  position: absolute;
  height: 200px;
  width: 100%;
  border-top: solid 1px black;
  bottom: 0px;
  z-index: 1;
  background: #fefefe;
}

#cactus {
  width: 15px;
  height: 150px;
  background: linear-gradient(to right, #cccccc, #dddddd);
  // border: solid 2px #999999;
  position: absolute;
  bottom: 175px;
  z-index: 2;
  left: 350px;
  border-radius: 10px 10px 0px 0px;
  &::after {
    content: '';
    background: #dddddd;
    position: absolute;
    height: 30px;
    width: 20px;
    bottom: -28px;
    transform: skew(-50deg) translatex(-20px);
    border-radius: 0px 0px 10px 10px;
    filter: blur(3px);

  }
}
</style>