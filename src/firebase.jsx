import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPm5k-36FX-CGBn7dx8dyT1X6cUJDHyRY",
  authDomain: "animeapp-d12a6.firebaseapp.com",
  projectId: "animeapp-d12a6",
  storageBucket: "animeapp-d12a6.appspot.com",
  messagingSenderId: "365747817353",
  appId: "1:365747817353:web:d4ed16c0973dd0b4e72f58",
};

const app = initializeApp(firebaseConfig);

// Get the Firebase Authentication instance
const auth = getAuth(app);

export default auth;
