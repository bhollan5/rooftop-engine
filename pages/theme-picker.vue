<template>
  <div class="page-content">
    <h1 id="theming-header">Dynamic Theming</h1>
    <h2>Customize Rooftop's theme here!</h2>
    <p class="centered">Below, you can try out different options to build your own theme for Rooftop.</p>
    
    <div class="big-br"></div><div class="big-br"></div>

    <!-- In the "customizer" div, we use temporary styling. -->
    <div id="customizer" :style="{background: bg}">

      <!-- Logo and Text section -->
      <div id="logo-and-text" class="flex-container">
        <div class="theme-options"><!--
          --logo:<input type="color" v-model="logo"><br><br>

          --bg:<input type="color" v-model="bg"><br>
          --bg-text:<input type="color" v-model="bg_text"><br>
          --bg-text2:<input type="color" v-model="bg_text2"><br>-->
        </div>
        <div class="theme-example" :style="{color: bg_text}">
          <logo></logo>
          <h1 :style="{color: bg_text}">Page Title!</h1>
          <h2 :style="{color: bg_text2}">Subtitle, in secondary color</h2>
          <p>Totally regular text that would appear in the body of a paragraph on a page on  the website. Hi!</p><br>
          <p>Important parts of a text passage might be highlighted to show importance. </p><br>
          <p>Here's a link to another page →</p>
        </div>
      </div>

      <!-- Color & Illustration section -->
      <div id="Color & Illustration" class="flex-container">
        <div class="theme-options">
        </div>
        <div class="theme-example">
        </div>
      </div>

      <h2>Inputs: </h2>

      <!-- Inputs section -->
      <div id="inputs" class="flex-container">
        <div class="theme-options">
          <color-picker></color-picker>

        </div>
        <div class="theme-example" :style="{color: bg_text}">

        <!-- Some info about custom inputs from https://www.smashingmagazine.com/2017/08/creating-custom-inputs-vue-js/

          <my-custom-component v-model="myProperty" /> 
            is the same as 
            <my-custom-component :value="myProperty" @input="val => myProperty = val" />
          -->

          <text-field v-model="foo" :placeholder="'Text Field'" class="sample-input">
            <search-icon></search-icon>
          </text-field>
          <dropdown :options="sampleOptions"></dropdown>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
// importing the logo svg:
import logo from '~/components/logo.vue';

// Icons:
import searchIcon from '~/components/icons/search-icon.vue';

// inputs:
import textField from '~/components/inputs/text-field.vue';
import dropdown from '~/components/inputs/dropdown.vue';
import colorPicker from '~/components/inputs/color-picker.vue';




// Our vue component:
export default {

  components: {
    logo,

    searchIcon,

    textField,
    dropdown,
    colorPicker,
  },

  data() {
    return {
      logo: this.$store.state.logo,
      bg: this.$store.state.bg,
      bg_text: this.$store.state.bg_text,
      bg_text2: this.$store.state.bg_text2,

      // Sample data for inputs:
      sampleOptions: ['Option 1!', 'Option 2 :)', 'option 3 ;o', 'option 4??'],
      foo: ''
    }
  },
  
}
</script>

<style lang="scss" scoped>
// The area before the actual customizer:
#theming-header {
  padding-top: 50px;
  padding-bottom: 0px;
}
h2 {
  text-align: center;
}

// This div contains ALL the customization sections.
#customizer {
  padding-top: 50px;
}

// Note that this edit is scoped:
.flex-container {
  padding: 50px 0px;
}
// Adding extra padding to the top:
#logo-and-text {
  margin-top: 25px;
}


.theme-options, .theme-example {
  max-width: 500px;
  min-width: 250px;
}

.sample-input {
  width: 100%;
}


</style>

