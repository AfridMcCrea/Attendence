// AttendanceRecords.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AttendanceRecords.css"; // Import CSS file

function AttendanceRecords({ records, subjects }) {
  const [initialSubjects, setInitialSubjects] = useState([]);

  const calculatePercentage = (attendance, attended) => {
    if (attendance === 0) return 0;
    return ((attended / attendance) * 100).toFixed(2);
  };

  const saveToDatabase = () => {
    axios
      .post("/api/attendance", { records })
      .then((response) => {
        console.log("Attendance records saved successfully:", response.data);
        // Update initial subjects with latest names
        setInitialSubjects(subjects);
      })
      .catch((error) => {
        console.error("Error saving attendance records:", error);
      });
  };

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects"));
    if (storedSubjects) {
      const updatedSubjects = storedSubjects.map((subject) => ({
        ...subject,
        percentage: calculatePercentage(subject.attendance, subject.attended),
      }));
      setInitialSubjects(updatedSubjects);
    }
  }, [records, subjects]);

  return (
    <div className="h2">
      <h2>Attendance Records</h2>
      <div className="attendance-container">
        {initialSubjects.map((record, index) => (
          <div className="attendance-card" key={index}>
            <div className="subject-name">{record.name}</div>
            <div className="attendance-stats">
              <div className="total-attendance">{`${record.attended}/${record.attendance}`}</div>
              <div className="percentage">{record.percentage}%</div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={saveToDatabase}>Save to Database</button>
    </div>
  );
}

export default AttendanceRecords;
