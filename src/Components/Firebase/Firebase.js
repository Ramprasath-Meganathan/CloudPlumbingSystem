import app from 'firebase/app';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBqppwDVkKl6fYbezmINLgY92jg59mKZjE",
    authDomain: "fir-authentication-41ddd.firebaseapp.com",
    databaseURL: "https://fir-authentication-41ddd.firebaseio.com",
    projectId: "fir-authentication-41ddd",
    storageBucket: "fir-authentication-41ddd.appspot.com",
    messagingSenderId: "491810733004",
    appId: "1:491810733004:web:a465ea2f033a309f77bb69",
    measurementId: "G-FGJJ9BP71W"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = ()=> this.auth.signout();

    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase