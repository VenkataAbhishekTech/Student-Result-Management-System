// src/components/StudentDetails.jsx
import React from 'react';

export default function StudentDetails({ student, onBack }) {
  if (!student) return <div>No student selected.</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Student Details</h2>
      <div>
        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Section:</strong> {student.section}</p>
        <p><strong>Marks:</strong> {student.marks}</p>
        <p><strong>Grade:</strong> {student.grade}</p>
      </div>
      <button onClick={onBack}>Back to List</button>
    </div>
  );
}
