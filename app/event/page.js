"use client";

import { useState, useEffect } from "react";
import {app, auth, fetchAttendance} from "./firebase";
import { useSearchParams } from "next/navigation";
import { exportAttendanceAsCSV, userId } from "./firebase";
import QRCode from "react-qr-code";


export default function Event() {



    if (typeof window !== 'undefined') {
        const [attendance, setAttendance] = useState([]);
        const [loading, setLoading] = useState(true);

        async function handleExportCSV(eventId) {
            await exportAttendanceAsCSV(eventId);
        }
        const userId = auth.currentUser.uid;
        const searchParams = useSearchParams();
        const eventId = searchParams.get("eventId");
        useEffect(() => {
            const loadAttendance = async () => {
                try {
                    if (!eventId) {
                        console.error("No event ID provided");
                        return;
                    }

                    setLoading(true);
                    const attendanceData = await fetchAttendance(eventId);

                    const sortedAttendance = attendanceData.sort(
                        (a, b) => new Date(b.checkInTime) - new Date(a.checkInTime)
                    );

                    setAttendance(sortedAttendance);
                } catch (error) {
                    console.error("Failed to load attendance data:", error);
                } finally {
                    setLoading(false);
                }
            };

            loadAttendance();

            return () => {
                setAttendance([]);
                setLoading(true);
            };
        }, [eventId]);
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
                <header className="text-center mt-6 w-full flex justify-center">
                    <h1 className="text-5xl font-bold">Event Attendance</h1>
                </header>
                <main>
                    <div
                        className="flex flex-col items-center gap-6 sm:gap-8 p-8 sm:p-16 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg w-11/12 max-w-md justify-cente">
                        <QRCode value={`https://attendance.kidslearncode.org/scan?userId=${userId}&eventId=${eventId}`} />
                        <p className="text-gray-400 mt-2">Scan this QR code to check in your attendance</p>
                    </div>
                </main>
                <section className="mt-8 w-11/12 max-w-lg">
                    <h2 className="text-3xl font-bold text-center mb-4">Attendance List</h2>
                    {loading ? (
                        <p className="text-center text-gray-400">Loading attendance data...</p>
                    ) : attendance.length > 0 ? (
                        <ul className="space-y-4">
                            {attendance.map((entry) => (
                                <li
                                    key={entry.id}
                                    className="bg-gray-800 p-4 rounded-lg shadow-md"
                                >
                                    <div>
                                        <p className="font-bold">{entry.userName}</p>
                                        <p className="text-sm text-gray-400">
                                            Checked in at: {new Date(entry.checkInTime).toLocaleString()}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-400">No attendance records found.</p>
                    )}
                </section>
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all" style={{ margin: "10px" }}
                        onClick={() => handleExportCSV(eventId)}>
                    Export Attendance as CSV
                </button>
            </div>
        );
    }



}