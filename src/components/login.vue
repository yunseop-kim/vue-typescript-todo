<template>
  <div class="container">
    <div class="omb_login">
      <h3 class="omb_authTitle">Login
      </h3>
      <div class="row omb_row-sm-offset-3 omb_socialButtons">
        <div class="col-xs-4 col-sm-2">
          <a @click="facebookAuth()" class="btn btn-lg btn-block omb_btn-facebook">
            <i class="fa fa-facebook visible-xs"></i>
            <span class="hidden-xs">Facebook</span>
          </a>
        </div>
        <div class="col-xs-4 col-sm-2">
          <a @click="twitterAuth()" class="btn btn-lg btn-block omb_btn-twitter">
            <i class="fa fa-twitter visible-xs"></i>
            <span class="hidden-xs">Twitter</span>
          </a>
        </div>
        <div class="col-xs-4 col-sm-2">
          <a @click="googleAuth()" class="btn btn-lg btn-block omb_btn-google">
            <i class="fa fa-google-plus visible-xs"></i>
            <span class="hidden-xs">Google+</span>
          </a>
        </div>
      </div>
      <!--
        <div class="row omb_row-sm-offset-3">
        <div class="col-xs-12 col-sm-3">
        <label class="checkbox">
        <input type="checkbox" value="remember-me">Remember Me
        </label>
        </div>
        <div class="col-xs-12 col-sm-3">
        <p class="omb_forgotPwd">
        <a href="#">Forgot password?</a>
        </p>
        </div>
        </div>
        -->
    </div>
    <h2>Login</h2>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <form @submit.prevent="login">
      <label>
        <input v-model="email" placeholder="email">
      </label>
      <label>
        <input v-model="pass" placeholder="password" type="password">
      </label> (hint: password1)
      <br>
      <button type="submit">login</button>
      <p v-if="error" class="error">Bad login information</p>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import auth from '../router/auth'
import { Component } from 'vue-property-decorator'
import { firebaseAuth, firebaseDB } from "../firebase";
import * as firebase from "firebase";

@Component
export default class Login extends Vue {
  email: string = 'joe@example.com';
  pass: string = '';
  error: boolean = false;

  login() {
    auth.login(this.email, this.pass, loggedIn => {
      if (!loggedIn) {
        this.error = true
      } else {
        this.$router.replace(this.$route.query.redirect || '/')
      }
    });
  }

  googleAuth(): void {
    console.log("googleAuth > start");
    firebaseAuth.getRedirectResult().then(result => {
      if (result.credential) {
        // This gives you a Google Access Token.
        let token = result.credential.accessToken;
        firebaseDB.ref("Users/" + firebaseAuth.currentUser.uid).update({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        });
      }
      let user = result.user; 
    });

    // Start a sign in process for an unauthenticated user.
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebaseAuth.signInWithRedirect(provider);
    this.$router.push("/");
  }

  facebookAuth(): void {
    alert("preparing...");
  }
 
  twitterAuth(): void {
    alert("preparing...");
  }

}
</script>

<style scoped>
.error {
  color: red
}


/*
    Note: It is best to use a less version of this file ( see http://css2less.cc
    For the media queries use @screen-sm-min instead of 768px.
    For .omb_spanOr use @body-bg instead of white.
*/

@media (min-width: 768px) {
  .omb_row-sm-offset-3 div:first-child[class*="col-"] {
    margin-left: 25%;
  }
}

.omb_login .omb_authTitle {
  text-align: center;
  line-height: 300%;
}

.omb_login .omb_socialButtons a {
  color: white;
  /* In yourUse @body-bg */
  opacity: 0.9;
}

.omb_login .omb_socialButtons a:hover {
  color: white;
  opacity: 1;
}

.omb_login .omb_socialButtons .omb_btn-facebook {
  background: #3b5998;
}

.omb_login .omb_socialButtons .omb_btn-twitter {
  background: #00aced;
}

.omb_login .omb_socialButtons .omb_btn-google {
  background: #c32f10;
}


.omb_login .omb_loginOr {
  position: relative;
  font-size: 1.5em;
  color: #aaa;
  margin-top: 1em;
  margin-bottom: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

.omb_login .omb_loginOr .omb_hrOr {
  background-color: #cdcdcd;
  height: 1px;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}

.omb_login .omb_loginOr .omb_spanOr {
  display: block;
  position: absolute;
  left: 50%;
  top: -0.6em;
  margin-left: -1.5em;
  background-color: white;
  width: 3em;
  text-align: center;
}

.omb_login .omb_loginForm .input-group.i {
  width: 2em;
}

.omb_login .omb_loginForm .help-block {
  color: red;
}


@media (min-width: 768px) {
  .omb_login .omb_forgotPwd {
    text-align: right;
    margin-top: 10px;
  }
}
</style>