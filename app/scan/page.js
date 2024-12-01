"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {getEventDetails, handleScan} from "./firebase";
import {useEffect, useState} from "react";

export default function Scan() {
    if (typeof window !== 'undefined') {
        const searchParams = useSearchParams();
        const userId = searchParams.get("userId");
        const eventId = searchParams.get("eventId");
        const router = useRouter();
        const [data, setData] = useState("Please wait for the data to load");

        useEffect(() => {
            getEventDetails(userId, eventId).then((details) => {
                setData(details.name);
            });
        }, [userId, eventId]);

        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
                <main
                    className="flex flex-col items-center gap-6 sm:gap-8 p-8 sm:p-16 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg w-11/12 max-w-md">
                    <h1 className="text-5xl font-bold text-center">Attendance</h1>

                    <h2 className="text-white text-center">{data}</h2>

                    <button
                        onClick={() => {
                            setData("Loading...");
                            handleScan(userId, eventId);
                        }}
                        disabled={data === "Please wait for the data to load"}
                        className={`${
                            data === "Please wait for the data to load" ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                        } text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all mt-4`}
                    >
                        {data === "Loading..." ? "Loading..." : "Click to mark attendance"}
                    </button>
                </main>
            </div>
        );
    }

}