import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD9Z1ll7lX0gERhBGLScXbmT8nF4Er0o60",
  projectId: "basic-chat-fb14d",
  appId: "1:1508943494:web:0e6347a9924b6bcb4e5307",
  authDomain: "basic-chat-fb14d.firebaseapp.com",
  storageBucket: "basic-chat-fb14d.appspot.com",
  messagingSenderId: "1508943494"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore();