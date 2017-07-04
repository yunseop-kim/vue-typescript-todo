import * as firebase from 'firebase';
var config = {
    apiKey: 'AIzaSyB6lkoQBimcudf6QcH6N3C-svlYepvPfLk',
    authDomain: 'simplecrud-f03a0.firebaseapp.com',
    databaseURL: 'https://simplecrud-f03a0.firebaseio.com',
    projectId: 'simplecrud-f03a0',
    storageBucket: 'simplecrud-f03a0.appspot.com',
    messagingSenderId: '753471742341'
};
var firebaseApp = firebase.initializeApp(config);
var firebaseDB = firebaseApp.database();
var firebaseAuth = firebaseApp.auth();
export { firebaseApp, firebaseDB, firebaseAuth };
