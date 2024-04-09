import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit } from 'react-icons/md';

function Subject({ name, initialAttendance, initialAttended, index, isChecked, onPresent, onAbsent, onDelete, onRewrite }) {
  const [attendance, setAttendance] = useState(initialAttendance);
  const [attended, setAttended] = useState(initialAttended);
  const [subjectName, setSubjectName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [percentage, setPercentage] = useState(0); // Add percentage state
  const [percentageColor, setPercentageColor] = useState("#007bff"); 

  const handlePresent = () => {
    onPresent();
    setAttendance(attendance + 1);
    setAttended(attended + 1);
  };

  const handleAbsent = () => {
    onAbsent();
    setAttendance(attendance + 1);
  };

  const handleDelete = () => {
    onDelete(index);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      onRewrite(subjectName);
    }
  };

  useEffect(() => {
    const percentageValue = ((attended / attendance) * 100).toFixed(2);
    setPercentage(percentageValue); // Update percentage state
    localStorage.setItem(`subject_${index}_percentage`, percentageValue);

    // Update progress bar color based on percentage
    if (percentageValue >= 75) {
      setPercentageColor("green");
    } else if (percentageValue >= 50) {
      setPercentageColor("#ffe100");
    } else {
      setPercentageColor("red");
    }
  }, [attended, attendance, index]);

  return (
    <tr>
      <td>
        <div className="subject-wrapper">
          {isEditing ? (
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          ) : (
            <span>{subjectName}</span>
          )}
          <div className="icons">
            <button onClick={handleDelete} className="btn-delete">
              <MdDelete />
            </button>
            <button onClick={handleEdit} className="btn-edit">
              <MdEdit />
            </button>
          </div>
        </div>
      </td>
      <td>{attendance}</td>
      <td>{attended}</td>
      <td>
        <div className="progress">
          <div className="progress-circle" style={{ '--percentage': `${percentage}%`, backgroundColor: percentageColor }}>
            <span>{percentage}%</span>
          </div>
        </div>
      </td>
      <td>
        <button onClick={handlePresent} disabled={isChecked}>
          Present
        </button>
        <button onClick={handleAbsent} disabled={isChecked}>
          Absent
        </button>
      </td>
    </tr>
  );
}

export default Subject;