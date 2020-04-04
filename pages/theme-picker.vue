<template>
<!-- The theme picker lets users edit the colors & stylings of a theme. -->
<div class="body">

  <side-bar>

    <card title="Theme Editor:">
      <text-field regularfont 
      v-model="themeDraft.theme_name" 
      title="Theme name:"
      placeholder="My theme name"></text-field>
      <text-field regularfont 
      v-model="themeDraft._id" 
      title="Theme id:"
      placeholder="Theme id"></text-field>

      <color-palette></color-palette>

      <color-picker v-model="themeDraft.colors.logo" name="Logo color" :textcolor="themeDraft.colors.bg"
        id="logo" description="The primary color for illustrations in the header.">
      </color-picker>

      <button @click="resetTheme()" style="margin-left: 50%;transform:translatex(-50%);">Reset theme</button>
    </card>

  </side-bar>
  
  <!-- Theme display  -->
  <div class="content">

    <h1 id="theming-header">Dynamic Theming</h1>
    <h2>Customize Rooftop's theme here!</h2>
    <p class="byline">by <router-link to="/">Rooftop Media</router-link></p>

    <br>
    
    <div class="big-br"></div>
    <line-break style="width: 40%;margin-left: 30%"></line-break>



        <!-- Custom styling begines! -->
    <!-- In the "customizer" div, we use temporary styling. -->
    <div id="customizer" :style="cssDraftStyleObj">


      <!-- primary elements -->

      <h2>Headers, bodies, and text: </h2>
      <!-- Logo and Text section -->
      <div id="logo-and-text" class="flex-container space-around">

        <!-- Color pickers for the logo & text -->
        <div class="theme-options" v-if="0"><br><br>

          <color-picker v-model="themeDraft.colors.logo" name="Logo color" :textcolor="themeDraft.colors.bg"
            id="logo" description="The primary color for illustrations in the header.">
          </color-picker><br><br>

          <color-picker v-model="themeDraft.colors.bg" name="Background color" :textcolor="themeDraft.colors.bg_text"
            id="bg" description="The main background color.">
          </color-picker>
          <color-picker v-model="themeDraft.colors.bg2" name="Background color 2" :textcolor="themeDraft.colors.bg_text"
            id="bg" description="Used for the background of headers and stuff.">
          </color-picker><br><br>

          <color-picker v-model="themeDraft.colors.bg_text" name="Background text" :textcolor="themeDraft.colors.bg"
            id="bg_text" description="For regular text.">
          </color-picker>
          <color-picker v-model="themeDraft.colors.bg_text2" name="Background text 2" :textcolor="themeDraft.colors.bg"
            id="bg_text2" description="For secondary text.">
          </color-picker>
          <color-picker v-model="themeDraft.colors.link" name="Link" :textcolor="themeDraft.colors.bg"
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
          <div class="theme-body-example">
            <h1>Page Title</h1>
            <h2>Subtitle, in secondary color.</h2>
            <p>Totally regular text that would appear in the body of a paragraph on a page on  the website. Hey!</p><br>
            <p>Important parts of a text passage might be highlighted to show importance. </p><br>
            <p><div class="a">Here's a link to another page →</div></p>
            <br><br><br>
          </div>
        </div>
      </div>




      <h2>Illustration & alternate backgrounds: </h2>
      <!-- Logo and Text section -->
      <div id="logo-and-text" class="flex-container space-around">

        <!-- Color pickers for the logo & text -->
        <div class="theme-options"><br><br>

          <color-picker v-model="themeDraft.colors.c1" name="Design color 1" :textcolor="themeDraft.colors.bg"
            id="c1" description="">
          </color-picker>
          <color-picker v-model="themeDraft.colors.c2" name="Design color 2" :textcolor="themeDraft.colors.bg"
            id="c2" description="">
          </color-picker>
          <color-picker v-model="themeDraft.colors.c3" name="Design color 3" :textcolor="themeDraft.colors.bg"
            id="c3" description="">
          </color-picker><br><br>

          <color-picker v-model="themeDraft.colors.card" name="Card backgound color" 
          :textcolor="themeDraft.colors.card_text" id="card" description="The background for secondary 'card' containers.">
          </color-picker>
          <color-picker v-model="themeDraft.colors.card2" name="Card backgound color 2" 
          :textcolor="themeDraft.colors.card_text" id="card2" description="The background for secondary 'card' containers.">
          </color-picker><br><br>

          <color-picker v-model="themeDraft.colors.card_text" name="Card backgound color" 
          :textcolor="themeDraft.colors.card" id="card-text" description="The background for secondary 'card' containers.">
          </color-picker>
          <color-picker v-model="themeDraft.colors.card_text2" name="Card backgound color 2" 
          :textcolor="themeDraft.colors.card" id="card-text2" description="The background for secondary 'card' containers.">
          </color-picker><br><br>

        </div>

        <div class="theme-example">
          <div class="header theme-header-example">
            <design-highlights></design-highlights> 
          </div>
          <div class="body theme-body-example">
            <design-highlight-example></design-highlight-example>

            <div class="card card-padding">
              <div class="card-header">
                <h3>Card containers</h3>
                <h4>Used to section off content!</h4>
              </div>
              <div class="card-body">
                <div>Various content containers might use a secondary background color palette. </div>
              </div>
              <hr style="border: solid 3px var(--c1);">
              <br style="height: 15px;">
            </div>

            <br><br><br>
          </div>
        </div>
      </div>


    <!--                -->
    <!-- Inputs section -->
    <!--                -->


      <h2>Inputs: </h2>
      <div id="inputs" class="flex-container space-around">
        <div class="theme-options">

            <!-- Input background -->
          <br><br>
          <color-picker v-model="themeDraft.colors.input" name="Input background color" 
          :textcolor="themeDraft.colors.input_text" id="input" description="">
          </color-picker><br><br>

            <!-- Input text -->
          <color-picker v-model="themeDraft.colors.input_text" name="Input text" 
          :textcolor="themeDraft.colors.input" id="input-text" description="The color as you type in an input">
          </color-picker>

            <!-- Secondary input text -->
          <color-picker v-model="themeDraft.colors.input_text2" name="Input text 2" 
          :textcolor="themeDraft.colors.input" id="input-text2" description="Placeholders and other secondary text">
          </color-picker><br><br>

          <color-picker v-model="themeDraft.colors.action" name="Action color" 
          :textcolor="themeDraft.colors.action_text" id="action" description="For buttons and active fields.">
          </color-picker>
          <color-picker v-model="themeDraft.colors.action_text" name="Action text" 
          :textcolor="themeDraft.colors.action" id="action" description="For buttons and active fields.">
          </color-picker>

          <color-picker v-model="themeDraft.colors.confirm" name="Confirm color" 
          :textcolor="themeDraft.colors.confirm_text" id="input-text2" description="To indicate something affirmative.">
          </color-picker>
          <color-picker v-model="themeDraft.colors.confirm_text" name="Confirm text" 
          :textcolor="themeDraft.colors.confirm" id="input-text2" description="Text that works over the confirm color.">
          </color-picker>

          <color-picker v-model="themeDraft.colors.danger" name="Danger Color" 
          :textcolor="themeDraft.colors.danger_text" id="input-text2" description="For errors and other negative stuff.">
          </color-picker>
          <color-picker v-model="themeDraft.colors.danger_text" name="Danger text" 
          :textcolor="themeDraft.colors.danger" id="input-text2" description="Text that works over the confirm color.">
          </color-picker>

          <input type="checkbox" v-model="nobox">
        </div>
        <div id="input-example" class="theme-example">

          <div class="header">
            <h3>Inputs</h3>
          </div>
          <div class="body theme-body-example">

            <text-field v-model="foo" :placeholder="'Placeholder text...'" class="sample-input" 
              regularfont :nobox="nobox" :title="'Big text field'">
            </text-field>
            <text-field v-model="foo" :title="'Big icon text field'" class="sample-input" icon
              regularfont :nobox="nobox" :placeholder="'Placeholder text...'">
              <search-icon></search-icon>
            </text-field>
            <div class="input-container">
              <text-field v-model="foo" :placeholder="'Placeholder text...'" class="sample-input" 
                smallfont :nobox="nobox" :title="'Small text field'">
              </text-field>
              <text-field v-model="foo" :title="'Small icon text field'" class="sample-input" icon
                smallfont :nobox="nobox" :placeholder="'Placeholder text...'">
                <edit-icon></edit-icon>
              </text-field>
            </div>
            <div class="input-container">
              <text-field v-model="bar" :title="'Text field with text'" class="sample-input" 
                smallfont :nobox="nobox" :placeholder="'Placeholder text...'">
              </text-field>
              <text-field v-model="bar" :title="'Icon text field with text'" class="sample-input" icon
                smallfont :nobox="nobox" :placeholder="'Placeholder text...'">
                <person-icon></person-icon>
              </text-field>
            </div>
            <text-field textarea smallfont :placeholder="'Multiline textarea'" v-model="foo"
            v-if="0"></text-field>

            <button>
              <gear-icon></gear-icon>
              A button!
            </button>

            <dropdown :options="sampleOptions" v-if="0"></dropdown>
            
          </div>

          
        </div>
      </div>



      <h2>Theme Icon:</h2>

      <div class="flex-container space-around">
        <svg-uploader v-model="themeDraft.thumbnail" :height="40" :width="120" class="icon-uploader" :id="'theme-icon-upload'">
        </svg-uploader>
      </div>
      <br><br>
      <div class="flex-container space-around">
        <button @click="submitTheme()">Save theme!</button>
      </div>
    
    </div>

  <!-- End of content -->
  </div>

