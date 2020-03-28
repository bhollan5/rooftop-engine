import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3f6e0cb2 = () => interopDefault(import('../pages/media/index.vue' /* webpackChunkName: "pages/media/index" */))
const _628b860e = () => interopDefault(import('../pages/non-fic/index.vue' /* webpackChunkName: "pages/non-fic/index" */))
const _46104780 = () => interopDefault(import('../pages/sign-in.vue' /* webpackChunkName: "pages/sign-in" */))
const _5aa69df6 = () => interopDefault(import('../pages/sign-up.vue' /* webpackChunkName: "pages/sign-up" */))
const _0da8f352 = () => interopDefault(import('../pages/theme-picker.vue' /* webpackChunkName: "pages/theme-picker" */))
const _53b8befa = () => interopDefault(import('../pages/non-fic/_articleId/edit.vue' /* webpackChunkName: "pages/non-fic/_articleId/edit" */))
const _8424b0c4 = () => interopDefault(import('../pages/non-fic/_articleId/view.vue' /* webpackChunkName: "pages/non-fic/_articleId/view" */))
const _c749b146 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/media",
    component: _3f6e0cb2,
    name: "media"
  }, {
    path: "/non-fic",
    component: _628b860e,
    name: "non-fic"
  }, {
    path: "/sign-in",
    component: _46104780,
    name: "sign-in"
  }, {
    path: "/sign-up",
    component: _5aa69df6,
    name: "sign-up"
  }, {
    path: "/theme-picker",
    component: _0da8f352,
    name: "theme-picker"
  }, {
    path: "/non-fic/:articleId?/edit",
    component: _53b8befa,
    name: "non-fic-articleId-edit"
  }, {
    path: "/non-fic/:articleId?/view",
    component: _8424b0c4,
    name: "non-fic-articleId-view"
  }, {
    path: "/",
    component: _c749b146,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
