<template>
<!-- The theme picker lets users edit the colors & stylings of a theme. -->
<div class="body">

  <side-bar>
    <!-- Theme details: -->
    <card title="Theme Editor:">
      <text-field regularfont 
      v-model="themeDraft.theme_name" 
      title="Theme name:"
      placeholder="My theme name"></text-field>
      <text-field regularfont 
      v-model="themeDraft._id" 
      title="Theme id:"
      placeholder="Theme id"></text-field>

      <button @click="resetTheme()" style="margin-left: 50%;transform:translatex(-50%);">Reset theme</button>
    </card>

    <!-- Color picker -->
    <card title="Color palette:" min>
      <color-palette v-model="selected_color"></color-palette>
    </card>

    <!-- Color picker -->
    <card title="Color palette:" nopadding>
      <color-picker v-for="(color_vals, key) in themeDraft.colors"
      :key="key" v-if="selected_color == key"
      v-model="themeDraft.colors[key]" 
      :id="selected_color" :textcolor="themeDraft.colors.bg"
      description="The primary color for illustrations in the header.">
      </color-picker>
    </card>

  </side-bar>
  
  <!-- Example theme content:  -->
  <div class="full-page" id="sample-page" :style="cssDraftStyleObj">

    <div class="header theme-header-example flex-container space-between">
      <logo id="logo"></logo>
      <div class="right-side-container">
        <media-decor></media-decor>
        <nonfic-decor></nonfic-decor>
        <services-decor></services-decor>
        <merch-decor></merch-decor>
      </div>
    </div>


    <!-- Starts our column of content -->
    <div class="content">

      <h1 id="theming-header">Dynamic Theming</h1>
      <h2>Customize Rooftop's theme here!</h2>
      <p class="byline">by <router-link to="/">Rooftop Media</router-link></p>

      <br>
      
      <div class="big-br"></div>
      <line-break style="width: 40%;margin: 0px 30% 50px"></line-break>

      <h3>Illustration & alternate backgrounds: </h3>

      <p>Totally regular text that would appear in the body of a paragraph on a page on  the website. Hey!</p><br>
      <p>Important parts of a text passage might be highlighted to show importance. </p><br>
      <p><div class="a">Here's a link to another page →</div></p>




      <h3>Illustration & alternate backgrounds: </h3>
      <!-- Logo and Text section -->
      <div id="logo-and-text" class="flex-container space-around">

        <div class="theme-example">
          <div class="header">
            <design-highlights></design-highlights> 
          </div>
          <div class="content theme-body-example">
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
      
        <div class="content theme-body-example">

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

          <dropdown :options="sample_array" v-model="option_chosen"></dropdown><br>
          <picker :options="sample_object_list" v-model="option_chosen"></picker>
          {{option_chosen}}
            

          
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
    <!-- End of column content -->
    </div>
  <!-- End of customizer -->
  </div>

</div>
</template>

<script>
// importing the logo svg:
import logo from '~/components/logo.vue';

// Decoration for the desktop menu:
import mediaDecor from '~/components/header/link-decor/media-decor.vue';
import nonficDecor from '~/components/header/link-decor/non-fic-decor.vue';
import servicesDecor from '~/components/header/link-decor/services-decor.vue';
import merchDecor from '~/components/header/link-decor/merch-decor.vue';

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
      
      // What color is being edited 
      selected_color: 'bg',

      nobox: false,

      // Sample data for inputs:
      foo: '',
      bar: 'An input with text',
      option_chosen: "sampleOptions",
      sample_array: ['Option 1!', 'Option 2 :)', 'option 3 ;o', 'option 4??'],
      sample_object_list: [{
          icon: '1.',
          title: 'Option 1',
          description: 'Description of option 1',
          value: 'option1',
      }, {
          icon: '2.',
          title: 'Option 2',
          description: 'Description of option 2',
          value: 'option2'
      }],
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
      console.log("Updating css")
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

#sample-page {
  background: var(--bg);
  position: relative;
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
  position: relative;
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
  align-items: center;
  padding: 25px;
  position: relative;
  top: 0px;
  left: 0px;
  #logo {
    max-width: 200px;
    min-width: 60px;
  }
  // contains the nav options:
  .flex-container {
    padding: 15px 0px 0px;
  }
}
.right-side-container {
  display: flex;
  width: 300px;
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

