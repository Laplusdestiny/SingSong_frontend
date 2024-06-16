import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const config = useRuntimeConfig();

const firebaseConfig = {
  apiKey: config.public.firebaseApiKey,
  authDomain: config.public.firebaseAuthDomain,
  projectId: config.public.firebaseProjectId,
  storageBucket: config.public.firebaseStorageBucket,
  messagingSenderId: config.public.firebaseMessagingSenderId,
  appId: config.public.firebaseAppId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };

