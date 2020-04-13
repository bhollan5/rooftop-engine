<template>
<!-- The theme picker lets users edit the colors & stylings of a theme. -->
<div class="content">

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
    <card title="Color palette:">
      <simple-palette v-model="selected_color"
        :colors="themeDraft.colors"></simple-palette>
    </card>

    <!-- Color picker -->
    <card title="Color editor:" nopadding>
      <color-picker v-for="(color_vals, key) in themeDraft.colors"
      :key="key" v-if="selected_color == key"
      v-model="themeDraft.colors[key]" 
      :id="selected_color" :textcolor="themeDraft.colors.bg"
      description="The primary color for illustrations in the header.">
      </color-picker>
    </card>

  </side-bar>
  
  <!-- Example theme content:  -->
  <div class="full-page" id="sample-page" :style="$theme.theme_css_obj(themeDraft)">

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
    <div class="body">

      <h1 id="theming-header">Dynamic Theming</h1>
      <h2>Customize Rooftop's theme here!</h2>
      <p class="byline">by <router-link to="/">Rooftop Media</router-link></p>

      <br>
      
      <div class="big-br"></div>
      <line-break style="width: 40%;margin: 0px 30% 50px"></line-break>

      <h3>1. Illustration & alternate backgrounds: </h3>

      <p>Totally regular text that would appear in the body of a paragraph on a page on  the website. Hey!</p><br>
      <p>Important parts of a text passage might be highlighted to show importance. </p><br>
      <p><div class="a">Here's a link to another page →</div></p>




      <!-- Design section -->
      <div id="logo-and-text">

        <design-highlights style="width: 50%;margin: 50px 25%"></design-highlights> 
        <div class="content theme-body-example">
          <design-highlight-example></design-highlight-example>

          <card title="Card containers">
            Used to section of content!
          </card>

          <br><br><br>
        </div>

      </div>


    <!--                -->
    <!-- Inputs section -->
    <!--                -->


      <h2>Inputs: </h2>
      <div id="inputs" >
      
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

import simplePalette from '~/components/widgets/simple-palette/simple-palette.vue';


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

    simplePalette,
  },

  mounted() {
    this.resetTheme();

    //this.$store.dispatch("articles/read_articles");

  },


  computed: {
    // The theme currently being used, which we copy for our theme draft.
    currentTheme() {
      let currentTheme = this.$store.getters['themes/theme_object'];
      return this.$theme.simplify(currentTheme);
    },
    // We compute this separately because we can use it in a watch function.
    theme_id() {
      return this.$store.getters['themes/theme_id'];
    },

    // Takes the colors and turns them into a proper css object
    theme_draft_style_object() {
      console.log("Updating css")
      if (!this.themeDraft.colors.logo) {
        return {};
      }
      return this.$store.getters['themes/theme_css_object'](this.themeDraft);
    },

    // For our sample collection
    collectionOfall_articles() {
      return this.$store.getters['collections/collectionOfall_articles']
    }
  }, 
  
  watch: {
    theme_id() {
      if (confirm("If you change the theme now, you'll lose the changes you've made to your theme draft.")){
        this.resetTheme();
      }
    },
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

