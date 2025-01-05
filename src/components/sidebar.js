import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import ProfilePic from "./Default_pfp.svg.png";

export default function Sidebar({ onSelectStudent }) {
  const [studentList, setStudentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const studentsRef = collection(db, "studentsExample");

  useEffect(() => {
    const getStudentList = async () => {
      try {
        const data = await getDocs(studentsRef); // Read data
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStudentList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getStudentList();
  }, []); // Dependency array is correct

  const filteredStudents = studentList.filter((student) =>
    `${student.fname} ${student.lname} ${student.id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or ID..."
        className="p-2 m-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />
      {/* Student List */}
      {filteredStudents.map((student) => (
        <div
          className={`cursor-pointer px-3 py-1 m-1 rounded flex justify-between gap-3 content-center ${
            student.present ? "bg-white" : "bg-[#9C9C9C]"
          }`}
          key={student.id}
          onClick={() => onSelectStudent(student)} // Call callback with selected student
        >
          <div className="content-center text-start">
            <p className="font-semibold text-sm">
              {student.lname}, {student.fname}
            </p>
            <p className="text-xs">ID: {student.id}</p>
          </div>
          <div className="flex row gap-1 items-center text-xs">
            <p className="text-black">Status: </p>
            <p
              className={
                student.present
                  ? "text-green-500 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              {student.present ? "Present" : "Picked Up"}
            </p>
          </div>
          <img src={ProfilePic} alt="profile" className="w-10 h-10 self-center" />
        </div>
      ))}
    </div>
  );
}
