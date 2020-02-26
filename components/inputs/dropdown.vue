<template>
<div class="dropdown">
  <slot></slot>
  <!-- Is using ascii like this ▶ adequately accessible? -->
  <div class="chosen-option">
    <expand-icon></expand-icon>
    Hey!
  </div>
  <div class="option-popup">
    <div class="option" v-for="option in options">
      {{option}}
    </div>
  </div>
</div>
</template>

<script>
// Icons:
import expandIcon from '@/components/icons/expand-icon.vue';

export default {
  props: {
    // A list of the incoming options:
    options: {
      type: Array,
    },
    // The value of the current selection.
    value: {
      type: String
    },
    // Optional
    placeholder: {
      type: String
    },
  },

  components: {
    expandIcon
  }
}

</script>

<style scoped lang="scss">

// The entire component:
.dropdown {
  position: relative;
  width: 100%;  
  margin: 10px auto;

}

.chosen-option {
  width: 100%;
  min-width: 100px;
  padding: 4px;
  padding-left: 32px;
  border-radius: 10px;
  border-top: solid 1px var(--input-text2);
  font-size: 16px;

  background: var(--input);
  box-shadow: 0px 2px 0px var(--input-text2);

  svg {
    height: 14px;
    position: absolute;
    left: 12px;
    top: 10px;
    fill: var(--input-text2);
    stroke: var(--input-text2);
  }
}

</style>