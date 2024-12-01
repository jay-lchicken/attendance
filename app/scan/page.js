"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import QrScanner from "qr-scanner";
import { handleScan } from "./firebase";

const QRCodeScanner = ({ onScan }) => {
    const videoRef = useRef(null);
    const scannerRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            // Initialize the QR scanner
            scannerRef.current = new QrScanner(
                videoRef.current,
                (result) => {
                    console.log("Scanned QR Code:", result.data);
                    if (onScan) onScan(result.data); // Pass the result to the parent component
                    handleScan(result.data); // Handle the scan result
                },
                {
                    highlightScanRegion: true,
                    highlightCodeOutline: true,
                }
            );

            scannerRef.current.start().catch((error) => {
                console.error("Error starting QR scanner:", error);
            });
        }

        return () => {
            // Clean up the scanner
            if (scannerRef.current) {
                scannerRef.current.stop();
                scannerRef.current.destroy();
            }
        };
    }, [onScan]); // Add dependencies to avoid stale references

    return (
        <div>
            <video
                ref={videoRef}
                style={{
                    width: "100%",
                    maxWidth: "500px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                }}
            />
        </div>
    );
};

export default function Scan() {
    if (typeof window !== 'undefined') {
        const [scanResult, setScanResult] = useState(null);
        const [error, setError] = useState("");
        const router = useRouter();

        const handleScanResult = (result) => {
            setScanResult(result);
            console.log("Scan successful:", result);
        };

        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
                <main className="flex flex-col items-center gap-6 sm:gap-8 p-8 sm:p-16 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg w-11/12 max-w-md">
                    <h1 className="text-5xl font-bold text-center">Scan QR Code</h1>
                    <p className="text-gray-300 text-center">
                        Scan the QR code to check in.
                    </p>

                    {/* QR Scanner Component */}
                    <QRCodeScanner onScan={handleScanResult} />

                    {/* Display results or errors */}
                    {scanResult && (
                        <p className="text-green-400 font-semibold text-center mt-4">
                            {scanResult}
                        </p>
                    )}
                    {error && (
                        <p className="text-red-400 font-semibold text-center mt-4">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={() => router.push("/")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all mt-4"
                    >
                        Back to Home
                    </button>
                </main>
            </div>
        );
    }

}