import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";

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

export function logout() {
    signOut(auth)
        .then(() => {
            console.log("User signed out successfully.");
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
}

let userName = "";

onAuthStateChanged(auth, (user) => {
    if (user) {
        userName = user.displayName || "Anonymous";
    } else {
        window.location.href = "./";
    }
});

export async function handleScan(data) {
    if (data) {
        try {
            const parsedData = JSON.parse(data);
            const { userId, eventId } = parsedData;
            alert("Detected QR code data");
            if (!userId || !eventId) {
                alert("Invalid QR code data");
                throw new Error("Invalid QR code data");

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
            console.error("Error processing QR code:", err.message);
            throw new Error("Invalid QR code or error processing the scan.");
        }
    }
}