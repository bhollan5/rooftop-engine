<template>
  <!-- We pass the dynamic style object in here, so it's available globally! -->
  <div :style="theme_style">

    <!-- Header: -->
    <div id="header">

      <!-- Logo: -->
      <router-link to="/">
        <logo id="header-logo"></logo>
      </router-link>

      <!-- We use this container to separate the logo from the content. -->
      <div id="header-right-side-container">

        <!-- This appears on both mobile and desktop: -->
        <div id="header-upper-menu">
          <!-- Searchbar and searchbar icon: -->
          <search-icon id="header-search-icon"> </search-icon>
          <input type="text" id="header-searchbar" placeholder="Search Media">
          
          <!-- options button -->
          <div id="user-button" @click="userOptions = true"
            v-if="$auth.loggedIn">
            <person-icon id="header-icon"></person-icon>
            <div class="user-info tablet-only">
              <span>{{ $auth.user.display_name}}</span>
              <span>{{ $auth.user.username }}</span>
            </div>
          </div>

          <div id="options-button" @click="userOptions = true"
            v-else>
            <hamburger-icon id="header-icon"></hamburger-icon>
            <span class="tablet-only">Options</span>
          </div>

        </div>

        <!-- This appears on desktop only: -->
        <div id="header-desktop-menu">

          <router-link tag="div" to="/media">
            <media-decor></media-decor>
          </router-link>
          <router-link tag="div" to="/non-fic">
            <nonfic-decor></nonfic-decor>
          </router-link>
          <services-decor></services-decor>
          <merch-decor></merch-decor>
          <!--<about-us-decor></about-us-decor>-->
        </div>

      </div> <!-- End of right-hand-side-container-->

    </div><!-- end of header -->



    <!-- Darkener, followed by popup menus -->

    <transition name="fade">
      <div id="darkener" v-if="userOptions || svgEditorOpen" @click="closePopup()"></div>

    </transition>


    <!-- User option menu -->

    <transition name="menu-popup">
    <div id="user-options" v-if="userOptions">
      <div id="user-options-header">
        <button id="user-options-close" class="bg2-button" @click="userOptions = false">
          X
        </button>

        <div class="user-info" v-if="$auth.user.username">
          <div class="user-info-text">
            <div>{{$auth.user.display_name}}</div>
            <div class="secondary">@{{$auth.user.username}}</div>
          </div>
          <div class="user-icon">
            <img src="@/assets/misc/frog-pic.svg">
          </div>
        </div>
        <router-link to="/sign-in" tag="div" class="login-button" v-else>
          Sign In
        </router-link>

      </div>

      <div id="theme-picker" class="user-option">

        <div class="flex-container row-wrap">
          <div class="theme-thumbnail" v-for="theme in theme_options" @click="applyTheme(theme)"
            :class="{ 'selected-theme': theme._id == theme_id }">
            <div v-if="theme.thumbnail" v-html="theme.thumbnail"></div>
            <div v-else>{{theme.theme_name}}</div>
          </div>
        </div>

        <router-link to="/theme-picker">Theme Editor</router-link>

      </div>

    </div>
    </transition>


    <!-- svg editor menu --> 

    <svg-editor v-if="svgEditorOpen"></svg-editor>


    <!-- This is where other pages get inserted: -->
    <nuxt />


    <!-- Footer: -->
    <div id="footer">
      <router-link tag="div" to="/non-fic" class="footer-option">
        <nonfic-icon class="footer-menu-icon"></nonfic-icon>
        <p>non-fic</p>
      </router-link>
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

// Logo (for dynamic coloring) 
import logo from '~/components/logo.vue';

// Decoration for the desktop menu:
import mediaDecor from '~/components/link-decor/media-decor.vue';
import nonficDecor from '~/components/link-decor/non-fic-decor.vue';
import servicesDecor from '~/components/link-decor/services-decor.vue';
import merchDecor from '~/components/link-decor/merch-decor.vue';

// Components for this page
import svgEditor from '~/components/inputs/svg-editor.vue';

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

    // Logo component:
    logo,

    // Desktop menu decor:
    mediaDecor,
    nonficDecor,
    servicesDecor,
    merchDecor,

    // svg editor
    svgEditor
  },
  data() {
    return {
      scrollPos: 0,     // Used to detect if we're scrolling up or down. 
      searchbarPos: 0,  // Affects the searchbar's vertical position.

      userOptions: false, // Indicates whether we're showing the user options menu
    }
  },
  computed: {

    theme_id() {
      return this.$store.getters['themes/themeId'];
    },

    // Grabbing our dynamic theme variables from the store:
    theme_style() {
      return this.$store.getters['themes/themeCSSObj'];
    },

    // Loading all theme options, for the user options menu
    theme_options() {
      return this.$store.getters['themes/allThemes'];
    },

    // Is the svg-editor open?
    svgEditorOpen() {
      return this.$store.getters['svg/svgEditorOpen'];
    }

  },
  
  mounted() {
    // Initializing our scroll monitor, to hide and show the top bar
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);

    this.$store.dispatch('themes/readAllThemes');
    
  },
  methods: {
    
    // This function happens when the user scrolls. 
    handleScroll(e) {
      return 0
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

    applyTheme(theme) {
      this.$store.commit("themes/setThemeColor", theme);
    },

    closePopup() {
      this.$store.commit("svg/closeEditor");
      this.userOptions = false;
    }

  }
}
</script>

