// Info about modules: https://nuxtjs.org/guide/vuex-store/#modules-mode

//   Contents:
// ==========================
//   - Imports
//   - State 
//   - Getters
//   - Actions   (called with "$store.dispatch()")
//   - Mutations (used in the store with "commit()")

// For database calls:
import axios from 'axios';

import Vue from 'vue';



// Setting up our state variables:
export const state = () => ({

  color_fields: [
    'logo',
    'bg', 'bg2', 'bg_text', 'bg_text2',
    'card', 'card2', 'card_text', 'card_text2',
    'link',
    'bg2_input', 'bg2_input_text', 'bg2_input_text2',
    'c1', 'c1_light', 'c2', 'c2_light', 'c3', 'c3_light',
    'input', 'input_text', 'input_text2',
    'action', 'confirm', 'danger',
    'action_text', 'confirm_text', 'danger_text',
  ],

  // When this is true, everything is calculated from these fields:
  // Backgrounds:   bg, card
  // Texts:         bg_text, card_text
  // Secondary:     bg_text2, card_text2
  // Highlights:    action, confirm, danger
  // Illustration:  c1, c2, c3, c4, c5
  simple_colors: true,

  currentTheme: {
    theme_name: 'Golden Night',
    _id: 'golden-night',
    thumbnail: '', 
  
    colors: {
      logo: [0,0,96],
  
      bg: [248,19,31],
      bg2: [248,19,26],
      bg_text: [0,0,96],
      bg_text2: [230,19,60],
      
  
      card: [255,14,19],
      card2: [255,16,15],
      card_text: [0,0,96],
      card_text2: [257,7,63],
  
  
      link: [43,78,81],
  
  
      bg2_input: [248,19,35],
      bg2_input_text: [0,0,91],
      bg2_input_text2: [230,19,55],
  
      c1: [43,78,76],
      c1_light: [43,78,86],
      c2: [43,78,81],
      c2_light: [43,78,86],
      c3: [43,78,81],
      c3_light: [43,78,86],
  
      input: [248,19,40],
      input_text: [0,0,96],
      input_text2: [230,19,60],
      
      action: [41,56,76],
      action_text: [0,0,0],
      confirm: [111, 78, 76],
      confirm_text: [0,0,0],
      danger: [4, 78, 76],
      danger_text: [0,0,0],
    },
  },

  // Our array of theme objects:
  themes: [],
  
})



//
// Getters, used to return our state in specific ways.
//      Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
//

