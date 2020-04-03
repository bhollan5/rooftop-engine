<template>
<div class="dropdown">
  <slot></slot>

  <div class="title">{{title}}</div>

  <!-- This is the display, ready to be clicked on -->
  <div class="chosen-option" @click="focus=true">
    <expand-icon></expand-icon>
    {{options[current_option]}}
  </div>

  <!-- This is what pops up when the user clicks on the dropdown. -->
  <transition name="fadeout">
    <div class="option-popup" v-if="focus">
      <div class="option" v-for="(option, i) in options" @click="selectOption(i)">
        <check-icon class="option-icon" v-if="i == current_option"></check-icon>
          {{option}}
      </div>
    </div>
  </transition>
  
</div>
</template>

<script>

export default {

  data() {
    return {
      // TODO: Unfocus when the user clicks away from the component
      //  This might help: https://stackoverflow.com/questions/36170425/detect-click-outside-element
      focus: false
    }
  },

  computed: {
    current_option() {
      for (let i in this.options) {
        if (this.value == this.options[i]) {
          return i;
        }
      }
      return 0;
    }
  },

  watch: {
    // Setting the focus to false on the next click, even if it isn't on the component:
    focus() {
      if (this.focus) {
        window.addEventListener('mousedown', this.unfocus);
      } else {
        window.removeEventListener('mousedown', this.unfocus);
      }
    }
  },

  props: {
    // the v-model value
    value: {
      type: String
    },

    title: {
      type: String,
      default: '',
    },

    // A list of the incoming options:
    options: {
      type: Array,
      required: true,
    },

    // If an array of objects is passed in, we can access a specific property.
    property: {
      type: String
    },

    // Optional
    placeholder: {
      type: String
    },
  },

  methods: {
    unfocus() {
      this.focus = false;
    },
    selectOption(i) {
      this.$emit('input', this.options[i]);
      this.focus = false;
    },
  },

}

</script>

<style scoped lang="scss">

// The entire component:
.dropdown {
  position: relative;
  width: 100%;  
  min-height: 30px;
  margin: 10px 0px;
  

}

.chosen-option {
  z-index: 2;
  width: 100%;
  min-width: 100px;
  padding: 2px;
  min-height: 30px;
  padding-left: 4px;
  border-radius: 5px;
  font-size: var(--small-font-size);
  cursor: pointer;

  background: var(--input);
  display: flex;
  align-items: center;

  // Dropdown icon:
  svg {
    height: 14px;
    width: 14px;
    margin: 0px 5px;
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
  border-radius: 3px;
  box-shadow: 0px 0px 5px rgba(0,0,0,.6);
  padding: 0px 0px;
  overflow: hidden;
  left: 4px;
  top: calc(100% + 5px);

  .option {
    position: relative;
    height: 24px;
    padding: 4px 5px 8px 36px;
    cursor: pointer;

    font-size: var(--small-font-size);

    svg {
      height: 10px;
      position: absolute;
      left: 12px;
      top: 6px;
      fill: var(--input-text);
    }
  }
  .option:hover {
    color: var(--input-h-text);
    background: var(--bg2);
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

.title {
  font-size: var(--small-font-size);
  color: var(--bg-text2);
  margin-bottom: -3px;
  margin-left: 3px;
}
</style>