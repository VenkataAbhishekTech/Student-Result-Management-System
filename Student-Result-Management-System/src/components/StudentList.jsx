// src/components/StudentList.jsx
import React from 'react';

export default function StudentList({
  students,
  onLoad,
  onAdd,
  onEdit,
  onDelete,
  onView
}) {
  return (
    <div style={{ padding: 16 }}>
      <h2>Students</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={onLoad} style={{ marginRight: 8 }}>Load Students</button>
        <button onClick={onAdd}>Add Student</button>
      </div>

      {students && students.length > 0 ? (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Section</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.section}</td>
                <td>{s.marks}</td>
                <td>{s.grade}</td>
                <td>
                  <button onClick={() => onView(s)} style={{ marginRight: 6 }}>View</button>
                  <button onClick={() => onEdit(s)} style={{ marginRight: 6 }}>Edit</button>
                  <button onClick={() => onDelete(s)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students loaded. Click "Load Students" to fetch from server.</p>
      )}
    </div>
  );
}
