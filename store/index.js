// Info about this layout: https://nuxtjs.org/guide/vuex-store/


export const state = () => ({
  bg: 'hsl(248,19%,31%)',
  bg_light: 'hsl(248,19%,40%)',
  bg_lighter: 'hsl(230,19%,60%)'
})

export const mutations = {
  setThemeColor(state, color) {
    state.themeColor = color;
  }
}