</div>
</template>

<script>
// importing the logo svg:
import logo from '~/components/logo.vue';

// Decoration for the desktop menu:
import mediaDecor from '~/components/link-decor/media-decor.vue';
import nonficDecor from '~/components/link-decor/non-fic-decor.vue';
import servicesDecor from '~/components/link-decor/services-decor.vue';
import merchDecor from '~/components/link-decor/merch-decor.vue';

// Theme picker components:
import designHighlights from '~/components/style_guide/design-highlights.vue';
import designHighlightExample from '~/components/style_guide/design-highlight-example.vue';


// Our vue component:
export default {
  name: 'theme-picker',

  data() {
    return {
      themeDraft: {
        colors: {}
      },

      nobox: false,

      // Sample data for inputs:
      sampleOptions: ['Option 1!', 'Option 2 :)', 'option 3 ;o', 'option 4??'],
      foo: '',
      bar: 'An input with text'
    }
  },

  components: {
    logo,

    // Desktop menu decor:
    mediaDecor,
    nonficDecor,
    servicesDecor,
    merchDecor,

    // Theme picker components:
    designHighlights,
    designHighlightExample,
  },

  mounted() {
    this.resetTheme();

    this.$store.dispatch("articles/readArticles");

  },

  computed: {
    // The theme currently being used, which we copy for our theme draft.
    currentTheme() {
      return this.$store.getters['themes/theme_object'];
    },
    // We compute this separately because we can use it in a watch function.
    theme_id() {
      return this.$store.getters['themes/themeId'];
    },

    // This is copied straight from themeCSSObj in the store.
    // I considered finding a way to reuse that code, but I'm not sure it's worth it. 
    cssDraftStyleObj() {
      if (!this.themeDraft.colors.logo) {
        return {};
      }
      // Because our colors are stored as hsl arrays, we need to iterate thru them
      //   and change them to 'hsl(x,x%,x%)' format
      let styleObj = {};
      let fields = [
        'logo',
        'bg', 'bg2', 'bg_text', 'bg_text2',
        'card', 'card2', 'card_text', 'card_text2',
        'link',
        'bg2_input', 'bg2_input_text', 'bg2_input_text2',
        'c1', 'c1_light', 'c2', 'c2_light', 'c3', 'c3_light',
        'input', 'input_text', 'input_text2',
        'action', 'confirm', 'danger',
        'action_text', 'confirm_text', 'danger_text',
      ]
      for (let i in fields) {
        if (!this.themeDraft.colors[fields[i]]) {
          console.error("This theme is missing a color: " + fields[i]);
          break;
        }

        // Turning 'bg_text' into '--bg-text':
        let cssVarName = '--' + fields[i].replace(/_/g, "-");
        // Assigning that css var to our hsl string:
        styleObj[cssVarName] = 'hsl(' + this.themeDraft.colors[fields[i]][0] + ','
                                            + this.themeDraft.colors[fields[i]][1] + '%,'
                                            + this.themeDraft.colors[fields[i]][2] + '%)';
      }
      return styleObj;
    },

    // For our sample collection
    collectionOfAllArticles() {
      return this.$store.getters['collections/collectionOfAllArticles']
    }
  }, 
  
  watch: {
    theme_id() {
      if (confirm("If you change the theme now, you'll lose the changes you've made to your theme draft.")){
        this.resetTheme();
      }
    }
  },

  methods: {
    submitTheme() {
      console.log(this.themeDraft);
      this.$store.dispatch('themes/createTheme', this.themeDraft);
    },

    resetTheme() {
      this.themeDraft = JSON.parse(JSON.stringify(this.currentTheme));
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


// This div contains ALL the customization sections.
#customizer {
  padding-top: 50px;
}

#theme-details {
  width: 350px;
  margin-left: 50%;
  transform: translatex(-50%);

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
  max-width: 90%;
  min-width: 250px;
  p {
    color: var(--bg-text);
  }
}
.theme-example {
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
  div {
    width: 48%;
    height: 100%;
  }
}

.icon-uploader {
  border: solid var(--bg-text2) 2px;
}


</style>

