import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCOc_vqiavzeA680OdMIS0O-RQFUJmPZvg",
    authDomain: "attendanceapp-47a33.firebaseapp.com",
    projectId: "attendanceapp-47a33",
    storageBucket: "attendanceapp-47a33.firebasestorage.app",
    messagingSenderId: "115705009188",
    appId: "1:115705009188:web:2707954dbce6eefff9b4b1",
    measurementId: "G-SCDK7E0N2T",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function fetchAttendance(eventId) {
    const userId = auth.currentUser.uid;
    try {
        const attendanceCollectionRef = collection(
            db,
            `users/${userId}/events/${eventId}/attendance`
        );
        const querySnapshot = await getDocs(attendanceCollectionRef);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error fetching attendance data: ", error);
        throw error;
    }
}

export async function exportAttendanceAsCSV(eventId) {
    try {
        const attendanceData = await fetchAttendance(eventId);

        if (!attendanceData || attendanceData.length === 0) {
            console.warn("No attendance data available to export.");
            return;
        }

        const headers = ["ID", "Name", "CheckInTime"];
        const csvRows = [headers.join(",")];

        attendanceData.forEach((entry) => {
            const row = [
                entry.id,
                entry.userName || "",
                new Date(entry.checkInTime).toLocaleString(),
            ];
            csvRows.push(row.join(","));
        });

        const csvContent = csvRows.join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `attendance_${eventId}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        console.log("CSV exported successfully!");
    } catch (error) {
        console.error("Error exporting attendance data as CSV: ", error);
    }
}
onAuthStateChanged(auth, (user) => {
    if (user) {


    } else {
        window.location.href = "./"







    }
});