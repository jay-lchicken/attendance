"use client"; // Required for React's Client Components in Next.js 13+
import "firebase/compat/auth";
import { app, logout } from "./firebase";
import { useRouter } from "next/navigation";
export default function Page() {
    const router = useRouter();

    function redirectToEventCreation() {
        router.push("/eventcreation");
    }
    function redirectToEvents() {
        router.push("/events");
    }
    function redirectToScan() {
        router.push("/scan");
    }





    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            <main
                className="flex flex-col items-center gap-6 sm:gap-8 p-8 sm:p-16 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg w-11/12 max-w-md">
                <h1 className="text-5xl font-bold text-center">Welcome</h1>
                <p className="text-gray-300 text-center">
                    Get started by creating your events with ease.
                </p>
                <button
                    onClick={redirectToEventCreation} // Add the click handler for redirection
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all"
                >
                    Create Events
                </button>
                <button
                    onClick={redirectToEvents}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all"
                >
                    View Events
                </button>
                <button
                    onClick={redirectToScan}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all"
                >
                    Scan
                </button>
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all"
                >
                    Logout
                </button>
            </main>
        </div>
    );
}//Hi