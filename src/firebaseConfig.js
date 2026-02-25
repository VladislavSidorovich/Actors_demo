// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAiSHXUB8-H6-ITaoOAizio1s99AVHxNlc",
  authDomain: "globes-87e87.firebaseapp.com",
  projectId: "globes-87e87",
  storageBucket: "globes-87e87.appspot.com",
  messagingSenderId: "198311689381",
  appId: "1:198311689381:web:1f07e99b0b8d9d3e89614c",
  measurementId: "G-954T5LEB3W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };