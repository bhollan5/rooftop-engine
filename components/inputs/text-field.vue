<template>
<div class="text-field" :class="{ 'has-input': hasInput, 'nobox': nobox}">
  <slot></slot>
  <input :value="value" @input="$emit('input', $event.target.value)"
    :placeholder="placeholder"
    :class="{ 'icon-padding': icon,
              'underline': underline }"
    v-if="!textarea">
    
  <textarea v-else :value="value" @input="$emit('input', $event.target.value)"
    :placeholder="placeholder"
    :class="{ 'icon-padding': icon,
              'underline': underline }"></textarea>
</div>
</template>

<script>
export default {

  // This "hasInput" variable changes the icon color when we type. 
  computed: {
    hasInput() {
      return this.value.length > 0;
    }
  },

  props: {
    // The value incoming from the v-model variable.
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String
    },
    // Turns it into a multi-line text area
    textarea: {
      type: Boolean,
      default: false
    },
    // Removes the box around the input
    nobox: {
      type: Boolean,
      default: false,
    },
    
    // Make sure to set this to "true" if your input uses an icon!
    icon: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: false
    }
  }
}

</script>

<style scoped lang="scss">

// The entire component:
.text-field {
  position: relative;
  width: 100%;
  margin: 10px 0px;
}

input, textarea {
  padding: 5px;
  width: 100%;
  outline: none;
  background: var(--input);
  color: var(--input-text);
  border: none;
  transition-duration: .5s;
  box-shadow: 0px 0px var(--box-shading) rgba(0,0,0,.7);
}
input::placeholder, textarea::placeholder {
  color: var(--input-text2);
}
textarea {
  resize: vertical;
  vertical-align: top;
}

// This goes away if :icon="false"
.icon-padding {
  padding-left: 30px;
}
// This  goes away if :underline="false"
.underline {
  border-bottom: 3px solid var(--input-text2);
}
.underline:focus {
  border-bottom: 3px solid var(--input-h);
}

// Icon styling:
svg {
  height: 16px;
  width: 16px;
  position: absolute;
  top: 8px;
  left: 8px;
}

// These chunks change the icon's color depending on if an input is present. 
.text-field svg {
  fill: var(--input-text)
}
.text-field:not(.has-input) svg {
  fill: var(--input-text2);
}

.nobox {
  margin: 0px;
  input, textarea {
    background: none;
    box-shadow: none;
    padding: 0px;
  }
  &:hover {
    outline: 1px solid var(--bg-text2);
  }
}
</style>