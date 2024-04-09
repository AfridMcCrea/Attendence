// AddSubjectPage.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function AddSubjectPage() {
  const history = useHistory();
  const [subjectName, setSubjectName] = useState("");
  const [initialAttendance, setInitialAttendance] = useState(0);
  const [initialAttended, setInitialAttended] = useState(0);

  const handleGo = () => {
    // Redirect to App.js with initial subject values
    history.push({
      pathname: "/app",
      state: {
        initialSubjects: [
          {
            name: subjectName,
            attendance: parseInt(initialAttendance),
            attended: parseInt(initialAttended)
          }
        ]
      }
    });
  };

  return (
    <div>
      <h1>Add Subject</h1>
      <div>
        <label htmlFor="subjectName">Subject Name:</label>
        <input
          type="text"
          id="subjectName"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="initialAttendance">Initial Attendance:</label>
        <input
          type="number"
          id="initialAttendance"
          value={initialAttendance}
          onChange={(e) => setInitialAttendance(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="initialAttended">Initial Attended:</label>
        <input
          type="number"
          id="initialAttended"
          value={initialAttended}
          onChange={(e) => setInitialAttended(e.target.value)}
        />
      </div>
      <button onClick={handleGo}>Go</button>
    </div>
  );
}

export default AddSubjectPage;
