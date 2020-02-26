// Info about this layout: https://nuxtjs.org/guide/vuex-store/


export const state = () => ({
  bg: 'hsl(248,19%,31%)',
  bg_light: 'hsl(248,19%,40%)',
  bg_lighter: 'hsl(230,19%,60%)',
  fg: 'hsl(0,0%,96%)',
})

export const mutations = {
  setThemeColor(state, payload) {
    state.bg = payload.bg;
    state.bg_light = payload.bg_light;
    state.bg_lighter = payload.bg_lighter;
  }
}