<template>
  <div>

    <!-- Header: -->
    <div class="header"
        :style="theme_colors">

      <!-- Logo: -->
      <img src="~/assets/logo/logo_white.png" id="header-logo">

      <!-- We use this container to separate the logo from the content. -->
      <div id="header-right-side-container">

        <!-- This appears on both mobile and desktop: -->
        <div id="header-upper-menu">
          <!-- Searchbar and searchbar icon: -->
          <search-icon id="header-search-icon"> </search-icon>
          <input type="text" id="header-searchbar" placeholder="Search Media"
              :style="theme_colors">
          
          <!-- Log In button -->
          <div id="login-button">
            <hamburger-icon id="header-icon"
              :style="theme_colors"></hamburger-icon>
            <span class="tablet-only">Options</span>
          </div>
        </div>

        <!-- This appears on desktop only: -->
        <div id="header-desktop-menu">
          <media-decor></media-decor>
          <nonfic-decor></nonfic-decor>
          <services-decor></services-decor>
          <merch-decor></merch-decor>
          <about-us-decor></about-us-decor>
        </div>

      </div>

    </div>


    <!-- This is where other pages get inserted: -->
    <nuxt />


    <!-- Footer: -->
    <div id="footer" :style="theme_colors">
      <div class="footer-option">
        <nonfic-icon class="footer-menu-icon"></nonfic-icon>
        <p>non-fic</p>
      </div>
      <div class="footer-option">
        <media-icon class="footer-menu-icon"></media-icon>
        <p>media</p>
      </div>
      <div class="footer-option">
        <services-icon class="footer-menu-icon"></services-icon>
        <p>services</p>
      </div>
      <div class="footer-option">
        <merch-icon class="footer-menu-icon"></merch-icon>
        <p>merch</p>
      </div>
    </div>

  </div>
</template>

<script>
// Importing icon components
//   We import SVG icons this way so we can modify them with CSS, for theming.
//   To understand why: https://css-tricks.com/using-svg/ 
import searchIcon from '~/components/icons/search-icon.vue';
import hamburgerIcon from '~/components/icons/hamburger-icon.vue';

// Mobile icons:
import nonficIcon from '~/components/icons/nonfic-icon.vue';
import mediaIcon from '~/components/icons/media-icon.vue';
import servicesIcon from '~/components/icons/services-icon.vue';
import merchIcon from '~/components/icons/merch-icon.vue';

// Decoration for the desktop menu:
import mediaDecor from '~/components/link-decor/media-decor.vue';
import nonficDecor from '~/components/link-decor/non-fic-decor.vue';
import servicesDecor from '~/components/link-decor/services-decor.vue';
import merchDecor from '~/components/link-decor/merch-decor.vue';
import aboutUsDecor from '~/components/link-decor/about-us-decor.vue';


// Our vue component
export default {
  components: {
    searchIcon,     // For the search bar
    hamburgerIcon,  // For account options

    // Mobile menu icons:
    nonficIcon,     
    mediaIcon,
    servicesIcon,
    merchIcon,

    // Desktop menu decor:
    mediaDecor,
    nonficDecor,
    servicesDecor,
    merchDecor,
    aboutUsDecor
  },
  data() {
    return {
      scrollPos: 0,     // Used to detect if we're scrolling up or down. 
      searchbarPos: 0,  // Affects the searchbar's vertical position.
    }
  },
  computed: {

    // This lets us use :style="theme_colors" to activate dynamic theming
    //   in a given tag.  I found it here:
    //   https://stackoverflow.com/questions/46551925/vuejs-v-bindstyle-hover
    theme_colors() {
      return {
        '--bg': this.$store.state.bg,
        '--bg-light': this.$store.state.bg_light,
        '--bg-lighter': this.$store.state.bg_lighters,
        '--fg': this.$store.state.fg,
      } // TODO: The store could return this object with a getter, reduce redundancy
    }

  },
  
  mounted() {
    // Initializing our scroll monitor, to hide and show the top bar
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);

    // // Changing our theme colors:
    // this.$store.commit("setThemeColor", {
    //   bg: 'white',
    //   bg_light: 'pink',
    //   bg_lighter: 'seafoam'
    // })
  },
  methods: {
    
    // This function happens when the user scrolls. 
    handleScroll(e) {

      // Keeps the bar at the top when we're at the top
      if (window.scrollY == 0) {
        this.searchbarPos = 0;

      // This "if" detects if we're scrolling up:
      } else if (this.scrollPos < -window.scrollY){
        if (this.searchbarPos < 0) {
          this.searchbarPos += 2;
        }  
      
      // And this one for when we scroll down:
      } else {
        if (this.searchbarPos > -50) {
          this.searchbarPos -= 4;
        }
      }

      // This scrollPos variable lets us check if we're going up or down. 
      this.scrollPos = -window.scrollY;
    },

  }
}
</script>

