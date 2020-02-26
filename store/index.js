// Info about this layout: https://nuxtjs.org/guide/vuex-store/

// Setting up our state variables:
export const state = () => ({
  logo: 'pink',

  bg: 'hsl(248,19%,31%)',
  bg_text: 'hsl(0,0%,96%)',
  bg_text2: 'hsl(230,19%,60%)',

  input: 'hsl(248,19%,40%)',
  input_text: 'hsl(0,0%,96%)',
  input_text2: 'hsl(230,19%,60%)',
  input_h: '#F4DEA7',


  
})

// Getters, used to return our state in specific ways
export const getters = {

  // We pass this object into :style="" tags to activate dynamic theming!
  // I found it here:
  //   https://stackoverflow.com/questions/46551925/vuejs-v-bindstyle-hover
  themeStyle(state) {
    return {
      'logo': state.logo,

      '--bg': state.bg,
      '--bg-text': state.bg_text,
      '--bg-text2': state.bg_text2,

      '--input': state.input,
      '--input-text': state.input_text,
      '--input-text2': state.input_text2,
      '--input-highlight': state.input_h,
    }
  }
}

// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {
  setThemeColor(state, payload) {
    state.logo = payload.logo;

    state.bg = payload.bg;
    state.bg_text = payload.bg_text;
    state.bg_text2 = payload.bg_text2;

    state.input = payload.input;
    state.input_text = payload.input_text;
    state.input_text_2 = payload.input_text2;
    state.input_h = payload.input_h;
  }
}