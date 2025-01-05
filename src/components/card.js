import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Card({ student }) {
  const [currentTime, setCurrentTime] = useState("");

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const handlePickedUp = async () => {
    if (!student) return;

    const now = new Date().toISOString(); // Get current time as ISO string
    const studentDocRef = doc(db, "studentsExample", student.id);

    try {
      await updateDoc(studentDocRef, {
        present: false,
        timePicked: now,
      });
      student.present = false; // Update the local state (passed prop won't re-render)
      student.timePicked = now;
    } catch (err) {
      console.error("Error updating student status: ", err);
    }
  };

  if (!student) {
    return <div className="p-4">Select a student to view details.</div>;
  }

  return (
    <div className="p-4">
      {/* Display the current time */}
      <div className="text-right text-sm text-gray-500">
        Current Time: {currentTime}
      </div>

      {/* Student Details */}
      <h1 className="text-2xl font-bold">
        {student.fname} {student.lname}
      </h1>
      <p>ID: {student.id}</p>
      <p>
        Status:{" "}
        <span
          className={
            student.present
              ? "text-green-500 font-semibold"
              : "text-red-500 font-semibold"
          }
        >
          {student.present ? "Present" : "Picked Up"}
        </span>
      </p>

      {student.present ? (
        // Button to mark as picked up
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
          onClick={handlePickedUp}
        >
          Picked Up
        </button>
      ) : (
        // Display the time the student was picked up
        <p className="mt-4 text-gray-600">
          Picked Up At:{" "}
          {new Date(student.timePicked).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
      )}
    </div>
  );
}
