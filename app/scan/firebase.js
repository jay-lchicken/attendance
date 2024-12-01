import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {getFirestore, collection, addDoc, doc, setDoc, getDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


let userName = "";

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
            window.location.href = "https://web.kidslearncode.org"
        });
        console.log(`Successfully checked in user: ${userName}`);
    } catch (err) {
        alert("Please ensure you are logged in")
        window.location.href = "./";
        throw new Error("An error occured while recording your attendance");
    }
}