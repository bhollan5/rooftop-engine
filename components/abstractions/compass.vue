<template>
<div id="compass">

  <button @click="save()">
    save
  </button>

  <div id="cross">

    <!-- left column -->
    <div class="column" id="external-input">
      <div class="row-1 row-accessible cel">
        <guide-box></guide-box>
      </div>

      <div class="row-2 row-consistent cel">
        <entity-box></entity-box>
      </div>

      <div class="row-1 row-mutable cel">
        <guide-box></guide-box>
      </div>
    </div>

    <!-- middle column -->
    <div class="column" id="self-known">

      <div class="row-1 row-accessible cel">
        <entity-box></entity-box>
      </div>

      <div class="row-2 row-consistent cel" id="self">
        <entity-box>
          <new-entity></new-entity>
        </entity-box>
      </div>

      <div class="row-3 row-mutable cel">
        <entity-box></entity-box>
      </div>
    </div>

    <!-- right column -->
    <div class="column" id="external-output">
      <div class="row-1 row-accessible cel">
        <guide-box></guide-box>
      </div>

      <div class="row-2 row-consistent cel">
        <entity-box></entity-box>
      </div>

      <div class="row-1 row-mutable cel">
        <guide-box></guide-box>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import GuideBox from '@/components/abstractions/guide-box.vue';
import EntityBox from '@/components/abstractions/entity-box.vue';

import NewEntity from '@/components/objects/NewEntity.vue';

export default {

  name: 'compass',

  components: {
    EntityBox,
    GuideBox,
    NewEntity,
  },

  data() {
    return {
      new_ent: {
        name: 'hi',
      }
    }
  }
}
</script>

<style lang="scss">

#compass {
  width: 100%;
  height: 100%;
  position: absolute;
  background: hsla(0, 0%, 100%, 0.7);
  z-index: 100;
  font-family: Inconsolata;

}

#cross {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.cel {
  width: 200px;
  height: 170px;
  margin: 15px;
}


.column {
  display: flex;
  flex-direction: column;
}


</style>