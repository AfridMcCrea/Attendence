import React, { useEffect, useState } from "react";
import axios from "axios";

function AttendanceRecords({ records }) {
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
  }, [records]);

  return (
    <div>
      <h2>Attendance Records</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Total Attendance</th>
            <th>Total Attended</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {initialSubjects.map((record, index) => (
            <tr key={index}>
              <td>{record.name}</td>
              <td>{record.attendance}</td>
              <td>{record.attended}</td>
              <td>{record.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={saveToDatabase}>Save to Database</button>
    </div>
  );
}

export default AttendanceRecords;
