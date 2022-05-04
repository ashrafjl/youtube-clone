import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBSGvWCJoNEjOz1XyqL7gsMzqwRPvtp3r8",
    authDomain: "ashrafjlyt.firebaseapp.com",
    projectId: "ashrafjlyt",
    storageBucket: "ashrafjlyt.appspot.com",
    messagingSenderId: "1016726979448",
    appId: "1:1016726979448:web:ff194aac5d370319967e8d"
  };
  firebase.initializeApp(firebaseConfig)
  export default firebase.auth()