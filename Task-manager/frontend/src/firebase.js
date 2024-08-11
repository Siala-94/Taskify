import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth
  .setPersistence(browserLocalPersistence)
  .then(() => {
    console.log("Persistence is set to 'LOCAL'");
    // Now you can proceed with sign-in
    // Example: signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    console.error("Error setting persistence: ", error);
  });
export { auth };
