import Vue from "vue";
import Router from "vue-router";
import HomeComponent from "@/components/home.vue";
import LoginComponent from "../components/login.vue";
import ListComponent from "../components/list.vue";
import { firebaseAuth } from "../firebase";
import * as firebase from "firebase";
Vue.use(Router);
function requireAuth(to, from, next) {
    if (!firebase.auth().currentUser) {
        next({
            path: "/login",
            query: { redirect: to.fullPath }
        });
    }
    else {
        next();
    }
}
export default new Router({
    routes: [
        { path: "/", component: HomeComponent },
        { path: "/login", component: LoginComponent },
        { path: "/list", component: ListComponent, beforeEnter: requireAuth },
        {
            path: "/logout",
            beforeEnter: function (to, from, next) {
                firebaseAuth
                    .signOut()
                    .then(function () {
                    console.log("logout");
                })
                    .catch(function (error) {
                    console.error("error: ", error);
                });
                next("/");
            }
        }
    ]
});
