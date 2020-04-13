<template>
<div id="user-options" >
    
  <div id="user-options-header">
    <button id="user-options-close" class="bg2-button" @click="$parent.display_user_options = false">
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

    // For the user options menu:
    this.$store.dispatch('themes/readAllThemes');
    if (this.$auth.loggedIn){
      this.$store.dispatch('projects/read_projects', { owner: this.$auth.user.username })
    }
    
  },
  computed: {
    theme_id() {
      return this.$store.getters['themes/themeId'];
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

  methods: {
    applyTheme(theme) {
      this.$store.commit("themes/setThemeColor", theme);
    },
  }
}
</script>