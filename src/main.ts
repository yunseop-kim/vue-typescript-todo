import * as Vue from 'vue';
import VueRouter from 'vue-router';

import { HomeComponent } from './components/home';
import { LoginComponent } from './components/login';
import { ListComponent } from './components/list';
import { NavbarComponent } from './components/navbar';

// register the plugin
Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    { path: '/', component: HomeComponent },
    { path: '/list', component: ListComponent },
    { path: '/login', component: LoginComponent },
  ]
});

new Vue({
  el: '#app-main',
  router: router,
  components: {
    'navbar': NavbarComponent
  }
});
