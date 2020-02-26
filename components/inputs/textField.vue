<template>
<div class="text-field" :class="{ 'has-input': hasInput}">
  <slot></slot>
  <input :value="value" @input="$emit('input', $event.target.value)"
    :placeholder="placeholder"
    :class="{ 'icon-padding': icon }"
    >
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
      type: String
    },
    placeholder: {
      type: String
    },
    
    // Make sure to set this to "false" if your input doesn't use an icon!
    icon: {
      type: Boolean,
      default: true
    }
  }
}

</script>

<style scoped lang="scss">

// The entire component:
.text-field {
  position: relative;
  width: 100%;
  box-shadow: 0px 0px var(--box-shading) rgba(0,0,0,.7);
  margin: 10px auto;
}

input {
  font-size: 16px;
  padding: 5px;
  width: 100%;
  min-width: 200px;
  outline: none;
  background: var(--input);
  color: var(--input-text);
  border: none;
  border-bottom: 3px solid var(--input-text2);
  transition-duration: .5s;

  
}
input:focus {
  border-bottom: 3px solid var(--input-highlight);
}
input::placeholder {
  color: var(--input-text2);
}

// This goes away if :icon="false"
.icon-padding {
  padding-left: 30px;
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


</style>