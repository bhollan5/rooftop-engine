


<!-- no longer used -->



<template>
<div class="multi-number-input">
  <div class="number-input" v-for="(data, i) in inputData">
    <input type="number" :min="data.min" :max="data.max" :value="inputs[i]">
    <div class="label">{{data.name}}</div>
  </div>
</div>
</template>

<script>
export default {


  computed: {
  },

  props: {

    inputData: {
      type: Array,
      default() { 
        return [
          {
            name: 'hue',
            min: 0,
            max: 255,
            unit: '',
          },
          {
            name: 'saturation',
            min: 0,
            max: 100,
            unit: '%',
          },
          {
            name: 'lightness',
            min: 0,
            max: 100,
            unit: '%',
          }
        ]
      }
    },
    inputs: {
      type: Array,
      default() {
        return [0, 50, 50]
      }
    }

  }
}

</script>

<style scoped lang="scss">

/* Removing arrows from number inputs: */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance:textfield;
}

// The entire component:
.multi-number-input {
  margin: 10px auto;
  background: var(--input);
  display: flex;
}

.number-input {
  position: relative;
  width: 50px;

  input {
    background: none;
    outline: none;
    border: none;
    color: var(--input-text);
    font-size: 16px;
    padding: 15px 10px;
    width: 100%;
  }
  .label {
    position: absolute;
    font-size: 10px;
    text-align: center;
    width: 100%;
    bottom: 4px;
    color: var(--input-text2);
  }
  &::after {
    content: '';
    height: 24px;
    margin-left: -2px;
    border: .5px solid var(--input-text2);
  }
}

</style>