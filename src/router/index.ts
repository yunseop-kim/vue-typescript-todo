// /// <reference path="../../node_modules/@types/webpack-env/index.d.ts" />

import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '../components/Hello.vue'
import auth from './auth'
import App from '../App.vue'
import About from '../components/About.vue'
import Dashboard from '../components/Dashboard.vue'
import Login from '../components/Login.vue'
import List from '../components/List.vue'

Vue.use(Router)

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default new Router({
  mode: 'history',
  // base: __dirname,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    { path: '/about', component: About },
    { path: '/dashboard', component: Dashboard, beforeEnter: requireAuth },
    { path: "/list", component: List, beforeEnter: requireAuth },
    { path: '/login', component: Login },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.signOut()
        next('/')
      }
    }
  ]
})
