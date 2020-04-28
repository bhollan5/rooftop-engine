<template>
<div id="user-options" >
    
  <div id="user-options-header">
    <button id="user-options-close" class="bg2-button" @click="$parent.display_user_options = false">
      X
    </button>

    <!-- User info - pfp, display name, username -->
    <router-link tag="div" 
      :to="'/view/user/' + $auth.user.id"
      id="user-info"
      v-if="$auth.loggedIn"
    >

      <div class="user-info-text">
        <div>{{$auth.user.display_name}}</div>
        <div class="secondary">@{{$auth.user.id}}</div>
      </div>
      <div class="user-icon">
        <img src="@/assets/misc/frog-pic.svg">
      </div>
    </router-link>
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
    :to="'/project/' + project._id">
      <div>{{project.title}}</div>
      <div class="byline">by Rooftop Media</div>
    </router-link>

  </div>
  <router-link tag="button" 
    v-if="$auth.loggedIn"
    to="/new-project" 
    class="action" 
    style="margin-left: 15px;"
  >
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
    <router-link to="/debug" tag="button">Debug</router-link>

  </div>

</div>
</template>

<script>
export default {

  mounted() {
    this.$store.dispatch('themes/readAllThemes').then(() => {
      
    })
    if (this.$auth.loggedIn){
      this.$store.dispatch('db/projects/read_projects', { owner: this.$auth.user.username })
    }
    
  },
  computed: {
    theme_id() {
      return this.$store.getters['themes/theme_id'];
    },

    // Loading all theme options, for the user options menu
    theme_options() {
      return this.$store.getters['themes/allThemes'];
    },

    // User projects
    user_projects() {
      if (this.$auth.loggedIn) {
        return this.$store.getters['db/projects/get_user_projects'](this.$auth.user.username);
      }
      return [];
    },
  },

  methods: {
    applyTheme(theme) {
      this.$store.commit("themes/setThemeColor", theme);
      // If we're logged in, we need to update the user's current theme in the DB, too!
      if (this.$auth.loggedIn) {
        this.$store.dispatch('db/users/update_user', {
          _id: this.$auth.user._id,
          update: {
            current_theme: this.theme_id
          }
        })
      }
    },
  }
}
</script>

<style lang="scss">

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
      cursor: pointer;
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
</style>