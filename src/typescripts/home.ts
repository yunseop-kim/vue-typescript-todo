import Vue from "vue";
import Component from "vue-class-component";
import { firebaseApp } from "../firebase";
import * as firebase from "firebase";
@Component({
  // template: require("./home.pug")
  name: "vue-home"
})
export class HomeComponent extends Vue {
  username: string = null;

  beforeMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log(`username: ${user.displayName}`);
        this.username = user.displayName;
      } else {
        // No user is signed in.
        console.log("hello");
      }
    });
  }
}
