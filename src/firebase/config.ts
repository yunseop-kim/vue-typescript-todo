import * as firebase from 'firebase';

const config: Object = {
  apiKey: 'AIzaSyB6lkoQBimcudf6QcH6N3C-svlYepvPfLk',
  authDomain: 'simplecrud-f03a0.firebaseapp.com',
  databaseURL: 'https://simplecrud-f03a0.firebaseio.com',
  projectId: 'simplecrud-f03a0',
  storageBucket: 'simplecrud-f03a0.appspot.com',
  messagingSenderId: '753471742341'
};

const firebaseApp: firebase.app.App = firebase.initializeApp(config);
const firebaseDB: firebase.database.Database = firebaseApp.database();
const firebaseAuth: firebase.auth.Auth = firebaseApp.auth();

export {
  firebaseApp,
  firebaseDB,
  firebaseAuth
}