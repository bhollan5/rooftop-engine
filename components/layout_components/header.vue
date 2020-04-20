<template>
<div id="header">

  <!-- Logo: -->
  <router-link to="/">
    <logo id="header-logo"></logo>
  </router-link>

  <!-- We use this container to separate the logo from the content. -->
  <div id="header-right-side-container">

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
    </div>

    <!-- Searchbar and searchbar icon: -->
    <text-field title="" placeholder="Search Media" icon smallfont v-if="0">
      <search-icon> </search-icon>
    </text-field>
    
    <!-- User options button - pfp, display name, username -->
    <div id="user-options-button" @click="$emit('input', true)"
      v-if="$auth.loggedIn">
      <div class="user-info-text tablet-only">
        <div class="small-font secondary">{{ $auth.user.display_name}}</div>
        <div class="secondary" v-if="0">{{ $auth.user.username }}</div>
      </div>
      <div class="user-icon">
        <img src="@/assets/misc/frog-pic.svg">
      </div>
    </div>
    <!-- "Options" button, if the user isn't logged in. -->
    <div id="options-button" @click="$emit('input', true)"
      v-else>
      <hamburger-icon class="hamburger-icon"></hamburger-icon>
      <span class="tablet-only">Options</span>
    </div>

  </div> <!-- End of right-hand-side-container-->
</div><!-- end of header -->
</template>

<script>

// Logo 
import logo from '~/components/static_components/logo.vue';

// Link decorations:
import mediaDecor from '~/components/static_components/link-decor/media-decor.vue';
import nonficDecor from '~/components/static_components/link-decor/non-fic-decor.vue';
import servicesDecor from '~/components/static_components/link-decor/services-decor.vue';
import merchDecor from '~/components/static_components/link-decor/merch-decor.vue';


// Our vue component
export default {
  components: {

    // Logo component:
    logo,

    // Desktop menu decor:
    mediaDecor, nonficDecor, servicesDecor, merchDecor,

  },
  data() {
    return {
      scrollPos: 0,     // Used to detect if we're scrolling up or down. todo: do we need this?
      searchbarPos: 0,  // Affects the searchbar's vertical position.

    }
  },
  props: {
    value: {
      type: Boolean,
    }
  },
  computed: {

    theme_id() {
      return this.$store.getters['themes/theme_id'];
    },

    // Grabbing our dynamic theme variables from the store:
    theme_style() {
      return this.$store.getters['themes/theme_css'];
    },

    // Loading all theme options, for the user options menu
    theme_options() {
      return this.$store.getters['themes/allThemes'];
    },

    // User projects
    user_projects() {
      if (this.$auth.loggedIn) {
        return this.$store.getters['projects/get_user_projects'](this.$auth.user.username);
      }
      return [];
    },

    

  },
  
  mounted() {
    // Initializing our scroll monitor, to hide and show the top bar
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);

    // For the theme picker:
    this.$store.dispatch('themes/readAllThemes');
    // For the project list:
    if (this.$auth.loggedIn){
      this.$store.dispatch('db/projects/read_projects', { owner: this.$auth.user.username })
    }
    
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


  }
}
</script>

<style lang="scss" scoped>

$desktop-bp: 1000px;
$tablet-bp: 400px;

///////////////////
//    Header:    //
///////////////////

#header {
  background: var(--bg2);
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 5px rgba(0,0,0,.7);
  z-index: 200;

  // Logo:
  #header-logo {
    height: 30px;
    margin-top: 10px;
    margin-left: 10px;
  }

  // This contains both the search bar and the desktop menu options.
  #header-right-side-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0px;
  }

  .text-field  {
    margin: 0px; padding: 0px;
  }
  
  // Header login button:
  #options-button, #user-options-button {
    font-size: 16px;
    cursor: pointer;
    background: var(--bg2-dark);
    height: 30px;
    min-width: 60px;
    margin: 0px 10px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    .user-icon {
      width: 15px; 
      height: 15px;
      border-radius: 50%;
      background: #CEFDFE; // sky of frog pfp
      overflow: hidden;
    }
    .hamburger-icon {
      width: 15px;
      height: 15px;
      fill: var(--bg-text2);
    }
    .user-info-text {
      text-align: right;
      margin-right: 10px;
      color: var(--bg-text);
      font-size: var(--regular-font-size);
      .secondary {
        color: var(--bg-text2);
        font-size: var(--small-font-size);
      }
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
    
  }
  #header-icon {
    fill: var(--input-text);
  }

  // Hiding the desktop menu on mobile
  #header-desktop-menu {
    display: none;
  }

  // Desktop header – larger, and with nav options
  @media only screen and (min-width: $desktop-bp){
    position: relative;
    height: 80px;
    padding: 20px 50px;

    // Changing the header to be larger on desktop
    #header-logo {
      height: 40px;
      margin: 0px;
    }

    // Styling for the desktop nav options
    #header-desktop-menu {
      display: flex;
      min-width: 500px;
      align-items: center;
      // Styling for individual nav options
      svg {
        margin-top: 10px;
        height: 50px;
        width: 120px;
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
</style>