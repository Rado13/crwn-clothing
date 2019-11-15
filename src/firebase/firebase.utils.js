import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCnrkcSU1xlxVIeJowbawBbh6xrk3LFTdo",
    authDomain: "crwn-db-5661d.firebaseapp.com",
    databaseURL: "https://crwn-db-5661d.firebaseio.com",
    projectId: "crwn-db-5661d",
    storageBucket: "crwn-db-5661d.appspot.com",
    messagingSenderId: "700194720151",
    appId: "1:700194720151:web:c85322011e8ccd15505cd2"
  }

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

  firebase.initializeApp(config);
  //veci na google authen

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;