import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDSRWGaoY8YoFkXS8Cy-UAdpK4Iv4mft8E",
  authDomain: "exptapp-1d199.firebaseapp.com",
  projectId: "exptapp-1d199",
  storageBucket: "exptapp-1d199.appspot.com",
  messagingSenderId: "694979152045",
  appId: "1:694979152045:web:18a23868f940985953de24",
  measurementId: "G-8R6VK5B7TR"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Firestore indexes
const indexes = {
  expenses: {
    fields: ['userId', 'createdAt']
  }
};

export { db, auth };