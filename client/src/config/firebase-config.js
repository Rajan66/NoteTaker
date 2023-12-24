import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBaD5Yji_t6O6mrQu6QIbjDTniyBlFf8OE",
    authDomain: "notetaker-b5907.firebaseapp.com",
    projectId: "notetaker-b5907",
    storageBucket: "notetaker-b5907.appspot.com",
    messagingSenderId: "757597425161",
    appId: "1:757597425161:web:4fd0ddf6dbb0d73a9072d8",
    measurementId: "G-YXMF8G5L98"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
