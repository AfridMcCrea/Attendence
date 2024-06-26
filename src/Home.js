import React, { useState, useEffect } from "react";
import './Home.css';
import Subject from "./Subject";
import AttendanceRecords from "./AttendanceRecords";

function Home() {
  const [initialSubjects, setInitialSubjects] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects"));
    if (storedSubjects) {
      setInitialSubjects(storedSubjects);
    }

    const storedRecords = JSON.parse(localStorage.getItem("records"));
    if (storedRecords) {
      setRecords(storedRecords);
    }
  }, []);

  const handleRight = (index) => {
    const newSubjects = [...initialSubjects];
    newSubjects[index].attendance += 1;
    newSubjects[index].attended += 1;
    setInitialSubjects(newSubjects);
    localStorage.setItem("subjects", JSON.stringify(newSubjects));
  };

  const handleWrong = (index) => {
    const newSubjects = [...initialSubjects];
    newSubjects[index].attendance += 1;
    setInitialSubjects(newSubjects);
    localStorage.setItem("subjects", JSON.stringify(newSubjects));
  };

  const handleSubmit = () => {
    const updatedSubjects = initialSubjects.map(subject => {
      return { ...subject, isChecked: false };
    });

    const updatedRecords = updatedSubjects.map((subject) => ({
      ...subject,
      percentage: subject.attendance === 0 ? 0 : ((subject.attended / subject.attendance) * 100).toFixed(2),
    }));

    setRecords(updatedRecords);
    localStorage.setItem("records", JSON.stringify(updatedRecords));

    setInitialSubjects(updatedSubjects);
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
  };

  const handleDelete = () => {
    setInitialSubjects([]);
    setRecords([]);
    localStorage.removeItem("subjects");
    localStorage.removeItem("records");
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
      <div className="subject-container">
        {initialSubjects.map((subject, index) => (
          <div key={index} className="subject-record">
            <Subject
              name={subject.name}
              initialAttendance={subject.attendance}
              initialAttended={subject.attended}
              onPresent={() => handleRight(index)}
              onAbsent={() => handleWrong(index)}
              onDelete={() => handleDeleteSubject(index)}
              onRewrite={(newName) => handleRewriteSubject(index, newName)}
              savedName={records[index]?.name || subject.name}
            />
            <div className="attendance-record">
              <span>{`Attendance: ${subject.attendance}`}</span>
              <span>{`Attended: ${subject.attended}`}</span>
            </div>
          </div>
        ))}
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

export default Home;
