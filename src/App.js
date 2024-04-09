// App.js
import React, { useState, useEffect } from "react";
import './App.css'; // Import CSS file
import Subject from "./Subject";
import AttendanceRecords from "./AttendanceRecords";

function App() {
  const [initialSubjects, setInitialSubjects] = useState([
    { name: "M&M", attendance: 0, attended: 0 },
    { name: "AC", attendance: 0, attended: 0 },
    { name: "ADC", attendance: 0, attended: 0 },
    { name: "DSOS", attendance: 0, attended: 0 },
    { name: "Bio", attendance: 0, attended: 0 },
  ]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects"));
    if (storedSubjects) {
      setInitialSubjects(storedSubjects);
    }
  }, []);

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

  // Update records with latest subject names
  const updatedRecords = updatedSubjects.map((subject) => ({
    ...subject,
    percentage: subject.attendance === 0 ? 0 : ((subject.attended / subject.attendance) * 100).toFixed(2),
  }));
  
  setRecords(updatedRecords);

  // Save updated subjects to localStorage
  setInitialSubjects(updatedSubjects);
  localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
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
      localStorage.setItem("subjects", JSON.stringify(newSubjects));
    }
  };

  const handleDeleteSubject = (index) => {
    const newSubjects = [...initialSubjects];
    newSubjects.splice(index, 1);
    setInitialSubjects(newSubjects);
    localStorage.setItem("subjects", JSON.stringify(newSubjects));
  };

  const handleRewriteSubject = (index, newName) => {
    const newSubjects = [...initialSubjects];
    newSubjects[index].name = newName;
    setInitialSubjects(newSubjects);
    localStorage.setItem("subjects", JSON.stringify(newSubjects));
  };

  return (
    <div className="container mt-4">
      <h1>Attendance Tracker</h1>
      <table className="table">
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
