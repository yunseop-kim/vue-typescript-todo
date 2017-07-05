import Vue from "vue";
import Router from "vue-router";
import HomeComponent from "@/components/home.vue";
import LoginComponent from "@/components/login.vue";
import ListComponent from "@/components/list.vue";
import { firebaseAuth } from "../firebase";
import * as firebase from "firebase";
Vue.use(Router);
var router = new Router({
    routes: [
        { path: "/", component: HomeComponent },
        { path: "/list", component: ListComponent, beforeEnter: requireAuth },
        { path: "/login", component: LoginComponent },
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
function requireAuth(to, from, next) {
    if (!firebase.auth().currentUser) {
        router.push({
            path: "/login"
        });
    }
    else {
    }
}
export default router;
