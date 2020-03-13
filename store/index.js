// Info about this layout: https://nuxtjs.org/guide/vuex-store/


// Setting up our state variables:
export const state = () => ({
  theme_name: 'Golden Night',
  _id: 'golden-night',

  logo: 'hsl(0,0%,96%)',
  header_bg: 'hsl(248,19%,26%)',

  bg: 'hsl(248,19%,31%)',
  bg_text: 'hsl(0,0%,96%)',
  bg_text2: 'hsl(230,19%,60%)',
  bg2: '#2B2736',

  card: 'hsl(255,16%,17%)',
  card2: 'hsl(255,16%,15%)',
  card_text: 'hsl(0,0%,96%)',
  card_text2: 'hsl(257,7%,63%)',


  link: 'hsl(43,78%,81%)',

  bg2_text: '#F6F6F6',
  bg2_text2: '#A3A2A6',

  bg2_input: 'hsl(248,19%,35%)',
  bg2_input_text: 'hsl(0,0%,91%)',
  bg2_input_text2: 'hsl(230,19%,55%)',

  c1: 'hsl(43,78%,81%)',
  c1_light: '',
  c2: 'hsl(43,78%,81%)',
  c2_light: '',
  c3: 'hsl(43,78%,81%)',
  c3_light: '',

  input: 'hsl(248,19%,40%)',
  input_text: 'hsl(0,0%,96%)',
  input_text2: 'hsl(230,19%,60%)',
  input_h: '#F4DEA7',
  input_h_text: 'black;',

})



// Getters, used to return our state in specific ways.
// Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
export const getters = {

  // We pass this object into :style="" tags to activate dynamic theming!
  // I found it here:
  //   https://stackoverflow.com/questions/46551925/vuejs-v-bindstyle-hover
  themeStyle(state) {
    return {
      '--logo': state.logo,

      '--header-bg': state.header_bg,

      '--bg': state.bg,
      '--bg2': state.bg2,
      '--bg-text': state.bg_text,
      '--bg-text2': state.bg_text2,

      '--card': state.card,
      '--card2': state.card2,
      '--card-text': state.card_text,
      '--card-text2': state.card_text2,
      

      '--link': state.link,

      
      '--bg2-text': state.bg2_text,
      '--bg2-text2': state.bg2_text2,

      '--bg2-input': state.bg2_input,
      '--bg2-input-text': state.bg2_input_text,
      '--bg2-input-text2': state.bg2_input_text2,

      '--c1': state.c1,
      '--c1_light': state.c1_light,
      '--c2': state.c2,
      '--c2_light': state.c2_light,
      '--c3': state.c3,
      '--c3_light': state.c3_light,

      '--input': state.input,
      '--input-text': state.input_text,
      '--input-text2': state.input_text2,
      '--input-h': state.input_h,
      '--input-h-text': state.input_h_text,

    }
  }
}





// Actions call mutations. (Do async stuff here.)
// Call actions in vue like this:
//  this.$store.dispatch('actionName', {playloadData: data });
export const actions = {
  
}





// Mutations, which change our data. 
// Calling mutations from Vue is weird, you need to do this:
//    this.$store.commit("mutationName", { payloadData: data })
export const mutations = {

  setThemeColor(state, payload) {
    state.logo = payload.logo;

    state.header_bg = payload.header_bg,

    state.bg = payload.bg;
    state.bg_text = payload.bg_text;
    state.bg_text2 = payload.bg_text2;
    state.bg2 = payload.bg2;

    state.card = payload.card;
    state.card2 = payload.card2;
    state.card_text = payload.card_text
    state.card_text2 = payload.card_text2

    state.link = payload.link;

    state.bg2_text = payload.bg2_text;
    state.bg2_text2 = payload.bg2_text2;

    state.bg2_input = payload.bg2_input,
    state.bg2_input_text = payload.bg2_input_text,
    state.bg2_input_text2 = payload.bg2_input_text2,

    state.c1 = payload.c1;
    state.c1_light = payload.c1_light;
    state.c2 = payload.c2;
    state.c2_light = payload.c2_light;
    state.c3 = payload.c3;
    state.c3_light = payload.c3_light;

    state.input = payload.input;
    state.input_text = payload.input_text;
    state.input_text_2 = payload.input_text2;
    state.input_h = payload.input_h;
    state.input_h_text = payload.input_h_text;
  },


}