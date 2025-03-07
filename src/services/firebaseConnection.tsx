import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBNiH1ENxlQmRE0aUFc4m5OETvYBbQ3pKQ",
    authDomain: "synclife-6a69c.firebaseapp.com",
    projectId: "synclife-6a69c",
    storageBucket: "synclife-6a69c.firebasestorage.app",
    messagingSenderId: "434208380081",
    appId: "1:434208380081:web:1bfb36cb638619d1d2fe90",
    measurementId: "G-B74V86MXSM"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db }