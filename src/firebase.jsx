import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

// Get the Firebase Authentication instance
const auth = getAuth(app);

// Function to register a new user with email and password
const registerUserWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User registered successfully
      const user = userCredential.user;
      console.log("User registered:", user.uid);
      return user;
    })
    .catch((error) => {
      // Handle errors during user registration
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error registering user:", errorMessage);
      throw error;
    });
};

export default registerUserWithEmailAndPassword;
