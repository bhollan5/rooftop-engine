<template>
  <div>
    <!-- Header: -->
    <div class="header"
        :style="{
          background: $store.state.bg,
          top: searchbarPos + 'px'}">
      <!-- Logo: -->
      <img src="~/assets/logo/logo_white.png" id="header-logo">

      <!-- Searchbar and searchbar icon: -->
      <search id="header-search-icon"> </search>
      <input type="text" id="header-searchbar" placeholder="Search Media"
        :style="{
          background: $store.state.bg_light,
          color: $store.state.bg_lighter,
          }">
      
      <!-- Log In button -->
      <div id="login-button">
        <person id="header-person-icon"></person>
        <span>Log In</span>
      </div>

    </div>

    <!-- This is where other pages get inserted: -->
    <nuxt />

    <!-- Footer: -->
    <div id="footer" :style="{
      background: $store.state.bg}">
      <div class="footer-option">
        
      </div>
    </div>
  </div>
</template>

<script>
// Importing components, which we use as icons:
//   (We import icons this way so we can modify them with CSS)
import search from '~/components/icons/search.vue';
import person from '~/components/icons/person.vue';

// let root = document.documentElement;

export default {
  components: {
    search,
    person
  },
  data() {
    return {
      scrollPos: 0,     // Used to detect if we're scrolling up or down. 
      searchbarPos: 0,  // Affects the searchbar's vertical position.
    }
  },
  
  mounted() {
    // Initializing our scroll monitor, to hide and show the top bar
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
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
          this.searchbarPos -= 2;
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
  // These CSS variables will be modified in the Store folder for dynamic theming.
  --bg-light: hsl(248,19%,40%);
  --bg-lighter: hsl(230,19%,60%);

  --box-shading: 0px 0px 3px rgba(0,0,0,.7);
  --bp: 800px;
}

// Header:
.header {
  height: 50px;
  width: 100%;
  display: flex;
  position: fixed;
  box-shadow: var(--box-shading);

  // Desktop header:
  @media only screen and (min-width: var(--bp)){
    height: 200px;
  }

  // Logo:
  #header-logo {
    height: 30px;
    margin-top: 10px;
    margin-left: 10px;
  }

  // Searchbar:
  #header-search-icon {
    position: absolute;
    height: 15px;
    width: 15px;
    left: 100px;
    top: 18px;
    fill: var(--bg-lighter);
  }
  #header-searchbar {
    background: var(--bg-light);
    color: var(--bg-lighter);
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

  // Header login button:
  #login-button {
    background: var(--bg-light);
    height: 30px;
    min-width: 60px;
    margin: 10px 10px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    #header-person-icon {
      fill: var(--bg-lighter);
      height: 15px;
      width: 15px;
    }
    span {
      color: var(--bg-lighter);
      margin-left: 5px;
    }
  }
  
}

// Footer: 
#footer {
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0px;
  box-shadow: var(--box-shading);
  // Desktop footer:
  @media only screen and (min-width: var(--bp)){
    display: none;
  }
}
</style>
