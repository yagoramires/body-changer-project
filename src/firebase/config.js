// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'REACT_API_KEY',
  authDomain: 'REACT_AUTH_DOMAIN',
  projectId: 'REACT_PROJECT_ID',
  storageBucket: 'REACT_STORAGE_BUCKET',
  messagingSenderId: 'REACT_MESSAGING_SENDER_ID',
  appId: 'REACT_APP_ID',
  measurementId: 'REACT_MEASUREMENTID',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);
export default db;
