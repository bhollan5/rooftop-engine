<template>
<div :style="theme_style">
  <!-- That :style attribute loads the custom theming for the entire site -->



  <!--       Header:      -->

  <!-- <header> is already a thing, so we use <site-header>-->
  <site-header v-model="display_user_options"></site-header>
  


<!--       Darkener:      -->

  <transition name="fade">
    <div id="darkener" v-if="display_user_options || svgEditorOpen" @click="closePopup()"></div>
  </transition>


  <!--                            -->
<!--       User options menu:       -->
  <!--          (popup)           -->

  <transition name="menu-popup">
  <div id="user-options" v-if="display_user_options">
    
    <div id="user-options-header">
      <button id="user-options-close" class="bg2-button" @click="display_user_options = false">
        X
      </button>

      <!-- User info - pfp, display name, username -->
      <div id="user-info" v-if="$auth.loggedIn">

        <div class="user-info-text">
          <div>{{$auth.user.display_name}}</div>
          <div class="secondary">@{{$auth.user.username}}</div>
        </div>
        <div class="user-icon">
          <img src="@/assets/misc/frog-pic.svg">
        </div>
      </div>
      <!-- Sign-in button, if the user isn't logged in. -->
      <router-link to="/sign-in" tag="div" class="login-button" v-else>
        Sign In
      </router-link>

    </div> <!-- End of user option header -->

    <!-- project display -->
    <h3 v-if="$auth.loggedIn">Projects:</h3>
    <div class="project-display" v-if="$auth.loggedIn">
      
      <router-link class="project-option" tag="div"
      v-for="(project, proj_i) in user_projects" :key="proj_i"
      :to="'/projects/' + project._id">
        <div>{{project.title}}</div>
        <div class="byline">by Rooftop Media</div>
      </router-link>

    </div>

    <router-link tag="button" :to="'new-project'" class="action" style="margin-left: 15px;">
      + Start new project
    </router-link><br><br>

    <!-- Theme picker -->
    <h3>Theme:</h3>
    <div id="theme-picker" class="user-option">

      <div class="flex-container row-wrap">
        <div class="theme-thumbnail" v-for="theme in theme_options" @click="applyTheme(theme)"
          :class="{ 'selected-theme': theme._id == theme_id }">
          <div v-if="theme.thumbnail" v-html="theme.thumbnail"></div>
          <div v-else>{{theme.theme_name}}</div>
        </div>
      </div>

      <router-link to="/theme-picker">Theme Editor</router-link>
      <button class="danger" v-if="$auth.loggedIn"
        @click="$auth.logout()">Log Out</button>

    </div>

  </div>
  </transition>


  <!--                    -->
<!--       svg editor:      -->
  <!--                    -->

  <svg-editor v-if="svgEditorOpen"></svg-editor>


  <!-- This is where other pages get inserted: -->
  <nuxt />




  <!--                             -->
<!--       Mobile footer links:      -->
  <!--                             -->
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

// Importing the header:
import siteHeader from '~/components/header/header.vue';

// Popup svg editor:
import svgEditor from '~/components/inputs/svg-editor.vue';

export default {
  components: {

    // Header:
    siteHeader,

    // svg editor
    svgEditor
  },
  data() {
    return {
      scrollPos: 0,     // Used to detect if we're scrolling up or down. 
      searchbarPos: 0,  // Affects the searchbar's vertical position.

      display_user_options: false, // Indicates whether we're showing the user options menu
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

    // User projects
    user_projects() {
      if (this.$auth.loggedIn) {
        return this.$store.getters['projects/get_user_projects'](this.$auth.user.username);
      }
      return [];
    },

    // Is the svg-editor open?
    svgEditorOpen() {
      return this.$store.getters['svg/svgEditorOpen'];
    },
    

  },
  
  mounted() {
    // Initializing our scroll monitor, to hide and show the top bar
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);

    // For the user options menu:
    this.$store.dispatch('themes/readAllThemes');
    if (this.$auth.loggedIn){
      this.$store.dispatch('projects/read_project', { owner: this.$auth.user.username })
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

    closePopup() {
      this.$store.commit("svg/closeEditor");
      this.display_user_options = false;
    }

  }
}
</script>

<style lang="scss">

@import '@/styles/globals.scss';


////////////////////////////
//   User options menu:   //
////////////////////////////

#user-options {
  position: fixed;
  height: 100%;
  width:  400px;
  max-width: 90vw;
  top: 0px;
  right: 0px;
  z-index: 301;
  color: var(--bg-text);
  background: var(--bg);
  drop-shadow: 0px 0px 10px rgba(0,0,0,1);

  h3 {
    padding-left: 10px;
  }

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
    #user-info {
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
  z-index: 300;
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