export const getters = {

  // We pass this object into :style="" tags to activate dynamic theming!
  // I found it here:
  //   https://stackoverflow.com/questions/46551925/vuejs-v-bindstyle-hover
  themeCSSObj(state) {
    // Because our colors are stored as hsl arrays, we need to iterate thru them
    //   and change them to 'hsl(x,x%,x%)' format
    let styleObj = {};

    // Iterating thru an array of all color fields. 
    // We grab a fresh copy just for the smaller var name.
    let fields = JSON.parse(JSON.stringify(state.color_fields));
    for (let i in fields) {

      if (!state.currentTheme.colors[fields[i]]) {
        console.error("This theme is missing a color: " + fields[i]);
        break;
      }

      // Turning 'bg_text' into '--bg-text':
      let css_var_name = '--' + fields[i].replace(/_/g, "-");
      // Assigning that css var to our hsl string:
      styleObj[css_var_name] = 'hsl('
                                + state.currentTheme.colors[fields[i]][0] + ','
                                + state.currentTheme.colors[fields[i]][1] + '%,'
                                + state.currentTheme.colors[fields[i]][2] + '%)';

      // Giving them each a '-light' and '-dark' option:
      styleObj[css_var_name + '-light'] = 'hsl(' 
                            + state.currentTheme.colors[fields[i]][0] + ','
                            + state.currentTheme.colors[fields[i]][1] + '%,'
                            + (state.currentTheme.colors[fields[i]][2] + 5) + '%)';

      // Giving them each a '-light' and '-dark' option:
      styleObj[css_var_name + '-dark'] = 'hsl(' 
                            + state.currentTheme.colors[fields[i]][0] + ','
                            + state.currentTheme.colors[fields[i]][1] + '%,'
                            + (state.currentTheme.colors[fields[i]][2] - 5) + '%)';
    }
    return styleObj;
  },

  // Object of all colors as arrays
  theme_object(state) {
    return state.currentTheme;
  },

  // Just the theme id
  themeId(state) {
    return state.currentTheme._id;
  },

  // Takes a variable id, returns an array
  color_styling: (state) => (color_key) => {
    return state.currentTheme.colors[color_key];
  },


  // This notation is the same as 
  //  getterName() { return function (articleId) { ... } }
  themeById: (state) => (themeId) => {
    // This filter format is how we can query an array of objs. 
    return state.themes.filter( function(theme) {
      return (theme._id == themeId);
    });

  },

  // Gets all loaded articles (probably just for debugging.)
  allThemes(state) {
    return state.themes;
  },

}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {

  // Creating a new theme:
  createTheme({commit}, payload) {
    this.$console.log("themes", " 🗣 Calling the API to create a new theme.")

    // Creating a new article:

    axios.post("/api/create-theme", payload)
    .then((response) => {
      this.$console.log("themes", " 💾 Successfully created a theme titled " + payload.theme_name + "!");
      this.$console.log("themes", " > The themes's id is: " + response.data._id);

    }, (error) => {
      console.warn(error);
    });

  },

  // Getting all themes:
  readAllThemes({commit}) {
    this.$console.log("themes", " 🗣 Calling the API to load all themes.")

    return axios.get("/api/read-themes")
      .then((response) => {
        this.$console.log("themes", " 📦 Loaded " + response.data.length + " themes.");
        commit('setThemes', response.data);
      }, (error) => {
        console.warn(error);
      });
  },

  // Getting a set of articles, by query.
  readArticle({commit}, payload) {

    // Getting the article from the database.
    axios.get("/api/read-article", payload.query)
      .then((response) => {
        this.$console.log("themes", " 📦 Loaded " + response.data.length + " articles based on this query:" + payload.query);
        commit('setArticles', response.data);
      }, (error) => {
        console.warn(error);
      });

  },

  // Updating an article by id.
  update_article({commit}, payload) {
    this.$console.log("themes", " 🗣 Calling the API to update article %c" +  payload._id, "color:magenta;")

    // Getting the article from the database.
    axios.post("/api/update-article", {
        _id: payload._id,
        update: payload.update
      }).then((response) => {
        this.$console.log("themes", " 🖌 Updated the article %c" +  payload._id, "color:magenta;");
      }).catch ((error) => {
        console.warn(error);
      });

  },

  // Deletes an article by id.
  deleteArticle({commit}, payload) {
    this.$console.log("themes", " 🗣 Calling the api to delete article %c" +  payload._id, "color:magenta;")

    // Getting the article from the database.
    axios.delete("/api/delete-article/" + payload._id).then(() => {
      this.$console.log("themes", " ⛔️ Deleted the article with the id of " + payload._id);
      commit('deleteArticle', { _id: payload._id});
    }, (error) => {
      console.warn(error);
    });
  },

  // Uploading an image for an article: 
  uploadImage({commit}, payload) {
    this.$console.log("themes", " 🗣 Calling the api to upload the image %c" +  payload.fileName, "color:magenta;")
    this.$console.log("themes", payload);

    // You should have a server side REST API 
    axios.post('/api/upload-article-image', {
      fileName: payload.fileName,
      fileValue: payload.fileValue
    }).then(function () {
        this.$console.log("themes", 'Success uploading file!');
      })
      .catch(function () {
        this.$console.log("themes", 'Failed to upload item!');
      });
  }
}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {

  // Setting the current theme
  setThemeColor(state, payload) {
    state.currentTheme._id = payload._id;
    state.currentTheme.theme_name = payload.theme_name;

    // Iterating thru an array of all color fields. 
    // We grab a fresh copy just for the smaller var name.
    let fields = JSON.parse(JSON.stringify(state.color_fields));
    for (let i in fields) {
      if (payload.colors[fields[i]]){
        Vue.set(state.currentTheme.colors[fields[i]], 0, payload.colors[fields[i]][0])
        Vue.set(state.currentTheme.colors[fields[i]], 1, payload.colors[fields[i]][1])
        Vue.set(state.currentTheme.colors[fields[i]], 2, payload.colors[fields[i]][2])
      } else {
        console.warn(" ⚠️ Color scheme missing a color! " + fields[i]);
      }
    }
  },

  // DB stuff:
  
  // Setting article array:
  setThemes(state, payload) {
    state.themes = payload;
    this.$console.log("themes", " ✨ Themes updated in the Vuex store:", payload);
  },
  
  // Deleting an article by id: 
  deleteTheme(state, payload) {
    let updatedArticles = state.articles.filter((article) => { 
      // Keeping articles when this is true:
      return article._id != payload._id;
    });
    let difference = state.articles.length - updatedArticles.length;
    state.articles = updatedArticles;
    this.$console.log("themes", " ✨ " + difference + " article was deleted in the Vuex store.")
  },


}