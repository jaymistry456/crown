import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCl1W0BhuC6RR8DbGJAd9CFhv23Idpfbqw",
  authDomain: "crown-db-ec8d1.firebaseapp.com",
  projectId: "crown-db-ec8d1",
  storageBucket: "crown-db-ec8d1.appspot.com",
  messagingSenderId: "641358263958",
  appId: "1:641358263958:web:3e34392323503e0f8db4b7",
  measurementId: "G-RYY5ZGSRY9",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
