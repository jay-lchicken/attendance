"use client";

import { useState, useEffect } from "react";
import { fetchUserEvents } from "./firebase";
import { useRouter } from "next/navigation";

export default function Events() {

    if (typeof window !== 'undefined') {
        const [events, setEvents] = useState([]);
        const [loading, setLoading] = useState(true);
        useEffect(() => {
            const loadEvents = async () => {
                try {
                    const eventsData = await fetchUserEvents();

                    const sortedEvents = eventsData.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );

                    setEvents(sortedEvents);

                } catch (error) {
                    console.error("Failed to load events:", error);
                }finally {
                    setLoading(false);
                }
            };

            loadEvents();
        }, []);
        const router = useRouter();

        const handleViewMore = (eventId) => {
            router.push(`/event?eventId=${eventId}`);
        };

        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
                <header className="text-center mt-6">
                    <h1 className="text-5xl font-bold">Your Events</h1>
                    <p className="text-gray-400 mt-2">View details of your events below.</p>
                </header>

                <section className="mt-8 w-11/12 max-w-lg">
                    <h2 className="text-3xl font-bold text-center mb-4">Events List</h2>
                    {loading ? (
                        <p className="text-center text-gray-400">Loading events...</p>
                    ) : events.length > 0 ? (
                        <ul className="space-y-4">
                            {events.map((event) => (
                                <li
                                    key={event.id}
                                    className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-bold">{event.name}</p>
                                        <p className="text-sm text-gray-400">
                                            Created at: {new Date(event.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleViewMore(event.id)}
                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all"
                                    >
                                        View More Info
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-400">No events found.</p>
                    )}
                </section>
            </div>
        );
    }



}
//hi