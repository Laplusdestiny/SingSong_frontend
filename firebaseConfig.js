import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.API_URL,
  projectId: process.env.ProjectID,
  storageBucket: process.env.StorageBucket,
  messagingSenderId: process.env.MessagingSenderID,
  appId: process.env.AppID,
  measurementId: process.env.MeasurementID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };

