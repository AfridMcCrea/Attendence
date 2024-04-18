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
  const [isSaving, setIsSaving] = useState(false);
  const [presentsNeeded, setPresentsNeeded] = useState(0);

  // Interpolate between two colors based on percentage
  const interpolateColor = (startColor, endColor, percentage) => {
    const startRGB = startColor.match(/\d+/g).map(Number);
    const endRGB = endColor.match(/\d+/g).map(Number);

    const r = Math.round(startRGB[0] + (endRGB[0] - startRGB[0]) * (percentage / 100));
    const g = Math.round(startRGB[1] + (endRGB[1] - startRGB[1]) * (percentage / 100));
    const b = Math.round(startRGB[2] + (endRGB[2] - startRGB[2]) * (percentage / 100));

    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    // Calculate percentage
    const percentageValue = ((attended / attendance) * 100).toFixed(2);
    setPercentage(percentageValue);

    // Determine color based on percentage
    let startColor, endColor;
    if (percentageValue < 50) {
      // Interpolate between red and yellow
      startColor = "rgb(255, 0, 0)"; // Red
      endColor = "rgb(255, 255, 0)"; // Yellow
    } else {
      // Interpolate between yellow and green
      startColor = "rgb(255, 255, 0)"; // Yellow
      endColor = "rgb(0, 128, 0)"; // Green
    }

    const color = interpolateColor(startColor, endColor, percentageValue);
    setPercentageColor(color);

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
    <li className="subject-container">
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
          <span>Need to attend more class.</span>
        )}
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`,
            backgroundColor: percentageColor,
          }}
        >
          <span className="progress-text">{percentage}%</span>
        </div>
      </div>
    </li>
  );
}

export default Subject;
