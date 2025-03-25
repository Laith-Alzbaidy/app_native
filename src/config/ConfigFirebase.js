// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANf9CmOY_1mjWxkt_NqkM7rmW2ejE1X50",
  authDomain: "mohanadtheep.firebaseapp.com",
  projectId: "mohanadtheep",
  storageBucket: "mohanadtheep.appspot.com",
  messagingSenderId: "507850807983",
  appId: "1:507850807983:web:052929ff11ccc14fe5125a",
  measurementId: "G-LLSGVEEEW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);