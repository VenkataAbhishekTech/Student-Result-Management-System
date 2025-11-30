// src/components/StudentForm.jsx
import React, { useState } from 'react';

/**
 * StudentForm used for both Add and Edit.
 * Props:
 * - initialData: object or null (for edit: includes id)
 * - mode: 'add' | 'edit'
 * - onCancel: function
 * - onSubmit: function(studentData) -> should call create/update in parent
 *
 * Uses only useState for internal form state.
 */

export default function StudentForm({ initialData = null, mode = 'add', onCancel, onSubmit }) {
  const [name, setName] = useState(initialData ? initialData.name : '');
  const [section, setSection] = useState(initialData ? initialData.section : '');
  const [marks, setMarks] = useState(initialData ? initialData.marks : '');
  const [grade, setGrade] = useState(initialData ? initialData.grade : '');

  function handleSubmit(e) {
    e.preventDefault();
    // Basic conversion/normalization of marks
    const normalized = {
      name: name.trim(),
      section: section.trim(),
      marks: Number(marks),
      grade: grade.trim()
    };
    onSubmit(initialData && initialData.id ? { id: initialData.id, ...normalized } : normalized);
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>{mode === 'add' ? 'Add Student' : 'Edit Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>
            Name: <br />
            <input value={name} onChange={e => setName(e.target.value)} required />
          </label>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>
            Section: <br />
            <input value={section} onChange={e => setSection(e.target.value)} required />
          </label>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>
            Marks: <br />
            <input
              type="number"
              value={marks}
              onChange={e => setMarks(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>
            Grade: <br />
            <input value={grade} onChange={e => setGrade(e.target.value)} required />
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <button type="submit" style={{ marginRight: 8 }}>{mode === 'add' ? 'Save' : 'Update'}</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
      <p style={{ marginTop: 12, fontStyle: 'italic' }}>
        After saving, you'll see an alert. Click <strong>Load Students</strong> to refresh the list.
      </p>
    </div>
  );
}
