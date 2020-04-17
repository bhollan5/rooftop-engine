<template>
<div :style="$theme.theme_css_obj(theme_object)">
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

  <transition name="right-popup">
    <user-menu v-if="display_user_options"></user-menu>
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
  <div id="footer" v-if="0">
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
import userMenu from '~/components/user_menu/user_menu.vue';

// Popup svg editor:
import svgEditor from '~/components/inputs/svg-editor.vue';

export default {
  components: {

    // Header:
    siteHeader,

    // User menu:
    userMenu,

    // svg editor
    svgEditor
  },
  data() {
    return {

      display_user_options: false, // Indicates whether we're showing the user options menu
    }
  },
  computed: {

    // Grabbing our dynamic theme variables from the store:
    theme_object() {
      return this.$store.getters['themes/theme_object'];
    },

    // Is the svg-editor open?
    svgEditorOpen() {
      return false //todo: delete this if we really don't need it.
      // return this.$store.getters['svg/svgEditorOpen'];
    },
    
  },
  
  mounted() {
    console.log("got themes")
    if (this.$auth.loggedIn) {
      console.log("Hi?")

      this.$store.dispatch('themes/read_themes', { _id: this.$auth.user.current_theme }).then(() => {
        // Getting the data for the user's theme:
        let user_theme = this.$store.getters['themes/theme_query']('_id', this.$auth.user.current_theme)[0];

        this.$store.commit("themes/setThemeColor", user_theme);
      })
      
    }
  },

  watch: {
    // Closing the user menu if you navigate to a new page
    '$route.fullPath': function (val) {
      this.closePopup();
    }
  },
  methods: {

    closePopup() {
      this.$store.commit("svg/closeEditor");
      this.display_user_options = false;
    }

  }
}
</script>

<style lang="scss">

@import '@/styles/globals.scss';

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
  font-family: sans-serif, monospace;

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
