"use client";
import {auth} from "./firebase-auth.js"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "firebase/compat/auth";

export default function Home() {
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

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            <main className="flex flex-col items-center gap-8 p-8 sm:p-16 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg w-11/12 max-w-md">
                <h1 className="text-5xl font-bold text-center">RollWise</h1>
                <p className="text-gray-300 text-center">
                    Sign in to access your personalized dashboard and manage attendance with ease.
                </p>
                <button
                    onClick={GoogleSignIn}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all"
                >
                    Sign In With Google
                </button>
                <p className="text-sm text-gray-400 text-center">
                    By signing in, you agree that no data stored anywhere on the web is safe and that
                    we will not be responsible for any data loss or breach. We will not be responsible
                    for any bugs that may occur while using the app.
                </p>
            </main>
        </div>
    );
}