import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCOc_vqiavzeA680OdMIS0O-RQFUJmPZvg",
    authDomain: "attendanceapp-47a33.firebaseapp.com",
    projectId: "attendanceapp-47a33",
    storageBucket: "attendanceapp-47a33.firebasestorage.app",
    messagingSenderId: "115705009188",
    appId: "1:115705009188:web:2707954dbce6eefff9b4b1",
    measurementId: "G-SCDK7E0N2T",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

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