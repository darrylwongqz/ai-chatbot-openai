// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDznSqXCdYT2zMhTxwyXptFP5VHh00Ardg',
  authDomain: 'ai-chatbot-project-1.firebaseapp.com',
  projectId: 'ai-chatbot-project-1',
  storageBucket: 'ai-chatbot-project-1.firebasestorage.app',
  messagingSenderId: '448757911285',
  appId: '1:448757911285:web:0c50fb7683b1b007b37fbc',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