<style lang="scss">
// This CSS effects ALL PAGES, GLOBALLY. All other CSS should be scoped. 
// TODO: see if we can put globally scoped css into a different .scss file, 
// to keep things tidy. 
// default.vue has a lot of it's own stylings... 
// maybe we put the header and footer in their own component files too?
@font-face {
  font-family: crimsonText;
  src: url('../assets/fonts/CrimsonText-Regular.ttf');
}

html {
  font-family: crimsonText, serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
input {
  font-family: crimsonText;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

// Global vars:
:root {
  // These color scheme vars can be changed dynamically with the theme_color() function
  --bg: white;
  --bg-light: hsl(248,19%,40%);
  --bg-lighter: hsl(230,19%,60%);
  --fg: hsl(0,0%,96%);

  --box-shading: 0px 0px 3px rgba(0,0,0,.7);
}


// Breakpoints, to make the site responsive to different screen sizes.
// These are sass variables so we can use them in media queries.
$desktop-bp: 800px;
$tablet-bp: 400px;

// Header:
.header {
  background: var(--bg);
  height: 50px;
  width: 100%;
  display: flex;
  position: fixed;
  justify-content: space-between;
  box-shadow: var(--box-shading);

  // Logo:
  #header-logo {
    height: 30px;
    margin-top: 10px;
    margin-left: 10px;
  }

  // This contains both the search bar and the desktop menu options.
  #header-right-side-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0px;
  }

  // This div contains both the search bar and the options button.
  #header-upper-menu {
    display: flex;
    position: relative;
  }

  // Searchbar:
  #header-searchbar {
    background: var(--bg-light);
    color: var(--fg);
    outline: none;
    border: none;
    height: 30px;
    font-size: 16px;
    min-width: 150px;
    margin-top: 10px;
    margin-left: 10px;
    display: block;
    padding-left: 30px;
  }
  ::placeholder {
    color: var(--bg-lighter);
  }
  #header-searchbar:focus {
    // TODO: Figure out how to expand the width smoothly and w/o bugs here
  }
  #header-search-icon {
    position: absolute;
    height: 15px;
    width: 15px;
    left: 20px;
    top: 18px;
    fill: var(--bg-lighter);
  }
  
  // Header login button:
  #login-button {
    background: var(--bg-light);
    height: 30px;
    min-width: 60px;
    margin: 10px 10px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    #header-icon {
      fill: var(--bg-lighter);
      height: 15px;
      width: 15px;
    }
    span {
      color: var(--bg-lighter);
      margin-left: 5px;
    }
  }

  // Hiding the desktop menu on mobile
  #header-desktop-menu {
    display: none;
  }

  // Desktop header – larger, and with nav options
  @media only screen and (min-width: $desktop-bp){
    height: 200px;
    padding: 50px;

    // Changing the header to be larger on desktop
    #header-logo {
      height: 100px;
    }

    // Styling for the desktop nav options
    #header-desktop-menu {
      display: flex;
      margin-top: 30px;
      min-width: 500px;
      color: var(--fg);
      // Styling for individual nav options
      svg {
        height: 50px;
        width: 100px;
        top: -6px;
        left: 0px;
      }
      
    }
  }
  
}

// Footer: 
#footer {
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: space-around;

  background: var(--bg);
  box-shadow: var(--box-shading);
  
  // Desktop footer:
  @media only screen and (min-width: $desktop-bp){
    display: none;
  }
  
  // Footer buttons:
  .footer-option {
    color: var(--bg-lighter);
    font-size: 20px;
    display: flex;
    width: 25%;
    flex-direction: column;
    align-items: center;
  }

  // Menu icons:
  .footer-menu-icon {
    margin-top: 10px;
    height: 24px;
  }
}
</style>
