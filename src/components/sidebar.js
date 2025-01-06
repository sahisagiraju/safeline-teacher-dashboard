import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import ProfilePic from "./Default_pfp.svg.png";

export default function Sidebar({ onSelectStudent, refreshTrigger }) {
  const [studentList, setStudentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(""); // State for grade filter
  const studentsRef = collection(db, "studentsExample");

  useEffect(() => {
    const getStudentList = async () => {
      try {
        const data = await getDocs(studentsRef);
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
  }, [refreshTrigger]); // Refetch whenever refreshTrigger changes

  // Filter by search term and selected grade
  const filteredStudents = studentList.filter((student) => {
    const matchesSearchTerm = `${student.fname} ${student.lname} ${student.id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGrade =
      selectedGrade === "" || student.grade === selectedGrade;
    return matchesSearchTerm && matchesGrade;
  });

  return (
    <div className="flex flex-col">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or ID..."
        className="p-2 m-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Grade Filter */}
      <div className="flex gap-2 m-2">
        <select
          className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          <option value="">All Grades</option>
          {Array.from({ length: 9 }, (_, i) => i === 0 ? 'K' : i.toString()).map((grade) => (
            <option key={grade} value={grade}>
              Grade {grade}
            </option>
          ))}
        </select>
        <button
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setSelectedGrade("")} // Reset filter
        >
          Clear Filter
        </button>
      </div>

      {/* Student List */}
      {filteredStudents.map((student) => (
        <div
          className={`cursor-pointer px-3 py-1 m-1 rounded flex justify-between gap-3 content-center ${
            student.present ? "bg-white" : "bg-[#9C9C9C]"
          }`}
          key={student.id}
          onClick={() => onSelectStudent(student)}
        >
          <div className="content-center text-start">
            <p className="font-semibold text-sm">
              {student.lname}, {student.fname}
            </p>
            <p className="text-xs">ID: {student.id}</p>
            <p className="text-xs">Grade: {student.grade}</p>
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
