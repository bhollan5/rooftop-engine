<template>
<div class="dropdown">
  <slot></slot>

  <!-- This is what pops up when the user clicks on the dropdown. -->
  <transition name="fadeout">
    <div class="option-popup" v-if="focus"
      :style="{
        // Dynamic styling positions the current selection in the middle.
        top: currentOption * -24 + 'px'
        }">
      <div class="option" v-for="(option, i) in options" @click="selectOption(i)">
        <check-icon class="option-icon" v-if="i == currentOption"></check-icon>
          {{option}}
      </div>
    </div>
  </transition>

  <!-- This is the drop down display, ready to be clicked on :O -->
  <div class="chosen-option" @click="focus=true">
    <expand-icon class="option-icon"></expand-icon>
    {{options[currentOption]}}
  </div>
  
</div>
</template>

<script>
// Icons:
import expandIcon from '@/components/icons/expand-icon.vue';
import checkIcon from '@/components/icons/check-icon.vue';


export default {
  data() {
    return {
      focus: false
    }
  },

  props: {
    // A list of the incoming options:
    options: {
      type: Array,
    },
    // The index of the current selection.
    currentOption: {
      type: Number,
      default: 0
    },
    // Optional
    placeholder: {
      type: String
    },
  },

  methods: {
    selectOption(i) {
      this.currentOption = i;
      this.focus = false;
    }
  },

  components: {
    expandIcon,
    checkIcon
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
  z-index: 2;
  width: 100%;
  min-width: 100px;
  padding: 5px;
  padding-left: 32px;
  border-radius: 5px;
  border-top: solid 1px var(--input-text2);
  font-size: 16px;
  cursor: pointer;

  background: var(--input);
  box-shadow: 0px 2px 0px var(--input-text2);

  // Dropdown icon:
  svg {
    height: 14px;
    position: absolute;
    left: 12px;
    top: 10px;
    fill: var(--input-text2);
    stroke: var(--input-text2);
  }
}

// The popup list of options
.option-popup {
  z-index: 3;
  position: absolute;

  min-width: calc(100% + 5px);
  margin-left: -5px;

  background: var(--input);
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0,0,0,.6);
  padding: 4px 0px;
  overflow: hidden;

  .option {
    position: relative;
    height: 24px;
    padding: 2px 5px 8px 36px;
    cursor: pointer;
    svg {
      height: 14px;
      position: absolute;
      left: 12px;
      top: 6px;
      fill: var(--input-text);
    }
  }
  .option:hover {
    color: var(--input-h-text);
    background: var(--input-h);
    svg {
      fill: var(--input-h-text);
    }
  }
}

// Fadeout transition:
.fadeout-leave-active {
  transition: opacity .2s;
}
.fadeout-leave-to {
  opacity: 0;
}

</style>