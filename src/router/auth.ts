/* globals localStorage */
import { firebaseAuth } from "../firebase";

let currentUser;

export default {
  getUser(): void {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        currentUser = user;
        this.onChange(true);
      } else {
        // No user is signed in.
      }
    });
  },

  signOut(): void {
    firebaseAuth.signOut().then(
      () => {
        console.log("logout success");
        currentUser = null;
        this.onChange(false);
      },
      error => {
        console.log("logout failed!:", error);
      }
    );
  },

  loggedIn(): boolean {
    this.getUser();
    return !!currentUser;
  },

  onChange(result: boolean) {}
};