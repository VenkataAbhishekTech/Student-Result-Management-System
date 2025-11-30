// src/App.jsx
import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';

import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from './services/studentService';

function App() {
  // All top-level state maintained here
  const [students, setStudents] = useState([]); // populated only when user clicks Load Students
  const [mode, setMode] = useState('list'); // 'list' | 'form' | 'details'
  const [formMode, setFormMode] = useState('add'); // 'add' | 'edit'
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Load students (fetch) — called only when user clicks Load Students
  async function handleLoadStudents() {
    try {
      const data = await getAllStudents();
      setStudents(data);
      setMode('list');
      alert('Students loaded.');
    } catch (err) {
      console.error(err);
      alert('Error loading students: ' + err.message);
    }
  }

  function handleAddClick() {
    setFormMode('add');
    setSelectedStudent(null);
    setMode('form');
  }

  function handleEditClick(student) {
    setFormMode('edit');
    setSelectedStudent(student);
    setMode('form');
  }

  async function handleDeleteClick(student) {
    const ok = window.confirm(`Delete student "${student.name}" (ID ${student.id})?`);
    if (!ok) return;
    try {
      await deleteStudent(student.id);
      alert('Student deleted. Click "Load Students" to refresh the list.');
      // stay or go to list view
      setMode('list');
      // do NOT auto-refresh list — per requirement the user will click Load Students
    } catch (err) {
      console.error(err);
      alert('Delete failed: ' + err.message);
    }
  }

  function handleViewClick(student) {
    setSelectedStudent(student);
    setMode('details');
  }

  function handleCancelForm() {
    setMode('list');
    setSelectedStudent(null);
  }

  // Called when the form is submitted (both Add & Edit)
  async function handleFormSubmit(formData) {
    try {
      if (formMode === 'add') {
        await createStudent(formData);
        alert('Student added successfully. Click "Load Students" to refresh the list.');
      } else {
        // edit
        await updateStudent(formData.id, {
          name: formData.name,
          section: formData.section,
          marks: formData.marks,
          grade: formData.grade
        });
        alert('Student updated successfully. Click "Load Students" to refresh the list.');
      }
      setMode('list'); // return to list screen (but students state not updated until Load Students)
      setSelectedStudent(null);
    } catch (err) {
      console.error(err);
      alert('Save failed: ' + err.message);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ padding: 16, borderBottom: '1px solid #ddd' }}>
        <h1>Student Result Management</h1>
      </header>

      <main>
        {mode === 'list' && (
          <StudentList
            students={students}
            onLoad={handleLoadStudents}
            onAdd={handleAddClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onView={handleViewClick}
          />
        )}

        {mode === 'form' && (
          <StudentForm
            initialData={formMode === 'edit' ? selectedStudent : null}
            mode={formMode}
            onCancel={handleCancelForm}
            onSubmit={handleFormSubmit}
          />
        )}

        {mode === 'details' && (
          <StudentDetails
            student={selectedStudent}
            onBack={() => setMode('list')}
          />
        )}
      </main>

      <footer style={{ padding: 16, borderTop: '1px solid #ddd', marginTop: 24 }}>
        <small>Note: Data is saved to JSON Server. Use the "Load Students" button to reload from server.</small>
      </footer>
    </div>
  );
}

export default App;
