"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Html5QrcodeScanner } from "html5-qrcode";
import { handleScan} from "./firebase";
import { useEffect } from "react";


function QRCodeScanner() {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner("qr-reader", {
            fps: 10,
            qrbox: 250,
        });
        function onScanSuccess(decodedText, decodedResult) {
            alert("Scanned")
            handleScan(decodedText);
        }

        function onScanFailure(error) {

            console.warn(`Code scan error = ${error}`);
        }
        scanner.render(onScanSuccess, onScanFailure);

        return () => scanner.clear();
    }, []);

    return <div id="qr-reader" />;
}
export default function scan() {
    if (typeof window !== 'undefined') {
        const [scanResult, setScanResult] = useState(null);
        const [error, setError] = useState("");
        const router = useRouter();



        function handleError(err) {
            console.error("QR Scanner Error: ", err);
            setError("Error scanning QR code. Please try again.");
        }

        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
                <main className="flex flex-col items-center gap-6 sm:gap-8 p-8 sm:p-16 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg w-11/12 max-w-md">
                    <h1 className="text-5xl font-bold text-center">Scan QR Code</h1>
                    <p className="text-gray-300 text-center">
                        Scan the QR code to check in.
                    </p>

                    {/* QR Reader Component */}
                    <div className="w-full">
                        <QRCodeScanner/>
                    </div>

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
        );    }

}