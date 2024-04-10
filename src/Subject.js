import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdSave } from 'react-icons/md';
import "./Subject.css"; // Import CSS file

function Subject({ name, initialAttendance, initialAttended, index, isChecked, onPresent, onAbsent, onDelete, onRewrite, savedName }) {
  const [attendance, setAttendance] = useState(initialAttendance);
  const [attended, setAttended] = useState(initialAttended);
  const [subjectName, setSubjectName] = useState(name);
  const [savedNameState, setSavedName] = useState(savedName);
  const [isEditing, setIsEditing] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [percentageColor, setPercentageColor] = useState("#007bff");
  const [progressAngle, setProgressAngle] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [presentsNeeded, setPresentsNeeded] = useState(0);

  useEffect(() => {
    const percentageValue = ((attended / attendance) * 100).toFixed(2);
    setPercentage(percentageValue);
    if (percentageValue >= 75) {
      setPercentageColor("green");
    } else if (percentageValue >= 50) {
      setPercentageColor("blue");
    } else {
      setPercentageColor("red");
    }

    // Calculate angle to represent percentage in circular progress bar
    const angle = (percentageValue / 100) * 360;
    setProgressAngle(angle);

    // Fetch saved subject names and attendance from localStorage
    const storedSubjects = JSON.parse(localStorage.getItem("subjects"));
    if (storedSubjects) {
      setSavedName(storedSubjects[index]?.name || name);
      const storedAttendance = storedSubjects[index]?.attendance || 0;
      const storedAttended = storedSubjects[index]?.attended || 0;
      const presentsNeeded = Math.ceil((75 * (storedAttendance + 1) / 100) - storedAttended);
      setPresentsNeeded(presentsNeeded);
    }
  }, [attended, attendance, index, name]);

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
    onDelete(index); // Pass the index to onDelete
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setIsSaving(false); // Reset saving state
    if (!isEditing) {
      onRewrite(subjectName);
    }
  };

  const handleSave = () => {
    setIsSaving(false);
    setIsEditing(false);
    setSavedName(subjectName); // Update savedNameState with the updated subject name
    onRewrite(subjectName);
  };

  const handleChange = (e) => {
    setSubjectName(e.target.value);
    setIsSaving(true); // Enable saving state
  };

  return (
    <div className="subject-container">
      <div className="subject-header">
        {isEditing ? (
          <input
            type="text"
            value={subjectName}
            onChange={handleChange}
            className="edit-input"
          />
        ) : (
          <>
            <div className="subject-name">{subjectName}</div>
            {savedNameState !== subjectName && <div className="saved-name">({savedNameState})</div>}
          </>
        )}
        <div className="subject-actions">
          {isEditing ? (
            <button onClick={handleSave} className="btn-save">
              <MdSave />
            </button>
          ) : (
            <button onClick={handleEdit} className="btn-edit">
              <MdEdit />
            </button>
          )}
          <button onClick={handleDelete} className="btn-delete">
            <MdDelete />
          </button>
        </div>
      </div>
      <div className="progress-container">
        <svg className="progress-ring" width="120" height="120">
          <circle
            className="progress-ring-circle"
            stroke="#ccc"
            strokeWidth="8"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
          />
          <circle
            className="progress-ring-circle"
            stroke={percentageColor}
            strokeWidth="8"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
            style={{
              strokeDasharray: `${progressAngle} 360`,
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%"
            }}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill={percentageColor}
            fontSize="16"
            fontWeight="bold"
          >
            {percentage}%
          </text>
        </svg>
      </div>
      <div className="subject-buttons">
        <button onClick={handlePresent} disabled={isChecked}>
          Present
        </button>
        <button onClick={handleAbsent} disabled={isChecked}>
          Absent
        </button>
      </div>
      <div className="presents-needed">
        {percentage >= 75 ? (
          <span>You are on track</span>
        ) : (
          <span>You need to attend more class.</span>
        )}
      </div>
    </div>
  );
}

export default Subject;