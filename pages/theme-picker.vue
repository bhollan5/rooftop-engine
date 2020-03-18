<template>
  <div class="page-content">
    <h1 id="theming-header">Dynamic Theming</h1>
    <h2>Customize Rooftop's theme here!</h2>
    <p class="centered">Below, you can try out different options to build your own theme for Rooftop.</p>
    
    <div class="big-br"></div>
    <line-break style="width: 40%;margin-left: 30%"></line-break>



        <!-- Custom styling begines! -->
    <!-- In the "customizer" div, we use temporary styling. -->
    <div id="customizer" :style="cssDraftStyleObj">

      <h2>Headers, bodies, and text: </h2>
      <!-- Logo and Text section -->
      <div id="logo-and-text" class="flex-container">

        <!-- Color pickers for the logo & text -->
        <div class="theme-options"><br><br>

          <color-picker v-model="themeDraft.logo" name="Logo color" :textcolor="themeDraft.bg"
            id="logo" description="The primary color for illustrations in the header.">
          </color-picker><br><br>

          <color-picker v-model="themeDraft.bg" name="Background color" :textcolor="themeDraft.bg_text"
            id="bg" description="The main background color.">
          </color-picker>
          <color-picker v-model="themeDraft.bg2" name="Background color 2" :textcolor="themeDraft.bg_text"
            id="bg" description="Used for the background of headers and stuff.">
          </color-picker><br><br>
  
          <color-picker v-model="themeDraft.bg_text" name="Background text" :textcolor="themeDraft.bg"
            id="bg_text" description="For regular text.">
          </color-picker>
          <color-picker v-model="themeDraft.bg_text2" name="Background text 2" :textcolor="themeDraft.bg"
            id="bg_text2" description="For secondary text.">
          </color-picker>
          <color-picker v-model="themeDraft.link" name="Link" :textcolor="themeDraft.bg"
            id="link" description="">
          </color-picker>

        </div>

        <div class="theme-example">
          <div class="header theme-header-example">
            <logo id="logo"></logo>
            <div class="flex-container">
              <media-decor></media-decor>
              <nonfic-decor></nonfic-decor>
              <services-decor></services-decor>
              <merch-decor></merch-decor>
            </div>
          </div>
          <div class="body theme-body-example">
            <h1>Page Title</h1>
            <h2>Subtitle, in secondary color.</h2>
            <p>Totally regular text that would appear in the body of a paragraph on a page on  the website. Hey!</p><br>
            <p>Important parts of a text passage might be highlighted to show importance. </p><br>
            <p><div class="a">Here's a link to another page →</div></p>
            <br><br><br>
          </div>
        </div>
      </div>

      <h2>Inputs: </h2>

      <!-- Inputs section -->
      <div id="inputs" class="flex-container">
        <div class="theme-options">

          <br><br>
          <color-picker v-model="themeDraft.input" name="Input background color" :textcolor="themeDraft.input_text"
            id="input" description="">
          </color-picker><br><br>
          <color-picker v-model="themeDraft.input_text" name="Input text" :textcolor="themeDraft.input"
            id="input-text" description="The color as you type in an input">
          </color-picker>
          <color-picker v-model="themeDraft.input_text2" name="Input text 2" :textcolor="themeDraft.input"
            id="input-text2" description="Placeholders and other secondary text">
          </color-picker><br><br>

          <input type="checkbox" v-model="nobox">
        </div>
        <div id="input-example" class="theme-example">

          <div class="header">
            <h3>Inputs</h3>
          </div>
          <div class="body theme-body-example">

            <text-field v-model="foo" :placeholder="'Big text field'" class="sample-input" 
              regularfont :nobox="nobox">
            </text-field>
            <text-field v-model="foo" :placeholder="'Text field w/ an icon'" class="sample-input" icon
              regularfont :nobox="nobox">
              <search-icon></search-icon>
            </text-field>
            <div class="input-container">
              <text-field v-model="foo" :placeholder="'Text field'" class="sample-input" 
                smallfont :nobox="nobox">
              </text-field>
              <text-field v-model="foo" :placeholder="'Text field w/ an icon'" class="sample-input" icon
                smallfont :nobox="nobox">
                <edit-icon></edit-icon>
              </text-field>
            </div>
            <div class="input-container">
              <text-field v-model="bar" :placeholder="'Text field'" class="sample-input" 
                smallfont :nobox="nobox">
              </text-field>
              <text-field v-model="bar" :placeholder="'Text field w/ an icon'" class="sample-input" icon
                smallfont :nobox="nobox">
                <person-icon></person-icon>
              </text-field>
            </div>
            <text-field textarea smallfont :placeholder="'Multiline textarea'" v-model="foo"
            v-if="0"></text-field>

            <button>A button!</button>

            <dropdown :options="sampleOptions"></dropdown>
            
          </div>

          
        </div>
      </div>

      <h2>Cards</h2>
      <!-- Cards section -->
      <div id="cards" class="flex-container">
        <div class="theme-options">
        </div>
        <div class="theme-example">
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

