
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  {getFirestore} from 'firebase/firestore'
import { getAuth, GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3ebBHmXv8PVS6hY-jG8iYj8uuyzJLQTo",
  authDomain: "ticket-4717a.firebaseapp.com",
  projectId: "ticket-4717a",
  storageBucket: "ticket-4717a.firebasestorage.app",
  messagingSenderId: "818963792115",
  appId: "1:818963792115:web:f738a3e8527b6c11133786",
  measurementId: "G-LW2XPQQ834"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
const auth = getAuth(app);

const faceBookAuthjProvider = new FacebookAuthProvider();
const googleAuthProvider = new GoogleAuthProvider();
//const analytics = getAnalytics(app);
export {db,auth,googleAuthProvider,faceBookAuthjProvider}
