import * as Vue from 'vue';
import VueRouter from 'vue-router';

import { HomeComponent } from './components/home';
import { LoginComponent } from './components/login';
import { ListComponent } from './components/list';
import { NavbarComponent } from './components/navbar';
import {firebaseAuth} from './firebase/config';
// register the plugin
Vue.use(VueRouter);

function requireAuth (to, from, next) {
  if (!firebaseAuth.currentUser) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

let router = new VueRouter({
  routes: [
    { path: '/', component: HomeComponent },
    { path: '/list', component: ListComponent, beforeEnter: requireAuth },
    { path: '/login', component: LoginComponent },
    { path: '/logout',
      beforeEnter (to, from, next) {
        firebaseAuth.signOut().then(() => {
            console.log('logout');
        }).catch((error) => {
            console.error('error: ', error);
        });
        next('/');
      }
    },
  ]
});

new Vue({
  el: '#app-main',
  router: router,
  components: {
    'navbar': NavbarComponent
  }
});