// Decoration for the desktop menu:
import mediaDecor from '~/components/link-decor/media-decor.vue';
import nonficDecor from '~/components/link-decor/non-fic-decor.vue';
import servicesDecor from '~/components/link-decor/services-decor.vue';
import merchDecor from '~/components/link-decor/merch-decor.vue';


// Our vue component:
export default {
  name: 'theme-picker',

  data() {
    return {
      themeDraft: {},

      nobox: true,

      // Sample data for inputs:
      sampleOptions: ['Option 1!', 'Option 2 :)', 'option 3 ;o', 'option 4??'],
      foo: '',
      bar: 'An input with text'
    }
  },

  components: {
    logo,

    searchIcon,

    textField,
    dropdown,
    colorPicker,

    // Desktop menu decor:
    mediaDecor,
    nonficDecor,
    servicesDecor,
    merchDecor,
  },

  mounted() {
    this.themeDraft = JSON.parse(JSON.stringify(this.currentTheme));
  },

  computed: {
    currentTheme: {
      // Found this format here: https://vuejs.org/v2/guide/computed.html#Computed-Setter
      get() {
        return this.$store.getters.themeScriptObj;
      },
      set (newValue) {
        this.themeDraft = JSON.parse(JSON.stringify(newValue));
      }
    },

    // This is copied straight from themeCSSObj in the store.
    // I considered finding a way to reuse that code, but I'm not sure it's worth it. 
    cssDraftStyleObj() {
      if (!this.themeDraft.logo) {
        return {};
      }
      // Because our colors are stored as hsl arrays, we need to iterate thru them
      //   and change them to 'hsl(x,x%,x%)' format
      let styleObj = {};
      let fields = [
        'logo',
        'header_bg',
        'bg', 'bg2', 'bg_text', 'bg_text2',
        'card', 'card2', 'card_text', 'card_text2',
        'link',
        'bg2_input', 'bg2_input_text', 'bg2_input_text2',
        'c1', 'c1_light', 'c2', 'c2_light', 'c3', 'c3_light',
        'input', 'input_text', 'input_text2',
        'input_h', 'input_h_text',
      ]
      for (let i in fields) {
        // Turning 'bg_text' into '--bg-text':
        let cssVarName = '--' + fields[i].replace(/_/g, "-");
        // Assigning that css var to our hsl string:
        styleObj[cssVarName] = 'hsl(' + this.themeDraft[fields[i]][0] + ','
                                            + this.themeDraft[fields[i]][1] + '%,'
                                            + this.themeDraft[fields[i]][2] + '%)';
      }
    return styleObj;
    }
  }
  
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
  margin-bottom: 20px;
  color: var(--bg-text2);
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
  align-items: flex-start;
}


.theme-options, .theme-example {
  max-width: 500px;
  min-width: 250px;
  p {
    color: var(--bg-text);
  }
}
.theme-example {
  width: 500px;
  background: var(--bg);
  box-shadow: 0px 0px 10px rgba(0,0,0,.6);
  .header {
    padding: 25px;
  }
}

// Theme header
.theme-header-example {
  background: var(--bg2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  #logo {
    max-width: 200px;
  }
  // contains the nav options:
  .flex-container {
    padding: 15px 0px 0px;
  }
}
.theme-body-example {
  padding: 25px;
  .text-field {
    // margin: 5px 0px;
  }
}

.input-container {
  display: flex;
  justify-content: space-between;
  padding: 0px;
  margin: 0px;
  height: 30px;
  margin-bottom: 10px;
  div {
    width: 48%;
    height: 100%;
  }
}




</style>

