import firebase from "firebase";
firebase.initializeApp({
    apiKey: "AIzaSyB55zR9wP-fbfUZLiR_vhpDgDIc9hJ9qAU",
    authDomain: "uploadimage-191d8.firebaseapp.com",
    projectId: "uploadimage-191d8",
    storageBucket: "uploadimage-191d8.appspot.com",
    messagingSenderId: "470022801021",
    appId: "1:470022801021:web:b8f0ebc483339fb32dd314",
    measurementId: "G-3FCTX4KBSE"
})

const storage = firebase.storage();

export {  storage };