import Vue from "vue";
import Component from "vue-class-component";
import { firebaseAuth, firebaseDB } from "../firebase";
import * as firebase from "firebase";
@Component({
  template: require("../pugs/login.pug")
})
export default class LoginComponent extends Vue {
  mounted() {
    this.$nextTick(() => console.log("login is ready!"));
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