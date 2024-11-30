import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {setDoc,doc,getFirestore, getDoc, getDocs} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCOc_vqiavzeA680OdMIS0O-RQFUJmPZvg",
    authDomain: "attendanceapp-47a33.firebaseapp.com",
    projectId: "attendanceapp-47a33",
    storageBucket: "attendanceapp-47a33.firebasestorage.app",
    messagingSenderId: "115705009188",
    appId: "1:115705009188:web:2707954dbce6eefff9b4b1",
    measurementId: "G-SCDK7E0N2T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
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