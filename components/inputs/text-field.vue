<template>
<!-- The container div has padding, and displays the input background. -->
<div class="text-field" 
@click="$emit('click')" 
  :class="{ 
    'has-input': hasInput, 
    'nobox': nobox, 
    'no-padding': nopadding,
  }">

  <div class="title">{{title}}</div>

  <!-- The slot is used for icons -->
  <slot></slot>

  

  <input v-if="number"
    :value="value" 
    @input="$emit('input', $event.target.value)"
    :placeholder="placeholder" 
    :readonly="readonly" 
    type="number"
    :class="{ 'icon-padding': icon,
              'underline': underline,
              'p': regularfont,
              'small-font': smallfont,
              'no-underline': nounderline }"
    v-on:keyup.enter="$emit('enter')">
    
  <textarea v-else-if="textarea"
    :value="value" 
    @input="$emit('input', $event.target.value)"
    :placeholder="placeholder" 
    :readonly="readonly"
    v-on:keyup.enter="$emit('enter')"
    :class="{ 'icon-padding': icon,
              'underline': underline,
              'p': regularfont,
              'small-font': smallfont,
              'no-underline': nounderline }"></textarea>

    <!-- This is the default input option, for single line text. -->
  <input v-else-if="password"
    type="password"
    :value="value" 
    @input="$emit('input', $event.target.value)"
    :placeholder="placeholder" 
    :readonly="readonly" 
    :class="{ 'icon-padding': icon,
              'underline': underline,
              'p': regularfont,
              'small-font': smallfont,
              'no-underline': nounderline }"
    v-on:keyup.enter="$emit('enter')">

  <!-- This is the default input option, for single line text. -->
  <input :value="value" 
    @input="$emit('input', $event.target.value)"
    :placeholder="placeholder" 
    :readonly="readonly" 
    :class="{ 'icon-padding': icon,
              'underline': underline,
              'p': regularfont,
              'small-font': smallfont,
              'no-underline': nounderline }"
    v-on:keyup.enter="$emit('enter')"
    v-else>
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

    //
    // Values to display:
    //

    // The value incoming from the v-model variable. This is what actually gets changed!
    value: {
      default: '',
    },
    // Placeholder text:
    placeholder: {
      type: String
    },
    // Title text, above the input: 
    title: {
      type: String
    },
    

    //
    // Input type options:
    //

    // Turns it into a multi-line text area
    textarea: {
      type: Boolean,
      default: false
    },
    // Turns it into a number input 
    number: {
      type: Boolean,
      default: false
    },
    // Hides the text with little * things
    password: {
      type: Boolean,
      default: false
    },
    // Makes the input readonly:
    readonly: {
      type: Boolean,
      default: false,
    },


    //
    // Styling options:
    //

    // Removes the box around the input
    nobox: {
      type: Boolean,
      default: false,
    },
    // Removes the underline
    nounderline: {
      type: Boolean,
      default: false,
    },
    // Regular font: 
    regularfont: {
      type: Boolean,
      default: false,
    },
    // Small font:
    smallfont: {
      type: Boolean,
      default: false,
    },
    // Reduces padding: 
    nopadding: {
      type: Boolean,
      default: false
    },
    // Make sure to set this to "true" if your input uses an icon!
    icon: {
      type: Boolean,
      default: false
    },
    // I'm not sure if we need this:
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

input:not(.number), textarea {
  padding: 5px;
  width: 100%;
  outline: none;
  background: var(--input);
  color: var(--input-text);
  transition-duration: .2s;
  box-shadow: 0px 0px var(--box-shading) rgba(0,0,0,.2);
}
// Handling underline
input, textarea {
  border: none;
  border-bottom: solid 2px var(--input-text2);
  &:focus {
    border-bottom: solid 2px var(--c1);
  }
}
input.no-underline, textarea.no-underline {
  border-bottom: solid 2px rgba(0,0,0,0);
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
input.icon-padding, .nobox .icon-padding {
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

.no-padding {
  padding: 0px;
  input {
    padding: 1px;
  }
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
    &:hover {
      background: var(--input);
    }
  }
}

// no underline 
.no-underline {

}
</style>