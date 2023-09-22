import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDw1YEkxQtOo0WcfbLhNiNbzZ6rqTKn5U4",
  authDomain: "isobel-admin.firebaseapp.com",
  projectId: "isobel-admin",
  storageBucket: "isobel-admin.appspot.com",
  messagingSenderId: "286938257111",
  appId: "1:286938257111:web:86ada343e7e124b214c292",
  measurementId: "G-6DF4G56TNW",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