<style lang="scss">
@import '@/styles/inputs.scss';
@import '@/styles/globals.scss';
@import '@/styles/svg-classes.scss';
@import '@/styles/components.scss';
// @import '@/styles/transitions.scss';


// Breakpoints, to make the site responsive to different screen sizes.
// These are sass variables so we can use them in media queries.
$desktop-bp: 1000px;
$tablet-bp: 400px;

// Header:
#header {
  background: var(--bg2);
  height: 50px;
  width: 100%;
  display: flex;
  position: fixed;
  justify-content: space-between;
  box-shadow: 0px 0px 5px rgba(0,0,0,.5);
  z-index: 11;

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
    background: var(--bg2-input);
    color: var(--bg2-input-text);
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
    color: var(--bg2-input-text2);
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
    fill: var(--input-text2);
  }
  
  // Header login button:
  #options-button, #user-button {
    font-size: 16px;
    cursor: pointer;
    background: var(--bg2-input);
    height: 30px;
    min-width: 60px;
    margin: 10px 10px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    #header-icon {
      fill: var(--bg2-input-text2);
      height: 15px;
      width: 15px;
    }
    span {
      color: var(--bg2-input-text2);
      margin-left: 5px;
    }
  }
  #login-button:hover {
    span {
      color: var(--input-text);
    }
    #header-icon {
      fill: var(--input-text);
    }
  }

  // Hiding the desktop menu on mobile
  #header-desktop-menu {
    display: none;
  }

  // Desktop header – larger, and with nav options
  @media only screen and (min-width: $desktop-bp){
    position: relative;
    height: 150px;
    padding: 25px 50px;

    // Changing the header to be larger on desktop
    #header-logo {
      height: 100px;
      margin: 0px;
    }

    // Styling for the desktop nav options
    #header-desktop-menu {
      display: flex;
      margin-top: 10px;
      min-width: 500px;
      // Styling for individual nav options
      svg {
        
        height: 50px;
        width: 120px;
        top: -6px;
        left: 0px;
        cursor: pointer;
        text-align: center;
      }
      // For active links in the header
      .nuxt-link-active svg {
        font-weight: bold;

        .hover-stroke-c1 {
          stroke: var(--c1);
        }
        .hover-stroke-c2 {
          stroke: var(--c1);
        }
        .hover-stroke-c3 {
          stroke: var(--c1);
        }
        .hover-fill-bg-text {
          fill: var(--bg-text);
        }


      }
      
    }
  }
  
}

// User options:
#user-options {
  position: fixed;
  height: 100%;
  width:  400px;
  max-width: 90vw;
  top: 0px;
  right: 0px;
  z-index: 12;
  background: var(--bg);
  drop-shadow: 0px 0px 10px rgba(0,0,0,1);
  // The upper part of the header
  #user-options-header {
    width: 100%;
    height: 130px;
    background: var(--bg2);
    color: var(--card-text);
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    // User icon and text
    .user-info {
      display: flex;
      .user-info-text {
        text-align: right;
        margin-right: 10px;
        padding-top: 10px;
        color: var(--bg-text);
        font-size: var(--regular-font-size);
        .secondary {
          color: var(--bg-text2);
          font-size: var(--small-font-size);
        }
      }
      .user-icon {
        width: 70px; 
        height: 70px;
        border-radius: 50%;
        background: #CEFDFE;
        overflow: hidden;
      }
    }
    // Login button 
    .login-button {
      cursor: pointer;
      color: var(--bg-text2);
      &:hover {
        color: var(--c1);
      }
    }
  }
  // For the various options in the menu.
  .user-option {
    padding: 20px;
    color: var(--bg-text);
  }
}
// Menu popup transitions:
.menu-popup-enter, .menu-popup-leave-to{
  transform: translatex(400px);
}
.menu-popup-enter-active, .menu-popup-leave-active {
  transition: transform .5s;
}
.menu-popup-enter-to,  /* .fade-leave-active below version 2.1.8 */ {
  transform: translatex(0px);
}

// Theme thumbnail
.theme-thumbnail {
  width: 100px;
  height: 40px;
  padding: 0px;
  margin-right: 10px;
  margin-bottom: 25px;
  cursor: pointer;
  box-shadow: 0px 0px 5px black;
  text-align: center;
  font-size: var(--small-font-size);
  transition: .1s;
  &:hover {
    transform: scale(1.05);
  }
}
.selected-theme {
  box-shadow: 0px 0px 5px white;
}

 
// Dark box that closes the page:
#darkener {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  background: rgba(0,0,0,.7);
  z-index: 11;
}
// Fade in for the options darkener:
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter-to {
  opacity: 1;
}

// Footer: 
#footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: space-around;
  z-index: 11;

  background: var(--bg2);
  box-shadow: 0px 0px 10px rgba(0,0,0,.8);
  
  // Desktop footer:
  @media only screen and (min-width: $desktop-bp){
    display: none;
  }
  
  
  // Footer buttons:
  .footer-option {
    color: var(--bg-text2);
    font-size: var(--small-font-size);
    display: flex;
    width: 25%;
    flex-direction: column;
    align-items: center;
    svg {
      fill: var(--bg-text2);
      transform: scale(1.5);
    }
    border-right: 1px solid var(--bg);
  }
  .nuxt-link-active {
    color: var(--c1);
    svg {
      fill: var(--c1);
    }
  }

  // Menu icons:
  .footer-menu-icon {
    margin-top: 10px;
    height: 24px;
  }
}



</style>
