import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDhICVCsK3nkAhi-I_EZdbvfC-a4RxbmwM",
  authDomain: "wish-lists-db0e1.firebaseapp.com",
  projectId: "wish-lists-db0e1",
  storageBucket: "wish-lists-db0e1.appspot.com",
  messagingSenderId: "664033555049",
  appId: "1:664033555049:web:8d872b8ded92d2e89468f8"
};

initializeApp(firebaseConfig);

export const db = getFirestore();