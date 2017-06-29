import Vue from 'vue';
import Component from 'vue-class-component';
import { Logger } from '../../util/log';
import * as firebase from 'firebase';

@Component({
  template: require('./login.html')
})
export class LoginComponent extends Vue {
  protected logger: Logger;

  mounted() {
    if (!this.logger) this.logger = new Logger();
    this.$nextTick(() => this.logger.info('login is ready!'));
  }

  googleAuth() {
    console.log('googleAuth > start');
    firebase.auth().getRedirectResult().then((result) => {
      if (result.credential) {
        // This gives you a Google Access Token.
        let token = result.credential.accessToken;
      }
      let user = result.user;
      location.href = '/';
    });

    // Start a sign in process for an unauthenticated user.
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithRedirect(provider);
  }

  facebookAuth() {
      console.log('facebookAuth > preparing...');
  }

  twitterAuth() {
      console.log('twitterAuth > preparing...');
  }
}
