import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {getFirestore, collection, addDoc, doc, setDoc, getDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCOc_vqiavzeA680OdMIS0O-RQFUJmPZvg",
    authDomain: "attendanceapp-47a33.firebaseapp.com",
    projectId: "attendanceapp-47a33",
    storageBucket: "attendanceapp-47a33.firebasestorage.app",
    messagingSenderId: "115705009188",
    appId: "1:115705009188:web:2707954dbce6eefff9b4b1",
    measurementId: "G-SCDK7E0N2T",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


let userName = "";
function GoogleSignIn() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            const email = user.email;
            console.log("User signed in:", email);
        })
        .catch((error) => {
            console.error("Error during sign-in:", error);
        });
}
onAuthStateChanged(auth, (user) => {
    if (user) {
        userName = user.displayName || "Anonymous";
    } else {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
    }
});
export async function getEventDetails(userId, eventId) {
    try {
        const eventsDocRef = doc(db, `users/${userId}/events/${eventId}`);
        const docSnapshot = await getDoc(eventsDocRef);
        return {
            id: docSnapshot.id,
            ...docSnapshot.data(),
        };
    } catch (error) {
        console.error("Error fetching user events: ", error);
        throw error;
    }
}
export async function handleScan(userId, eventId) {
    try {
        alert("Please wait while we record your attendance");
        if (!userId || !eventId) {
            alert("Invalid data");
            throw new Error("Invalid data");

        }
        const attendanceRef = collection(
            db,
            `users/${userId}/events/${eventId}/attendance/`
        );

        await setDoc(doc(attendanceRef, auth.currentUser.uid), {
            userName,
            checkInTime: new Date().toISOString(),
        }).then(() => {
            alert("Attendance recorded successfully. ");
        });
        window.location.href = "./dashboard";
        console.log(`Successfully checked in user: ${userName}`);
    } catch (err) {
        alert("Please ensure you are logged in")
        window.location.href = "./";
        throw new Error("An error occured while recording your attendance");
    }
}