import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAeKyQlp_b0RPRtpAVlygHmlXvm58sNvtg",
  authDomain: "greensaver-forum.firebaseapp.com",
  projectId: "greensaver-forum",
  storageBucket: "greensaver-forum.appspot.com",
  messagingSenderId: "219197149134",
  appId: "219197149134:web:6a6349ffcc1e7ba685659f",
};

//initialize firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };
