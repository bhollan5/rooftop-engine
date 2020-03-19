// Info about this layout: https://nuxtjs.org/guide/vuex-store/

import Vue from 'vue';

// Setting up our state variables:
export const state = () => ({
  theme_name: 'Golden Night',
  _id: 'golden-night',
  thumbnail: '', 

  colors: {
    logo: [0,0,96],
    header_bg: [248,19,26],

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
    input_h: '#F4DEA7',
    input_h_text: 'black;',
  },

})



// Getters, used to return our state in specific ways.
// Use:
//   this.$store.getters.getterName
//   this.$store.getters.getterWithParamName(paramData)
export const getters = {

  // We pass this object into :style="" tags to activate dynamic theming!
  // I found it here:
  //   https://stackoverflow.com/questions/46551925/vuejs-v-bindstyle-hover
  themeCSSObj(state) {
    // Because our colors are stored as hsl arrays, we need to iterate thru them
    //   and change them to 'hsl(x,x%,x%)' format
    let styleObj = {};
    let fields = [
      'logo',
      'header_bg',
      'bg', 'bg2', 'bg_text', 'bg_text2',
      'card', 'card2', 'card_text', 'card_text2',
      'link',
      'bg2_input', 'bg2_input_text', 'bg2_input_text2',
      'c1', 'c1_light', 'c2', 'c2_light', 'c3', 'c3_light',
      'input', 'input_text', 'input_text2',
      'input_h', 'input_h_text',
    ]
    for (let i in fields) {
      // Turning 'bg_text' into '--bg-text':
      let cssVarName = '--' + fields[i].replace(/_/g, "-");
      // Assigning that css var to our hsl string:
      styleObj[cssVarName] = 'hsl(' + state.colors[fields[i]][0] + ','
                                           + state.colors[fields[i]][1] + '%,'
                                           + state.colors[fields[i]][2] + '%)';
    }
    return styleObj;
  },

  // Returning the colors as arrays
  themeScriptObj(state) {
    return state;
  },

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

    let fields = [
      'logo',
      'header_bg',
      'bg', 'bg2', 'bg_text', 'bg_text2',
      'card', 'card2', 'card_text', 'card_text2',
      'link',
      'bg2_input', 'bg2_input_text', 'bg2_input_text2',
      'c1', 'c1_light', 'c2', 'c2_light', 'c3', 'c3_light',
      'input', 'input_text', 'input_text2',
      'input_h', 'input_h_text',
    ]
    for (let i in fields) {
      if (payload[fields[i]]){
        Vue.set(state.colors[fields[i]], 0, payload[fields[i]][0])
        Vue.set(state.colors[fields[i]], 1, payload[fields[i]][1])
        Vue.set(state.colors[fields[i]], 2, payload[fields[i]][2])
      }
    }
  },


}