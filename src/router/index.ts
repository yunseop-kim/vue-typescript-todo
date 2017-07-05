import Vue from "vue";
import Router from "vue-router";

import HomeComponent from "@/components/home.vue";
import LoginComponent from "@/components/login.vue";
import ListComponent from "@/components/list.vue";
import { firebaseAuth } from "../firebase";
import * as firebase from "firebase";

Vue.use(Router);

function requireAuth(to, from, next) {
  if (!firebase.auth().currentUser) {
    next({
      path: "/login"
    });
  } else {
  }
}

const router = new Router({
  routes: [
    { path: "/", component: HomeComponent },
    { path: "/list", component: ListComponent, beforeEnter: requireAuth },
    { path: "/login", component: LoginComponent },
    {
      path: "/logout",
      beforeEnter(to, from, next) {
        firebaseAuth
          .signOut()
          .then(() => {
            console.log("logout");
          })
          .catch(error => {
            console.error("error: ", error);
          });
        next("/");
      }
    }
  ]
});

export default router;