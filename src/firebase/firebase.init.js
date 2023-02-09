import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqKDvBYMymGmKNJW5yKJjiPOWap8vqW2c",
  authDomain: "simple-authentication-8101a.firebaseapp.com",
  projectId: "simple-authentication-8101a",
  storageBucket: "simple-authentication-8101a.appspot.com",
  messagingSenderId: "328736441473",
  appId: "1:328736441473:web:3d842943c5574a37d7f980"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;