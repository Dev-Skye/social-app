// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiKyiIEMGzSPdqGyyYvFR_Jk23S0-P2Vs",
    authDomain: "my-socialapp-52621.firebaseapp.com",
    projectId: "my-socialapp-52621",
    storageBucket: "my-socialapp-52621.appspot.com",
    messagingSenderId: "384752129916",
    appId: "1:384752129916:web:403455ad05d0a9ac6636f9"
  };

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth  = firebase.auth()
export {auth};
