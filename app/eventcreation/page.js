"use client"; // Required for React's Client Components in Next.js 13+

import { useState } from "react";
import { app, createEvent } from "./firebase";

export default function EventCreation() {
    if (typeof window !== 'undefined') {
        const [eventName, setEventName] = useState("");

        const handleCreateEvent = () => {
            // Handle event creation logic here
            createEvent(eventName)
        };

        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
                <main
                    className="flex flex-col items-center gap-6 sm:gap-8 p-8 sm:p-16 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg w-11/12 max-w-md">
                    <h1 className="text-5xl font-bold text-center">Create an event</h1>
                    <p className="text-gray-300 text-center">
                        Get started by creating your events with ease.
                    </p>
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        placeholder="Event Name"
                        className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md w-full"
                    />
                    <button
                        onClick={handleCreateEvent}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all"
                    >
                        Create Event
                    </button>

                </main>
            </div>
        );
    }

}