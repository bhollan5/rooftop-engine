<template>
<div class="picker-container" v-if="options && options.length > 0">
  <slot></slot>

  <div class="title">{{title}}</div>

  <div class="picker">
    <!-- v-for list of the section type options: -->
    <div class="option" v-for="option in options"
      :class="{'selected-option': 
        value == option.value}"
      @click="$emit('input', option.value)">

      <div class="option-icon"
      :class="{bold: option.bold}">

        <span>{{option.icon}}</span>

      </div>

      <div class="option-description">
        <p class="bold">{{option.title}}</p>
        <p class="small-font">{{option.description}}</p>
      </div>

    </div>
  </div>
  
</div>
</template>

<script>

export default {

  data() {
    return {
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

    // A list of the incoming options:
    options: {
      type: Array,
      required: true,
    },

    // the v-model value
    value: {
      type: String
    },

    // The title of the picker
    title: {
      type: String,
      default: '',
    },

    

    // If an array of objects is passed in, we can access a specific property.
    property: {
      type: String
    },

  },

  methods: {
    selectOption(i) {
      this.$emit('input', this.options[i]);
      this.focus = false;
    },
  },

}

</script>

<style scoped lang="scss">

.picker {
  max-width: 100%;
  .option {
    height: 50px;
    display: flex;
    cursor: pointer;
    .option-icon {
      width: 35px;
      height: 35px;
      margin: 7px;
      margin-right: 15px;
      border-radius: 5px;
      background: var(--input);
      border: 1px solid var(--input-text2);
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .option-description {
      color: var(--bg-text2);
    }
    &:hover {
      .option-icon {
        background: var(--input-light);
        border: 1px solid var(--input-text);
      }
      .option-description {
        color: var(--bg-text);
      }
    }
  }
}
.card .picker .option {
  .option-description {
    color: var(--card-text2);
  }
  &:hover {
    background: var(--card-light);
    .option-description {
      color: var(--card-text);
    }
  }
}


.title {
  font-size: var(--small-font-size);
  color: var(--card-text2);
  margin-bottom: -3px;
  margin-left: 3px;
}
</style>