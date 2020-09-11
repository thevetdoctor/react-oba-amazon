import firebase from "firebase";

const firebaseConfig = {
  // apiKey: "AIzaSyCcPSKlYtpdzBoAC8soeSmIARMzVKzrf5I",
  // authDomain: "challenge-4b2b2.firebaseapp.com",
  // databaseURL: "https://challenge-4b2b2.firebaseio.com",
  // projectId: "challenge-4b2b2",
  // storageBucket: "challenge-4b2b2.appspot.com",
  // messagingSenderId: "962418448875",
  // appId: "1:962418448875:web:f6cce5eeaf819481f661ae",

  apiKey: "AIzaSyDTBSznQ-O29O9EuuXYkShGJHfj7ZoXpgc",
  authDomain: "oba-dce9d.firebaseapp.com",
  databaseURL: "https://oba-dce9d.firebaseio.com",
  projectId: "oba-dce9d",
  storageBucket: "oba-dce9d.appspot.com",
  messagingSenderId: "865349714041",
  appId: "1:865349714041:web:24ab5921d592b7897694a8",
  measurementId: "G-1DG17HHVL2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };