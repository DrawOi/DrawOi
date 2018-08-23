import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCz-VOwlEVTuzEcXBwAmWBIXbIdUvKnFa4",
    authDomain: "pictoi-21.firebaseapp.com",
    databaseURL: "https://pictoi-21.firebaseio.com",
    projectId: "pictoi-21",
    storageBucket: "pictoi-21.appspot.com",
    messagingSenderId: "594188937994"
  };

export const app = firebase.initializeApp(config);
export const database = firebase.database();

