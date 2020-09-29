import firebase from "firebase";
import dotenv from "dotenv";

dotenv.config();

const {REACT_APP_API_KEY, 
      REACT_APP_AUTH_DOMAIN, 
      REACT_APP_DATABASE_URL, 
      REACT_APP_PROJECT_ID, 
      REACT_APP_STORAGE_BUCKET, REACT_APP_MESSAGING_SENDER_ID, 
      REACT_APP_APP_ID, 
      REACT_APP_MEASUREMENT_ID} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };