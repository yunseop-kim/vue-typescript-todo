// /// <reference path="../../node_modules/@types/webpack-env/index.d.ts" />

import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '../components/Hello.vue'
import auth from './auth'
import App from '../App.vue'
import About from '../components/About.vue'
import Dashboard from '../components/Dashboard.vue'
import Login from '../components/Login.vue'

Vue.use(Router)

function dynamicPropsFn(route) {
  const now = new Date()
  return {
    name: (now.getFullYear() + parseInt(route.params.years)) + '!'
  }
}

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

    // { path: '/', component: Hello }, // No props, no nothing
    // { path: '/hello/:name', component: Hello, props: true }, // Pass route.params to props
    // { path: '/static', component: Hello, props: { name: 'world' } }, // static values
    // { path: '/dynamic/:years', component: Hello, props: dynamicPropsFn } // custom logic for mapping between route and props
    { path: '/about', component: About },
    { path: '/dashboard', component: Dashboard, beforeEnter: requireAuth },
    { path: '/login', component: Login },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    }
  ]
})
