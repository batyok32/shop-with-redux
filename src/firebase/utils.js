import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth"
import { firebaseConfig } from "./config"

firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt:'select_account'})
// export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);


export default firebase;




// set database user when we login 
export const handleUserProfile = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const {uid} = userAuth;

    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();
    // if there not user in db
    if(!snapshot.exists) {
        console.log("there is no user in db");

        const {displayName, email} = userAuth
        const timestamp = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                ...additionalData
            });
        } catch (err) {
            // console.log(err);
        }
    } else {console.log("there is user in db and i will get it", userRef);}
    return userRef;

};

// export default firebase;