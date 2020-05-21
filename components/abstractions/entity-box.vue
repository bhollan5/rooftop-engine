<template>
<div class="box" id="entity-box">
  
  <arrow :top="-35" :left="35" v-if="0"/>
  <arrow :top="-35" :right="35" v-if="0"/>
  <arrow :left="-24" :top="20" :rotate="-90" v-if="0"/>
  <arrow :left="-24" :bottom="20" :rotate="-90" v-if="0"/>

  <!-- Top row of input buttons: -->
  <div class="flex">
    <div class="link-button">known</div>
    <div class="link-button">unknown</div>
  </div>

  <!-- Middle row: -->
  <div class="flex" id="center-row">

    <!-- The left side buttons: -->
    <div class="flex sideways">
      <div class="link-button sideways">known</div>
      <div class="link-button sideways">unknown</div>
    </div>

    <!-- Entity details: -->
    <div id="entity-details">
      <slot></slot>
    </div>

    <!-- The right side buttons: -->
    <div class="flex sideways">
      <div class="link-button sideways">known</div>
      <div class="link-button sideways">unknown</div>
    </div>
  </div>

  <!-- Bottom row of input buttons: -->
  <div class="flex">
    <div class="link-button">known</div>
    <div class="link-button">unknown</div>
  </div>

  

</div>
</template>

<script>

import Arrow from '@/components/objects/Arrow.vue';
export default {
  name: 'entity-box',

  components: {
    Arrow,
  }
}
</script>

<style lang="scss" scoped>
#entity-box {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: solid 2px black;
  font-size: 12px;
  display: flex; flex-direction: column;
}
#entity-details {
  width: 100%;
}

.arrow {
  width: 18px;
  position: absolute;
}

.link-button {
  width: 50%;
  background: #efefef;
  text-align: center;
  border: solid 2px black;
  padding: 3px;
  &:hover {
    background: #eeeeee;
  }
}

#center-row {
  height: 100%;
}

.sideways {
  writing-mode: vertical-rl;
  .link-button {
    width: auto;
    height: 50%;
    cursor: pointer;
  }
}

</style>