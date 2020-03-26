<template>
<div class="text-field" @click="$emit('click')" 
  :class="{ 
    'has-input': hasInput, 
    'nobox': nobox, 
    'small-icon': smallfont}">

  <div class="title">{{title}}</div>

  <!-- The slot is used for icons -->
  <slot></slot>

  <input :value="value" @input="$emit('input', $event.target.value)"
    :placeholder="placeholder" :readonly="readonly"
    :class="{ 'icon-padding': icon,
              'underline': underline,
              'p': regularfont,
              'small-font': smallfont }"
    v-on:keyup.enter="$emit('enter')"
    v-if="!textarea">
    
  <textarea v-else :value="value" @input="$emit('input', $event.target.value)"
    :placeholder="placeholder" :readonly="readonly"
    v-on:keyup.enter="$emit('enter')"
    :class="{ 'icon-padding': icon,
              'underline': underline,
              'p': regularfont,
              'small-font': smallfont }"></textarea>
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
    // Placeholder:
    placeholder: {
      type: String
    },
    // Title: 
    title: {
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
    // Readonly:
    readonly: {
      type: Boolean,
      default: false,
    },

    regularfont: {
      type: Boolean,
      default: false,
    },
    smallfont: {
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
  margin: 0px;
  padding-bottom: 10px;
}

.title {
  font-size: var(--small-font-size);
  color: var(--bg-text2);
  margin-bottom: -3px;
  margin-left: 3px;
}

input, textarea {
  padding: 5px;
  width: 100%;
  outline: none;
  background: var(--input);
  color: var(--input-text);
  border: none;
  border-bottom: solid 2px var(--input-text2);
  transition-duration: .5s;
  box-shadow: 0px 0px var(--box-shading) rgba(0,0,0,.2);
  &:focus {
    border-bottom: solid 2px var(--c1);
  }
}
input::placeholder, textarea::placeholder {
  color: var(--input-text2);
}
textarea {
  // resize: vertical;
  resize: none;
  vertical-align: top;
}

// This goes away if :icon="false"
.icon-padding, .nobox .icon-padding {
  padding-left: 35px;
}
.small-icon .icon-padding {
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
  height: var(--regular-font-size);
  width: var(--regular-font-size);
  position: absolute;
  bottom: 19px;
  left: 9px;
}
.small-icon svg {
  height: var(--small-font-size);
  width: var(--small-font-size);
  position: absolute;
  bottom: 19px;
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
    border-bottom: 1px solid var(--bg-text2);
    margin-bottom: -1px; // so the whole field doesn't move
  }
}
</style>