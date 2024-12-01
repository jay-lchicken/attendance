import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Initialize Firebase
import {auth, db, app} from "../firebase-auth";


export async function fetchUserEvents() {
    try {
        const user = auth.currentUser;


        const userID = user.uid;
        const eventsCollectionRef = collection(db, `users/${userID}/events`);
        const querySnapshot = await getDocs(eventsCollectionRef);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error fetching user events: ", error);
        throw error;
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in


    } else {
        window.location.href = "./"







    }
});