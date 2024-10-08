// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration from environment variables
const firebaseConfig = {

  apiKey: "AIzaSyD5fIzjRBjN7geqUOgTGWmmeNU28iAHn4I",

  authDomain: "flashcardsai-b5147.firebaseapp.com",

  projectId: "flashcardsai-b5147",

  storageBucket: "flashcardsai-b5147.appspot.com",

  messagingSenderId: "198321613695",

  appId: "1:198321613695:web:613fc256d16f81cfaa484a"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);


// Initialize Analytics only if supported (Analytics doesn't work in Node.js environment)
let analytics;
isSupported().then((isSupported) => {
  if (isSupported) {
    analytics = getAnalytics(app);
  }
});

// Export the initialized Firebase services
export { app, auth, firestore, analytics };