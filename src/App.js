// App.js
import React, { useState, useEffect } from "react";
import './App.css'; // Import CSS file
import Subject from "./Subject";
import AttendanceRecords from "./AttendanceRecords";

function App() {
  const [initialSubjects, setInitialSubjects] = useState([
    { name: "English", attendance: 0, attended: 0 },
    { name: "Hindi", attendance: 0, attended: 0 },
    { name: "Maths", attendance: 0, attended: 0 },
  ]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects"));
    if (storedSubjects) {
      setInitialSubjects(storedSubjects);
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("subjects", JSON.stringify(initialSubjects));
  // }, [initialSubjects]);

  const handleRight = (index) => {
    const newSubjects = [...initialSubjects];
    newSubjects[index].attendance += 1;
    newSubjects[index].attended += 1;
    setInitialSubjects(newSubjects);
    localStorage.setItem("subjects", JSON.stringify(newSubjects))
  };

  const handleWrong = (index) => {
    const newSubjects = [...initialSubjects];
    newSubjects[index].attendance += 1;
    setInitialSubjects(newSubjects);
    localStorage.setItem("subjects", JSON.stringify(newSubjects))
  };

  const handleSubmit = () => {
    // Reset all checkboxes
    const updatedSubjects = initialSubjects.map(subject => {
      return { ...subject, isChecked: false };
    });
    setInitialSubjects(updatedSubjects);

    // Update records
    const updatedRecords = initialSubjects.map((subject) => ({
      ...subject,
      percentage: subject.attendance === 0 ? 0 : ((subject.attended / subject.attendance) * 100).toFixed(2),
    }));
    setRecords(updatedRecords);
  };

  const handleDelete = () => {
    setInitialSubjects([]);
    setRecords([]);
    localStorage.removeItem("subjects");
  };

  const handleAddSubject = () => {
    const newSubjectName = prompt("Enter name for the new subject:");
    if (newSubjectName) {
      const newSubjects = [...initialSubjects, { name: newSubjectName, attendance: 0, attended: 0 }];
      setInitialSubjects(newSubjects);
    }
  };

  const handleDeleteSubject = (index) => {
    const newSubjects = [...initialSubjects];
    newSubjects.splice(index, 1);
    setInitialSubjects(newSubjects);
  };

  const handleRewriteSubject = (index, newName) => {
    const newSubjects = [...initialSubjects];
    newSubjects[index].name = newName;
    setInitialSubjects(newSubjects);
  };

  return (
    <div className="container mt-4">
      <h1>Attendance Tracker</h1>
      <div className="Content">
      <table className="table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Total Attendance</th>
            <th>Total Attended</th>
            <th>Percentage</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {initialSubjects.map((subject, index) => (
            <Subject
              key={index}
              index={index}
              name={subject.name}
              initialAttendance={subject.attendance}
              initialAttended={subject.attended}
              isChecked={subject.isChecked}
              onPresent={() => handleRight(index)}
              onAbsent={() => handleWrong(index)}
              onDelete={() => handleDeleteSubject(index)}
              onRewrite={(newName) => handleRewriteSubject(index, newName)}
            />
          ))}
        </tbody>
      </table>
      </div>
      <div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
        <button onClick={handleDelete} className="btn btn-danger ml-2">
          Delete All Records
        </button>
        <button onClick={handleAddSubject} className="btn btn-success ml-2">
          Add Subject
        </button>
      </div>
      <AttendanceRecords records={records} />
    </div>
  );
}

export default App;
