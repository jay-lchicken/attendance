
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {setDoc,doc,getFirestore, getDoc, getDocs} from "firebase/firestore";
import {auth, db, app} from "../firebase-auth";

export function logout(){
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {

    });
}
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in


    } else {
        window.location.href = "./"







    }
});